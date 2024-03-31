import {PrismaClient} from '@prisma/client'
import {TasksService} from "../proto/task03/api_grpc_pb";
import {getTasksServer} from "./tasks";
import {Server, ServerCredentials} from "@grpc/grpc-js";

const prisma = new PrismaClient()

async function main() {
    const server = new Server();
    server.addService(TasksService, getTasksServer(prisma))

    const address = process.env.GRPC_ADDRESS ?? "0.0.0.0:2500";
    server.bindAsync(address, ServerCredentials.createInsecure(), () => {
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })