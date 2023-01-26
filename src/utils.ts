// @ts-ignore
import * as CryptoJS from 'crypto-js';

  /*
  * Encrypt a derived hd private key with a given pin and return it in Base64 form
  */
 export const  encryptNote= (text:string, key:string) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  /**
   * Decrypt an encrypted message
   * @param encryptedBase64 encrypted data in base64 format
   * @param key The secret key
   * @return The decrypted content
   */
  export const decryptNote = (encryptedBase64:string, key:string) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    let message = ''
    if (decrypted) {
      try {
        message= decrypted.toString(CryptoJS.enc.Utf8);
      } catch (e) {
       message = 'Please check your encrption key'
      }
    }
    return message;
  };