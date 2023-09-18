var http = require("http");
var fs = require("fs");
var uc = require("upper-case");
// http
//   .createServer(function (req, res) {
//     fs.readFile("./index.html", function (err, data) {
//       res.writeHead(200, { "Content-type": "text/html" });
//       res.write(uc.upperCase("hello-world"));
//       //res.write(data);
//       return res.end();
//     });
//   })
//   .listen(8000);
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write('<form action="fileupload"></form>');
    res.write(
      '<input type="file" title="Upload file" name="filetoupload"></br>'
    );
    res.write('<input type="submit">');
    res.write("</form>");
    return res.end();
  })
  .listen(8000);
