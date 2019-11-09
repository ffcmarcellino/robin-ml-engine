const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const app = express();
const httpServer = http.createServer(app);
const upload = multer({dest: __dirname + '/uploads'});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.post("/upload",upload.single("photo"),(req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/", req.file.originalname);
    const ext_name = path.extname(req.file.originalname).toLowerCase()

    if (ext_name === ".png" || ext_name === ".gif" || ext_name === ".jpg" || ext_name === ".jfif") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});
