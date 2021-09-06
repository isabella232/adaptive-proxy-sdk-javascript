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

const FactorService = require('../factors/factorService');


/**
 * A class for making push notification related requests to OIDC. These include
 * initiating and attempting a push notification verification.
 * @extends FactorService
 * @author Adam Dorogi-Kaposi <adam.dorogi-kaposi@ibm.com>
 */
class PushService extends FactorService {
  /**
   * Request a push notification verification.
   * @param {string} signatureId The identifier of the signature enrollment to
   * perform second-factor verification with.
   * @param {string} authenticatorId The identifier of the authenticator
   * belonging to the signature.
   * @param {string} message The verification message to be displayed in-app.
   * @param {string} originIpAddress The IP address from which the
   * authentication is attempted.
   * @param {string} originUserAgent The user agent from which the
   * authentication is attempted.
   * @param {string} pushNotificationTitle The title to be displayed
   * in the push notification notification banner.
   * @param {string} pushNotificationMessage The message to be displayed
   * in the push notification banner.
   * @param {Object[]} additionalData An array of objects containing
   * <code>"name"</code> and <code>"value"</code> attributes to be displayed
   * in-app.
   * @return {Promise<string>} The HTTP response body of the request.
   */
  async generate(signatureId, authenticatorId, message, originIpAddress,
      originUserAgent, pushNotificationTitle, pushNotificationMessage,
      additionalData) {
    const response = await this.post(`/v1.0/authenticators/` +
      `${authenticatorId}/verifications`,
    {
      transactionData: {
        message,
        originIpAddress,
        originUserAgent,
        additionalData,
      },
      pushNotification: {
        title: pushNotificationTitle,
        message: pushNotificationMessage,
        send: true,
      },
      authenticationMethods: [
        {
          id: signatureId,
          methodType: 'signature',
        },
      ],
      logic: 'OR',
      expiresIn: 120,
    });
    return response.data;
  }

  /**
   * Check status of a push notification verification.
   * @param {string} authenticatorId The identifier of the authenticator
   * belonging to the signature.
   * @param {string} verificationId The identifier of the verification initiated
   * in {@link PushService#generate}.
   * @return {Promise<string>} The HTTP response body of the request.
   */
  async evaluate(authenticatorId, verificationId) {
    const response = await this.get(`/v1.0/authenticators/` +
        `${authenticatorId}/verifications/${verificationId}`,
    {returnJwt: true});
    return response.data;
  }
}

module.exports = PushService;
