'use strict';

const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const uploadUtil = require('../../../../system/plugin/upload/util');

/**
 * Get file name and file extension
 * @param {String} filename file name
 * @return {String} file name and extension
 */
function getFileNameAndExtension(filename) {
  const fileArr = filename.split('.');
  const extension = fileArr[fileArr.length - 1];
  fileArr.pop();
  return {
    name: fileArr.join('.'),
    extension,
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
    const poster = {
      extension: '',
      oldName: 'poster',
      newName: '',
    };
    const imgs = [];
    let postObj = {};
    // 处理图片
    for (let i = 0; i < uploadFiles.length; i++) {
      const filename = uploadFiles[i];
      const { name, extension } = getFileNameAndExtension(filename);
      const oldPath = path.join(uploadDir, `${name}.${extension}`);
      const _time = timestamp + i * 1000;
      const newName = uploadUtil.getFilename(_time);
      if (name !== 'poster') {
        imgs.push({
          oldName: name,
          newName,
          extension,
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
        authorId: 1,
        size: fs.statSync(oldPath).size,
        mimeType: staticServer.types[`.${extension}`],
        name: `${newName}.${extension}`,
        sourceName: `${name}.${extension}`,
        storagePath: `upload/${newName}.${extension}`,
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
    uploadList,
  };
}

module.exports = getData;
