import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private secretkey = "F5F30A2AC72A637354792DB40790F8BF";

  constructor() { }

  setSessionStorage(key, data): Promise<null> {
    return new Promise((resolve, reject) => {
      var ciphertext = this.encrypt(data);
      window.sessionStorage.setItem(key, ciphertext);
      resolve();
    });
  }

  getSessionStorage(key): string {
    var temp = window.sessionStorage.getItem(key);
    if (temp) {
      try {

        return this.decrypt(temp);
      } catch (e) {
        this.removeHtmlStorage(key);
        return null;
      }
    } else {
      return null;
    }
  }

  removeHtmlStorage(name: any) {
    window.sessionStorage.removeItem(name);
    window.sessionStorage.removeItem(name + '_time');
  }

  removeSessionStorage(key): Promise<null> {
    return new Promise((resolve, reject) => {
      window.sessionStorage.removeItem(key);
      resolve();
    });
  }

  setLocalStorage(key, data): Promise<null> {
    return new Promise((resolve, reject) => {
      var ciphertext = this.encrypt(data);
      window.localStorage.setItem(key, ciphertext);
      resolve();
    });
  }

  getLocalStorage(key): string {
    var temp = window.localStorage.getItem(key);
    if (temp) {
      try {
        return this.decrypt(temp);
      } catch (e) {
        this.removeLocalStorage(key);
        return null;
      }
    } else {
      return null;
    }
  }

  removeLocalStorage(key): Promise<null> {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(key);
      resolve();
    });
  }


  encrypt(data) {
    if (data) {
      var ciphertext = CryptoJS.AES.encrypt(data.toString(), this.secretkey);
      return ciphertext.toString();
    } else {
      return "";
    }
  }

  decrypt(ciphertext) {
    if (ciphertext) {
      var bytes = CryptoJS.AES.decrypt(ciphertext, this.secretkey);
      var detext = bytes.toString(CryptoJS.enc.Utf8);
      return detext;
    } else {
      return "";
    }
  }
}
