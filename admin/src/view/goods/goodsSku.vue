<template>
  <div>
    123
    {{value}}
    <!-- <el-cascader v-model="value"
                 :options="options"></el-cascader> -->
    <svg width="100%"
         height="100%">

      <rect width="300"
            rx="20"
            ry="20"
            height="100"
            style="fill:red;stroke-width:10;
stroke:yellow; fill-opacity:0.5" />
      <ellipse cx="300"
               cy="150"
               rx="200"
               ry="80"
               style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2" />

    </svg>
  </div>
</template>

<script>
// import protobuf from 'google-protobuf';
import { helloRequest } from '../../proto/generated/hello_pb';
import { HelloServiceClient } from '../../proto/generated/hello_grpc_web_pb'

export default {
  data () {
    return {
      value: [],
      options: [],
      client: null
    }
  },
  methods: {
    sayHello () {
      let request = new helloRequest();
      // request.setMessage("333")
      // request.setCode('222')
      this.client.sayHello(request, {}, (err, response) => {
        console.log(err, response);
      });
      //   {
      //   code: '0',
      //   message: '来自Node客户端的OK1'
      // }

    }
  },
  async created () {
    // await this.$ajaxPost('grpc', { a: 1 })
    this.client = new HelloServiceClient("http://154.8.237.169:8081");
    // console.log(this.client)
    this.sayHello();
  },
  async mounted () {

    // const { result } = await this.$ajaxGet('getCategoryTree', { level: 0 });
    // console.log(result);
    // this.options = result;
    // await this.$ajaxGet('grpc');
    // const GetBookRequest = (data) => {
    //   protobuf.Message.initialize(this, data, 0, -1, null, null);
    // }
    // const getBookRequest = new GetBookRequest();
    // console.log(GetBookRequest)
    // getBookRequest.setIsbn(60929871);
    // var BookService = (function () {
    //   function BookService () { }
    //   BookService.serviceName = "examplecom.library.BookService";
    //   return BookService;
    // }());
    // grpc.unary({
    //   methodName: "GetBook",
    //   service: BookService,
    //   requestStream: false,
    //   responseStream: false,
    // }, {
    //   request: getBookRequest,
    //   host: 'http://localhost:50051',
    //   onEnd: res => {
    //     const { status, statusMessage, headers, message, trailers } = res;
    //     console.log("getBook.onEnd.status", status, statusMessage);
    //     console.log("getBook.onEnd.headers", headers);
    //     if (status === grpc.Code.OK && message) {
    //       console.log("getBook.onEnd.message", message.toObject());
    //     }
    //     console.log("getBook.onEnd.trailers", trailers);
    //   }
    // });

  }
}
</script>

<style>
</style>
