const fs = require('fs-extra');
const path = require('path');

module.exports = function(baseUrl) {
  const { constant } = this;
  const { UPLOAD_DIR } = constant;
  const postList = [];
  const dirList = [
    '001',
    '002',
    '003'
  ];
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirsSync(UPLOAD_DIR);
  }
  dirList.forEach(dir => {
    const uploadDir = path.join(__dirname, dir, 'upload');
    const uploadFiles = fs.readdirSync(uploadDir).map(fileName => path.join(uploadDir, fileName));
    uploadFiles.forEach(filePath => {
      const name = path.basename(filePath);
      const targetPath = path.join(UPLOAD_DIR, name);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(filePath, targetPath);
      }
    });
    const indexPath = path.join(__dirname, dir, 'index.js');
    const postFn = require(indexPath);
    const time = new Date().getTime();
    postList.push(postFn(baseUrl, time));
  });
  return postList;
}
