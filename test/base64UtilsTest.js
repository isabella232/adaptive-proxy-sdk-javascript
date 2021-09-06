/**
 * MIT License
 * Copyright 2020 - IBM Corp.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const assert = require('assert');
const base64Utils = require('../lib/utils/base64Utils');


describe('base64Utils', () => {
  describe('#base64UrlEncodeString', () => {
    it('should return an empty string when encoding an empty string', () => {
      const actual = '';
      const expected = '';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zg' when encoding 'f'`, () => {
      const actual = 'f';
      const expected = 'Zg';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zm8' when encoding 'fo'`, () => {
      const actual = 'fo';
      const expected = 'Zm8';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zm9v' when encoding 'foo'`, () => {
      const actual = 'foo';
      const expected = 'Zm9v';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zm9vYg' when encoding 'foob'`, () => {
      const actual = 'foob';
      const expected = 'Zm9vYg';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zm9vYmE' when encoding 'fooba'`, () => {
      const actual = 'fooba';
      const expected = 'Zm9vYmE';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'Zm9vYmFy' when encoding 'foobar'`, () => {
      const actual = 'foobar';
      const expected = 'Zm9vYmFy';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return 'eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NSJ9' ` +
        `when encoding '{"username":"admin","password":"12345"}'`, () => {
      const actual = '{"username":"admin","password":"12345"}';
      const expected = 'eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NSJ9';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });

    it(`should return '8J-YhA' when encoding '😄'`, () => {
      const actual = '😄';
      const expected = '8J-YhA';
      assert.equal(base64Utils.base64UrlEncodeString(actual), expected);
    });
  });

  describe('#base64UrlEncodeObject', () => {
    it(`should return 'e30' when encoding {}`, () => {
      const actual = {};
      const expected = 'e30';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'e30' when encoding {username: undefined}`, () => {
      const actual = {username: undefined};
      const expected = 'e30';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'eyJ1c2VybmFtZSI6bnVsbH0' when encoding ` +
        `{username: null}`, () => {
      const actual = {username: null};
      const expected = 'eyJ1c2VybmFtZSI6bnVsbH0';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NSJ9' ` +
        `when encoding {username: 'admin', password: '12345'}`, () => {
      const actual = {username: 'admin', password: '12345'};
      const expected = 'eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NSJ9';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'eyJuYW1lIjoiQWRhbSIsImFnZSI6MjJ9' ` +
        `when encoding {name: 'Adam', age: 22}`, () => {
      const actual = {name: 'Adam', age: 22};
      const expected = 'eyJuYW1lIjoiQWRhbSIsImFnZSI6MjJ9';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'eyJ1c2VybmFtZSI6Img0eDByXCIsXCJhZG1pblwiOlwidHJ1ZSJ9' ` +
        `when encoding {username: 'h4x0r","admin":"true'}`, () => {
      const actual = {username: 'h4x0r","admin":"true'};
      const expected = 'eyJ1c2VybmFtZSI6Img0eDByXCIsXCJhZG1pblwiOlwidHJ1ZSJ9';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });

    it(`should return 'eyJlbW9qaSI6IvCfmIQifQ' when encoding ` +
        `{emoji: '😄'}`, () => {
      const actual = {emoji: '😄'};
      const expected = 'eyJlbW9qaSI6IvCfmIQifQ';
      assert.equal(base64Utils.base64UrlEncodeObject(actual), expected);
    });
  });
});
