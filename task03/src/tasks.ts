import {ITasksServer} from "../proto/task03/api_grpc_pb";
import {
    DeleteRequest,
    EmptyResponse,
    GetRequest,
    PaginationRequest,
    PaginationResponse,
    ProtoTask
} from "../proto/task03/api_pb";
import {PrismaClient} from "@prisma/client";
import {sendUnaryData, ServerUnaryCall, status} from "@grpc/grpc-js";


function randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function toProtoTask(task: {
    id: string,
    author: string,
    title: string,
    status: string,
    description: string | null,
}): ProtoTask {
    return new ProtoTask()
        .setId(task.id)
        .setAuthor(task.author)
        .setTitle(task.title)
        .setStatus(task.status)
        .setDescription(task.description ?? "")
}

export function getTasksServer(prisma: PrismaClient): ITasksServer {
    return {
        createTask: async function (
            call: ServerUnaryCall<ProtoTask, ProtoTask>,
            callback: sendUnaryData<ProtoTask>
        ) {
            try {
                const task = call.request.toObject();
                const result = await prisma.task.create({
                    data: {
                        ...task,
                        description: task.description ?? null,
                        id: randomUUID()
                    }
                })
                callback(null, toProtoTask(result));
            } catch (e) {
                callback(new Error(`${e}`), null)
            }
        },
        updateTask: async function (
            call: ServerUnaryCall<ProtoTask, ProtoTask>,
            callback: sendUnaryData<ProtoTask>
        ) {
            try {
                const task = call.request.toObject();
                const gottenTask = await prisma.task.findUnique({
                    where: {
                        id: task.id
                    }
                })
                if (gottenTask == null) {
                    callback({code: status.NOT_FOUND})
                } else if (gottenTask.author != task.author) {
                    callback({code: status.PERMISSION_DENIED})
                }  else {
                    const result = await prisma.task.update({
                        where: {
                            id: task.id
                        },
                        data: {
                            ...task,
                            author: undefined
                        }
                    })
                    callback(null, toProtoTask(result));
                }
            } catch (e) {
                callback(new Error(`${e}`), null)
            }
        },
        deleteTask: async function (
            call: ServerUnaryCall<DeleteRequest, EmptyResponse>,
            callback: sendUnaryData<EmptyResponse>
        ) {
            try {
                const request = call.request.toObject();
                const task = await prisma.task.findUnique({
                    where: {
                        id: request.id
                    }
                })
                if (task == null) {
                    callback({code: status.NOT_FOUND})
                } else if (task.author != request.author) {
                    callback({code: status.PERMISSION_DENIED})
                } else {
                    await prisma.task.delete({
                        where: {
                            id: request.id
                        }
                    })
                }
                callback(null, new EmptyResponse());
            } catch (e) {
                callback(new Error(`${e}`), null)
            }
        },
        getTask: async function (
            call: ServerUnaryCall<GetRequest, ProtoTask>,
            callback: sendUnaryData<ProtoTask>
        ) {
            try {
                const request = call.request.toObject();
                const result = await prisma.task.findUnique({
                    where: {
                        id: request.id
                    }
                })
                if (result == null) {
                    callback({code: status.NOT_FOUND})
                } else {
                    callback(null, toProtoTask(result));
                }
            } catch (e) {
                callback(new Error(`${e}`), null)
            }
        },
        getTasks: async function (
            call: ServerUnaryCall<PaginationRequest, PaginationResponse>,
            callback: sendUnaryData<PaginationResponse>
        ) {
            try {
                const request = call.request.toObject();
                const result = await prisma.task.findMany({
                    skip: request.skip,
                    take: Math.min(request.take, 100)
                })
                callback(null, new PaginationResponse()
                    .setTasksList(result.map(toProtoTask)));

            } catch (e) {
                callback(new Error(`${e}`), null)
            }
        },
    }
}