const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

/**
 * 获取文件名和文件扩展
 * @param {*} filename 
 * @returns {String}
 */
function getFileNameAndExtension(filename) {
  let fileArr = filename.split('.');
  let extension = fileArr[fileArr.length - 1];
  fileArr.pop();
  return {
    name: fileArr.join('.'),
    extension
  };
}

function getData(baseUrl) {
  const { constant, staticServer } = this;
  const { UPLOAD_DIR } = constant;
  const postList = [];
  const uploadList = [];
  const dirList = fs.readdirSync(__dirname).filter(name => name !== 'index.js');
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirsSync(UPLOAD_DIR);
  dirList.forEach((dir, index) => {
    const timestamp = new Date().getTime() + index * 1000;
    const postTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    const uploadDir = path.join(__dirname, dir, 'upload');
    const uploadFiles = fs.readdirSync(uploadDir);
    let postObj = {};
    let poster = {
      extension: '',
      oldName: 'poster',
      newName: ''
    };
    let imgs = [];
    // 处理图片
    for (let i = 0; i < uploadFiles.length; i++) {
      const filename = uploadFiles[i];
      let { name, extension } = getFileNameAndExtension(filename);
      const oldPath = path.join(uploadDir, `${name}.${extension}`);
      const newName = timestamp + i * 1000;
      if (name !== 'poster') {
        imgs.push({
          oldName: name,
          newName,
          extension
        });
      } else {
        poster.extension = extension;
        poster.newName = newName;
        const oldPath = path.join(uploadDir, `${poster.oldName}.${poster.extension}`);
        const newPath = path.join(UPLOAD_DIR, `${poster.newName}.${poster.extension}`);
        if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
          fs.copyFileSync(oldPath, newPath);
        }
      }
      uploadList.push({
        author_id: 1,
        size: fs.statSync(oldPath).size,
        mime_type: staticServer.types[`.${extension}`],
        name: `${newName}.${extension}`,
        source_name: `${name}.${extension}`,
        storage_path: `upload/${newName}.${extension}`
      });
    }
    const factoryFn = require(path.join(__dirname, dir, 'index.js'));
    const posterUrl = `${baseUrl}upload/${poster.newName}.${poster.extension}`;
    let content = fs.readFileSync(path.join(__dirname, dir, 'post.html'), 'utf8');
    // 将内容里的图片占位替换为真实图片地址，并将图片复制到upload文件夹
    imgs.forEach((img, index) => {
      const oldPath = path.join(uploadDir, `${img.oldName}.${img.extension}`);
      const newPath = path.join(UPLOAD_DIR, `${img.newName}.${img.extension}`);
      if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
        fs.copyFileSync(oldPath, newPath);
      }
      const imgUrl = `${baseUrl}upload/${img.newName}.${img.extension}`;
      content = content.replace(`{IMG_URL_${index + 1}}`, imgUrl);
    });
    postObj = factoryFn(posterUrl, content, postTime);
    postList.push(postObj);
  });
  return {
    postList,
    uploadList
  };
}

module.exports = getData;
