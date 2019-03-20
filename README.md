# springHomework1

字蛛（font-spider），一个智能 WebFont 压缩工具

- 安装
      npm install font-spider -g
- 在css中使用
  <!--声明 WebFont-->
      @font-face {
        font-family: 'source';
        src: url('../font/字体名称.eot');
        src:
          url('../font/字体名称.eot?#font-spider') format('embedded-opentype'),
          url('../font/字体名称.woff2') format('woff2'),
          url('../font/字体名称.woff') format('woff'),
          url('../font/字体名称.ttf') format('truetype'),
          url('../font/字体名称.svg') format('svg');
        font-weight: normal;
        font-style: normal;
      }
      
      /*使用指定字体*/
      .home h1, .demo > .test {
          font-family: 'source';
      }

<!--src定义的.ttf文件必须存在，其余格式将由工具自动生成-->

- 运行 font-spider 命令
      font-spider *.html



REM

Equal to the computed value of "font-size" on the root element

rem是CSS3新增的相对长度单位，是指相对于根元素html的font-size计算值的大小。简单可理解为屏幕宽度的百分比。

<!--head中引入-->

    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">

<!--head中引入flexible.min.js-->

<!-- * designWidth 设计稿实际宽度，maxWidth 制作稿的最大宽度-->

    !function(e,t){function n(){var n=l.getBoundingClientRect().width;t=t||540,n>t&&(n=t);var i=100*n/e;r.innerHTML="html{font-size:"+i+"px;}"}var i,d=document,o=window,l=d.documentElement,r=document.createElement("style");if(l.firstElementChild)l.firstElementChild.appendChild(r);else{var a=d.createElement("div");a.appendChild(r),d.write(a.innerHTML),a=null}n(),o.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),o.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===d.readyState?d.body.style.fontSize="16px":d.addEventListener("DOMContentLoaded",function(e){d.body.style.fontSize="16px"},!1)}(designWidth,maxWidth);



NODE.js

- ''Hello World!''
  创建一个helloworld.js文件。要向STDOUT输出“Hello World”，如下是实现该功能的代码：         
      console.log("Hello World");
  保存该文件，并通过Node.js来执行：         
      node helloworld.js
- 一个基础的HTTP服务器
  在项目的根目录下创建一个叫server.js的文件，并写入以下代码：         
      var http = require("http");
      
      http.createServer(function(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }).listen(8888);
  用Node.js执行你的脚本：         
      node server.js
  接下来，打开浏览器访问<http://localhost:8888/ 会看到一个写着“Hello World”的网页。 
- 分析HTTP服务器
  第一行请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
  接下来我们调用http模块提供的函数： createServer 。这个函数会返回一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数，指定这个HTTP服务器监听的端口号。
- 进行函数传递
  举例来说，可以这样做：         
      function say(word) {
        console.log(word);
      }
      
      function execute(someFunction, value) {
        someFunction(value);
      }
      
      execute(say, "Hello");
      execute(function(word){ console.log(word) }, "Hello");
  我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做 匿名函数 。     
- 函数传递是如何让HTTP服务器工作的
  用这样的代码也可以达到同样的目的：  
      var http = require("http");
      
      function onRequest(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
      
      http.createServer(onRequest).listen(8888);
- 服务器是如何处理请求的
  当回调启动， onRequest() 函数被触发的时候，有两个参数被传入： request 和 response 。  
  它们是对象，可以使用它们的方法来处理HTTP请求的细节，并且响应请求（比如向发出请求的浏览器发回一些东西）。  
  所以我们的代码就是：当收到请求时，使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type），使用 response.write() 函数在HTTP相应主体中发送文本“Hello World"。  
  最后，调用 response.end() 完成响应。  
- 服务端的模块放在哪里
  把服务器脚本放到一个叫做 start 的函数里，然后会导出这个函数。  
      var http = require("http");
      
      function start() {
        function onRequest(request, response) {
          console.log("Request received.");
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Hello World");
          response.end();
        }
      
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      
      exports.start = start;
  这样，我们现在就可以创建我们的主文件 index.js 并在其中启动我们的HTTP了，虽然服务器的代码还在 server.js 中。  
  创建 index.js 文件并写入以下内容：  
      var server = require("./server");
      
      server.start();
  我们可以像使用任何其他的内置模块一样使用server模块：请求这个文件并把它指向一个变量，其中已导出的函数就可以使用了。
  从我们的主要脚本启动应用。
      node index.js
- 如何来进行请求的“路由”
  我们需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。这一功能这里暂定为HTTP服务器的功能。
  我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。
                                     url.parse(string).query
                                                 |
                 url.parse(string).pathname      |
                             |                   |
                             |                   |
                           ------ -------------------
      http://localhost:8888/start?foo=bar&hello=world
                                      ---       -----
                                       |          |
                                       |          |
                    querystring(string)["foo"]    |
                                                  |
                               querystring(string)["hello"]
  现在我们来给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：
      var http = require("http");
      var url = require("url");
      
      function start() {
        function onRequest(request, response) {
          var pathname = url.parse(request.url).pathname;
          console.log("Request for " + pathname + " received.");
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Hello World");
          response.end();
        }
      
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      
      exports.start = start;
  在我们所要构建的应用中，这意味着来自/start和/upload的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。
  现在我们来编写路由，建立一个名为router.js的文件，添加以下内容：
      function route(pathname) {
        console.log("About to route a request for " + pathname);
      }
      
      exports.route = route;
  首先，我们来扩展一下服务器的start()函数，以便将路由函数作为参数传递过去：
      var http = require("http");
      var url = require("url");
      
      function start(route) {
        function onRequest(request, response) {
          var pathname = url.parse(request.url).pathname;
          console.log("Request for " + pathname + " received.");
      
          route(pathname);
      
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Hello World");
          response.end();
        }
      
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      
      exports.start = start;
  同时，我们会相应扩展index.js，使得路由函数可以被注入到服务器中：
      var server = require("./server");
      var router = require("./router");
      
      server.start(router.route);
- 路由给真正的请求处理程序
  应用程序需要新的部件，因此加入新的模块 -- 已经无需为此感到新奇了。我们来创建一个叫做requestHandlers的模块，并对于每一个请求处理程序，添加一个占位用函数，随后将这些函数作为模块的方法导出：
      function start() {
        console.log("Request handler 'start' was called.");
      }
      
      function upload() {
        console.log("Request handler 'upload' was called.");
      }
      
      exports.start = start;
      exports.upload = upload;
  现在我们已经确定将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到route()函数中。
  我们先将这个对象引入到主文件index.js中：
      var server = require("./server");
      var router = require("./router");
      var requestHandlers = require("./requestHandlers");
      
      var handle = {}
      handle["/"] = requestHandlers.start;
      handle["/start"] = requestHandlers.start;
      handle["/upload"] = requestHandlers.upload;
      
      server.start(router.route, handle);
  在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将server.js修改如下：
      var http = require("http");
      var url = require("url");
      
      function start(route, handle) {
        function onRequest(request, response) {
          var pathname = url.parse(request.url).pathname;
          console.log("Request for " + pathname + " received.");
      
          route(handle, pathname);
      
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Hello World");
          response.end();
        }
      
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      
      exports.start = start;
  这样我们就在start()函数里添加了handle参数，并且把handle对象作为第一个参数传递给了route()回调函数。
  然后我们相应地在route.js文件中修改route()函数：
      function route(handle, pathname) {
        console.log("About to route a request for " + pathname);
        if (typeof handle[pathname] === 'function') {
          handle[pathname]();
        } else {
          console.log("No request handler found for " + pathname);
        }
      }
      
      exports.route = route;
  有了这些，我们就把服务器、路由和请求处理程序在一起了。现在我们启动应用程序并在浏览器中访问http://localhost:8888/start，以下日志可以说明系统调用了正确的请求处理程序：
      Server has started.
      Request for /start received.
      About to route a request for /start
      Request handler 'start' was called.
  并且在浏览器中打开http://localhost:8888/可以看到这个请求同样被start请求处理程序处理了：
      Request for / received.
      About to route a request for /
      Request handler 'start' was called.
- 阻塞与非阻塞
  将requestHandlers.js修改成如下形式：         
      var exec = require("child_process").exec;
      
      function start() {
        console.log("Request handler 'start' was called.");
        var content = "empty";
      
        exec("ls -lah", function (error, stdout, stderr) {
          content = stdout;
        });
      
        return content;
      }
      
      function upload() {
        console.log("Request handler 'upload' was called.");
        return "Hello Upload";
      }
      
      exports.start = start;
      exports.upload = upload;
  上述代码中，我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。         
  exec()做了什么呢？它从Node.js来执行一个shell命令。在上述例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）,然后，当/startURL请求的时候将文件信息输出到浏览器中。         
  上述代码是非常直观的： 创建了一个新的变量content（初始值为“empty”），执行“ls -lah”命令，将结果赋值给content，最后将content返回。         
  在例子中，该回调函数就是作为第二个参数传递给exec()的匿名函数：         
      function (error, stdout, stderr) {
        content = stdout;
      }
- 以非阻塞操作进行请求相应
  原理：相对采用将内容传递给服务器的方式，我们采用将服务器“传递”给内容的方式。 从实践角度来说，就是将response对象（从服务器的回调函数onRequest()获取）通过请求路由传递给请求处理程序。 随后，处理程序就可以采用该对象上的函数来对请求作出响应。
  先从server.js开始：         
      var http = require("http");
      var url = require("url");
      
      function start(route, handle) {
        function onRequest(request, response) {
          var pathname = url.parse(request.url).pathname;
          console.log("Request for " + pathname + " received.");
      
          route(handle, pathname, response);
        }
      
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      
      exports.start = start;
  下面更改router.js:         
      function route(handle, pathname, response) {
        console.log("About to route a request for " + pathname);
        if (typeof handle[pathname] === 'function') {
          handle[pathname](response);
        } else {
          console.log("No request handler found for " + pathname);
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not found");
          response.end();
        }
      }
      
      exports.route = route;
  最后，将requestHandler.js修改为如下形式：
      var exec = require("child_process").exec;
      
      function start(response) {
        console.log("Request handler 'start' was called.");
      
        exec("ls -lah", function (error, stdout, stderr) {
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write(stdout);
          response.end();
        });
      }
      
      function upload(response) {
        console.log("Request handler 'upload' was called.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello Upload");
        response.end();
      }
      
      exports.start = start;
      exports.upload = upload;
- 个人代码
  server.js中：
      let express = require('express');
      let fs = require('fs');
      let path = require('path');
      
      
      var app = express();
      
      app.use(express.static(path.join(__dirname)));
      
      app.all('/', function (req, res) {
        var filename = req.url.split('/')[req.url.split('/').length - 1];
        var suffix = req.url.split('.')[req.url.split('.').length - 1];
        if (req.url === '/') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(get_file_content(path.join(__dirname, 'sHomework1.html')));
        } else if (suffix === 'css') {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(get_file_content(path.join(__dirname, 'sHomework1.css')));
        } else if (suffix in ['gif', 'jpeg', 'jpg', 'png']) {
          res.writeHead(200, { 'Content-Type': 'image/' + suffix });
          res.end(get_file_content(path.join(__dirname, 'img', filename)));
        }
      });
      
      
      function get_file_content(filepath) {
        return fs.readFileSync(filepath);
      }
      
      app.listen(4747);
      
  node server.js
