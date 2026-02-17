const multer = require("multer");

// Store files in memory instead of disk
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5 MB
  },
});

module.exports = upload;
