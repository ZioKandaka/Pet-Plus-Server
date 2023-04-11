const multer = require("multer");
var path = require("path");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, cb) {
  //   // console.log(file, '<< multer');
  //   var ext = path.extname(file.originalname);
  //   if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
  //     return cb(null, false);
  //   }
  //   cb(null, true);
  // },
});

module.exports = upload;
