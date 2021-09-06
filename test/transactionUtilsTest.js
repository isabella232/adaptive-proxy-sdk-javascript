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
const transactionUtils = require('../lib/utils/transactionUtils');


describe('transactionUtils', () => {
  describe('#createTransaction', () => {
    it('should return a random UUID after creating a transaction', () => {
      const transaction = {message: 'Hello, world!'};
      const transactionId = transactionUtils.createTransaction(transaction);

      assert.notEqual(transactionId, undefined);
    });
  });

  describe('#getTransaction', () => {
    it('should return a transaction when passed a valid transaction ID', () => {
      const transaction = {message: 'Hello, world!'};
      const transactionId = transactionUtils.createTransaction(transaction);

      assert.deepEqual(transactionUtils.getTransaction(transactionId),
          transaction);
    });

    it('should throw an error when passed an invalid transaction ID', () => {
      const transactionId = '00000000-0000-0000-0000-000000000000';

      assert.throws(() => transactionUtils.getTransaction(transactionId));
    });
  });

  describe('#updateTransaction', () => {
    it('should add a property to an existing transaction', () => {
      const transaction = {message1: 'Hello'};
      const transactionId = transactionUtils.createTransaction(transaction);

      transactionUtils.updateTransaction(transactionId, {message2: 'world!'});
      assert.deepEqual(transactionUtils.getTransaction(transactionId),
          {message1: 'Hello', message2: 'world!'});
    });

    it('should update a property of an existing transaction', () => {
      const transaction = {message: 'Hello, world!'};
      const transactionId = transactionUtils.createTransaction(transaction);

      transactionUtils.updateTransaction(transactionId, {message: 'Hello!'});
      assert.deepEqual(transactionUtils.getTransaction(transactionId),
          {message: 'Hello!'});
    });

    it('should throw an error when passed an invalid transaction ID', () => {
      const transactionId = '00000000-0000-0000-0000-000000000000';

      assert.throws(() => transactionUtils.updateTransaction(transactionId,
          {message: 'Hello!'}));
    });
  });

  describe('#deleteTransaction', () => {
    it('should delete a transaction when passed a valid transaction ID', () => {
      const transaction = {message: 'Hello, world!'};
      const transactionId = transactionUtils.createTransaction(transaction);

      assert.deepEqual(transactionUtils.getTransaction(transactionId),
          {message: 'Hello, world!'});
      transactionUtils.deleteTransaction(transactionId);
      assert.throws(() => transactionUtils.getTransaction(transactionId));
    });

    it('should throw an error when passed an invalid transaction ID', () => {
      const transactionId = '00000000-0000-0000-0000-000000000000';

      assert.throws(() => transactionUtils.deleteTransaction(transactionId));
    });
  });
});
