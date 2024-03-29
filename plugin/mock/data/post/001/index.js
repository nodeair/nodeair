'use strict';

// https://36kr.com/p/1249852875294976
module.exports = function(poster, content, postTime) {
  return {
    title: '拆解在线问诊：3大误区，3重真相，3副解药',
    poster,
    // https://36kr.com/motif/327686799361
    categoryId: '医疗服务', // 医疗服务
    authorId: 1,
    summary: '让服务归服务，生态归生态。',
    tags: '在线问诊',
    contentHtml: content,
    postTime,
  };
};
