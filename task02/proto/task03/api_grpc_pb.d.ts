// package: 
// file: task03/api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as task03_api_pb from "../task03/api_pb";

interface ITasksService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createTask: ITasksService_IcreateTask;
    updateTask: ITasksService_IupdateTask;
    deleteTask: ITasksService_IdeleteTask;
    getTask: ITasksService_IgetTask;
    getTasks: ITasksService_IgetTasks;
}

interface ITasksService_IcreateTask extends grpc.MethodDefinition<task03_api_pb.ProtoTask, task03_api_pb.ProtoTask> {
    path: "/Tasks/createTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<task03_api_pb.ProtoTask>;
    requestDeserialize: grpc.deserialize<task03_api_pb.ProtoTask>;
    responseSerialize: grpc.serialize<task03_api_pb.ProtoTask>;
    responseDeserialize: grpc.deserialize<task03_api_pb.ProtoTask>;
}
interface ITasksService_IupdateTask extends grpc.MethodDefinition<task03_api_pb.ProtoTask, task03_api_pb.ProtoTask> {
    path: "/Tasks/updateTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<task03_api_pb.ProtoTask>;
    requestDeserialize: grpc.deserialize<task03_api_pb.ProtoTask>;
    responseSerialize: grpc.serialize<task03_api_pb.ProtoTask>;
    responseDeserialize: grpc.deserialize<task03_api_pb.ProtoTask>;
}
interface ITasksService_IdeleteTask extends grpc.MethodDefinition<task03_api_pb.DeleteRequest, task03_api_pb.EmptyResponse> {
    path: "/Tasks/deleteTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<task03_api_pb.DeleteRequest>;
    requestDeserialize: grpc.deserialize<task03_api_pb.DeleteRequest>;
    responseSerialize: grpc.serialize<task03_api_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<task03_api_pb.EmptyResponse>;
}
interface ITasksService_IgetTask extends grpc.MethodDefinition<task03_api_pb.GetRequest, task03_api_pb.ProtoTask> {
    path: "/Tasks/getTask";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<task03_api_pb.GetRequest>;
    requestDeserialize: grpc.deserialize<task03_api_pb.GetRequest>;
    responseSerialize: grpc.serialize<task03_api_pb.ProtoTask>;
    responseDeserialize: grpc.deserialize<task03_api_pb.ProtoTask>;
}
interface ITasksService_IgetTasks extends grpc.MethodDefinition<task03_api_pb.PaginationRequest, task03_api_pb.PaginationResponse> {
    path: "/Tasks/getTasks";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<task03_api_pb.PaginationRequest>;
    requestDeserialize: grpc.deserialize<task03_api_pb.PaginationRequest>;
    responseSerialize: grpc.serialize<task03_api_pb.PaginationResponse>;
    responseDeserialize: grpc.deserialize<task03_api_pb.PaginationResponse>;
}

export const TasksService: ITasksService;

export interface ITasksServer extends grpc.UntypedServiceImplementation {
    createTask: grpc.handleUnaryCall<task03_api_pb.ProtoTask, task03_api_pb.ProtoTask>;
    updateTask: grpc.handleUnaryCall<task03_api_pb.ProtoTask, task03_api_pb.ProtoTask>;
    deleteTask: grpc.handleUnaryCall<task03_api_pb.DeleteRequest, task03_api_pb.EmptyResponse>;
    getTask: grpc.handleUnaryCall<task03_api_pb.GetRequest, task03_api_pb.ProtoTask>;
    getTasks: grpc.handleUnaryCall<task03_api_pb.PaginationRequest, task03_api_pb.PaginationResponse>;
}

export interface ITasksClient {
    createTask(request: task03_api_pb.ProtoTask, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    createTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    createTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    updateTask(request: task03_api_pb.ProtoTask, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    updateTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    updateTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    deleteTask(request: task03_api_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    deleteTask(request: task03_api_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    deleteTask(request: task03_api_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    getTask(request: task03_api_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    getTask(request: task03_api_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    getTask(request: task03_api_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    getTasks(request: task03_api_pb.PaginationRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
    getTasks(request: task03_api_pb.PaginationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
    getTasks(request: task03_api_pb.PaginationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
}

export class TasksClient extends grpc.Client implements ITasksClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createTask(request: task03_api_pb.ProtoTask, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public createTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public createTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public updateTask(request: task03_api_pb.ProtoTask, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public updateTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public updateTask(request: task03_api_pb.ProtoTask, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public deleteTask(request: task03_api_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public deleteTask(request: task03_api_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public deleteTask(request: task03_api_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public getTask(request: task03_api_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public getTask(request: task03_api_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public getTask(request: task03_api_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.ProtoTask) => void): grpc.ClientUnaryCall;
    public getTasks(request: task03_api_pb.PaginationRequest, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
    public getTasks(request: task03_api_pb.PaginationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
    public getTasks(request: task03_api_pb.PaginationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: task03_api_pb.PaginationResponse) => void): grpc.ClientUnaryCall;
}
