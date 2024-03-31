// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var task03_api_pb = require('../task03/api_pb.js');

function serialize_DeleteRequest(arg) {
  if (!(arg instanceof task03_api_pb.DeleteRequest)) {
    throw new Error('Expected argument of type DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteRequest(buffer_arg) {
  return task03_api_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_EmptyResponse(arg) {
  if (!(arg instanceof task03_api_pb.EmptyResponse)) {
    throw new Error('Expected argument of type EmptyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_EmptyResponse(buffer_arg) {
  return task03_api_pb.EmptyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetRequest(arg) {
  if (!(arg instanceof task03_api_pb.GetRequest)) {
    throw new Error('Expected argument of type GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetRequest(buffer_arg) {
  return task03_api_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PaginationRequest(arg) {
  if (!(arg instanceof task03_api_pb.PaginationRequest)) {
    throw new Error('Expected argument of type PaginationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PaginationRequest(buffer_arg) {
  return task03_api_pb.PaginationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PaginationResponse(arg) {
  if (!(arg instanceof task03_api_pb.PaginationResponse)) {
    throw new Error('Expected argument of type PaginationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PaginationResponse(buffer_arg) {
  return task03_api_pb.PaginationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ProtoTask(arg) {
  if (!(arg instanceof task03_api_pb.ProtoTask)) {
    throw new Error('Expected argument of type ProtoTask');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProtoTask(buffer_arg) {
  return task03_api_pb.ProtoTask.deserializeBinary(new Uint8Array(buffer_arg));
}


var TasksService = exports.TasksService = {
  createTask: {
    path: '/Tasks/createTask',
    requestStream: false,
    responseStream: false,
    requestType: task03_api_pb.ProtoTask,
    responseType: task03_api_pb.ProtoTask,
    requestSerialize: serialize_ProtoTask,
    requestDeserialize: deserialize_ProtoTask,
    responseSerialize: serialize_ProtoTask,
    responseDeserialize: deserialize_ProtoTask,
  },
  updateTask: {
    path: '/Tasks/updateTask',
    requestStream: false,
    responseStream: false,
    requestType: task03_api_pb.ProtoTask,
    responseType: task03_api_pb.ProtoTask,
    requestSerialize: serialize_ProtoTask,
    requestDeserialize: deserialize_ProtoTask,
    responseSerialize: serialize_ProtoTask,
    responseDeserialize: deserialize_ProtoTask,
  },
  deleteTask: {
    path: '/Tasks/deleteTask',
    requestStream: false,
    responseStream: false,
    requestType: task03_api_pb.DeleteRequest,
    responseType: task03_api_pb.EmptyResponse,
    requestSerialize: serialize_DeleteRequest,
    requestDeserialize: deserialize_DeleteRequest,
    responseSerialize: serialize_EmptyResponse,
    responseDeserialize: deserialize_EmptyResponse,
  },
  getTask: {
    path: '/Tasks/getTask',
    requestStream: false,
    responseStream: false,
    requestType: task03_api_pb.GetRequest,
    responseType: task03_api_pb.ProtoTask,
    requestSerialize: serialize_GetRequest,
    requestDeserialize: deserialize_GetRequest,
    responseSerialize: serialize_ProtoTask,
    responseDeserialize: deserialize_ProtoTask,
  },
  getTasks: {
    path: '/Tasks/getTasks',
    requestStream: false,
    responseStream: false,
    requestType: task03_api_pb.PaginationRequest,
    responseType: task03_api_pb.PaginationResponse,
    requestSerialize: serialize_PaginationRequest,
    requestDeserialize: deserialize_PaginationRequest,
    responseSerialize: serialize_PaginationResponse,
    responseDeserialize: deserialize_PaginationResponse,
  },
};

exports.TasksClient = grpc.makeGenericClientConstructor(TasksService);
