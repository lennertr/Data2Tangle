import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private log: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private electronService: ElectronService) {
    this.log.next(this.parseDataFile(this.getConfigPath(), []));
  }

  getLogObservable(): Observable<any> {
    return this.log.asObservable();
  }

  async addLogEntry(type: string, date: number, tailTransactionHash: string, name: string) {
    const log = this.log.getValue();
    log.unshift({type: type, date: date, tailTransactionHash: tailTransactionHash, name: name});
    await this.writeDataFile(this.getConfigPath(), log);
    this.log.next(log);
  }

  getConfigPath() {
    const userDataPath = this.electronService.remote.app.getPath('userData');
    const path = this.electronService.remote.require('path');
    return path.join(userDataPath, 'log.json');
  }

  async writeDataFile(path, data) {
    const fs = this.electronService.remote.require('fs');
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, JSON.stringify(data), 'utf8', function (error, result) { // TODO
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  parseDataFile(filePath, defaults) {
    try {
      const fs = this.electronService.remote.require('fs');
      return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
      return defaults;
    }
  }
}
