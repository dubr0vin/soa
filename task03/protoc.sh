#!/usr/bin/env bash
set -ex

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./proto \
  --grpc_out=grpc_js:./proto \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I ../proto \
  ../proto/**/*.proto

grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=`which protoc-gen-ts` \
  --ts_out=grpc_js:./proto \
  -I ../proto \
  ../proto/**/*.proto