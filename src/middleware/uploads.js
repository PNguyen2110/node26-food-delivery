const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    console.log(file);

    //setup thư mục mà file đc lưu vào
    cb(null, "./static/");
  },
  filename: (req, file, cb) => {
    // overide fileName để tránh trường hợp trùng file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const uploads = multer({ storage });

module.exports = uploads;
