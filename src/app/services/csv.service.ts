import { Injectable } from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private papa: Papa,
              private electronService: ElectronService) { }

  csvstringToJson(csv: string, importOptions) {
    return new Promise((resolve, reject) => {
      resolve(this.papa.parse(csv, importOptions));
    });
  }

  jsonToCsvstring(json) {
    return new Promise((resolve, reject) => {
      resolve(this.papa.unparse(json));
    });
  }

  readFile(path: string) {
    const fs = this.electronService.remote.require('fs');
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  writeFile(path: string, data) {
    const fs = this.electronService.remote.require('fs');
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, data, 'utf8', function (error, result) { // TODO
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
