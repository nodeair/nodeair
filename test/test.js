const assert = require('assert');

describe('system/core/util', function() {
  const removeHtmlTag = require('../system/core/util/remove-html-tag');
  const wordCount = require('../system/core/util/word-count');
  const getReadTime = require('../system/core/util/get-read-time');
  it('removeHtmlTag：返回纯文本', function() {
    assert.strictEqual(removeHtmlTag('<h1>测试文本</h1>'), '测试文本');
  });
  it('wordCount：统计汉字次数', function() {
    assert.strictEqual(wordCount('测试文本'), 4);
  });
  it('wordCount：统计英文单词次数', function() {
    assert.strictEqual(wordCount('i love you', 2), 3);
  });
  it('getReadTime：统计阅读分钟', function() {
    assert.strictEqual(getReadTime('胜多负少的发发阿斯顿发的是'), 1);
  });
});
