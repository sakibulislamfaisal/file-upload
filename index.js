const express = require("express");
const multer = require("multer");
const cors = require("cors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const port = 4000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//application routes
app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("single file uploaded successfully");
});

app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("multiple file uploaded successfully", req.files);
});

app.listen(port, () => {
  console.log(`Server started on port 4000`);
});
