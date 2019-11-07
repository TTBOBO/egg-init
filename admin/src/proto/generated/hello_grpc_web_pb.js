/**
 * @fileoverview gRPC-Web generated client stub for demo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.demo = require('./hello_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.demo.HelloServiceClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

    /**
     * @private @const {?Object} The credentials to be used to connect
     *    to the server
     */
    this.credentials_ = credentials;

    /**
     * @private @const {?Object} Options for the client
     */
    this.options_ = options;
  };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.demo.HelloServicePromiseClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

    /**
     * @private @const {?Object} The credentials to be used to connect
     *    to the server
     */
    this.credentials_ = credentials;

    /**
     * @private @const {?Object} Options for the client
     */
    this.options_ = options;
  };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.demo.helloRequest,
 *   !proto.demo.helloResponse>}
 */
const methodDescriptor_HelloService_SayHello = new grpc.web.MethodDescriptor(
  '/demo.HelloService/SayHello',
  grpc.web.MethodType.UNARY,
  proto.demo.helloRequest,
  proto.demo.helloResponse,
  /** @param {!proto.demo.helloRequest} request */
  function (request) {
    return request.serializeBinary();
  },
  proto.demo.helloResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.demo.helloRequest,
 *   !proto.demo.helloResponse>}
 */
const methodInfo_HelloService_SayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.demo.helloResponse,
  /** @param {!proto.demo.helloRequest} request */
  function (request) {
    return request.serializeBinary();
  },
  proto.demo.helloResponse.deserializeBinary
);


/**
 * @param {!proto.demo.helloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.demo.helloResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.demo.helloResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.demo.HelloServiceClient.prototype.sayHello =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/demo.HelloService/SayHello',
      request,
      metadata || {},
      methodDescriptor_HelloService_SayHello,
      callback);
  };


/**
 * @param {!proto.demo.helloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.demo.helloResponse>}
 *     A native promise that resolves to the response
 */
proto.demo.HelloServicePromiseClient.prototype.sayHello =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/demo.HelloService/SayHello',
      request,
      metadata || {},
      methodDescriptor_HelloService_SayHello);
  };


module.exports = proto.demo;
