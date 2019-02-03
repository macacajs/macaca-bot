'use strict';

const assert = require('assert');

const _ = require('../../app/helper');

describe('test', () => {
  it('fix markdown image', async () => {
    const source = 'abc [_ _123](https://user-images.githubusercontent.com/123/def-abc.png) def';
    const expected = 'abc ![_ _123](https://user-images.githubusercontent.com/123/def-abc.png) def';
    const res = _.fixMarkdownImage(source);
    assert.equal(res, expected);
  });

  it('transform body', async () => {
    const source = 'abc [_ _123](https://user-images.githubusercontent.com/123/def-abc.png) def';
    const expected = 'abc ![_ _123](https://user-images.githubusercontent.com/123/def-abc.png) def';
    const res = _.transformBody(source);
    assert.equal(res, expected);
  });
});
