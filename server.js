// var http = require('http');
// var fs = require('fs');
// let path = require('path');


// function handle_request(req, res) {

//   var suffix = req.url.substr(req.url.length - 4, req.url.length);
//   var realpath = __dirname  + '\\';
//   var filename = req.url.substr(req.url.length - 9);
//   if (suffix === '.css') 
//   {
//     res.writeHead(200, { 'Content-Type': 'text/css' });
//     res.end(get_file_content(realpath + '\\' + 'sHomework1.css'));
//   } 
//   else if (suffix === '.png') 
//   {
//     res.writeHead(200, { 'Content-Type': 'image/gif' });
//     res.end(get_file_content(realpath+'\\img\\background.png'));
//     res.writeHead(200, { 'Content-Type': 'image/gif' });
//     res.end(get_file_content(realpath+'\\img\\wifi.png'));
//   } 
//   else 
//   {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(get_file_content(__dirname + '\\'  + 'sHomework1.html'));
//   }
// }

// function get_file_content(filepath) {
//   return fs.readFileSync(filepath);
// }

// var server = http.createServer(handle_request);
// server.listen(8080);

/**
 * 使用express来实现对于静态资源的控制。
 */
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