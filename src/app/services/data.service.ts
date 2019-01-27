import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: BehaviorSubject<any> = new BehaviorSubject(null);
  private fileName: BehaviorSubject<string> = new BehaviorSubject(null);
  private importOptions: BehaviorSubject<any> = new BehaviorSubject(
    {
      delimiter: '',
      newline: '',
      quoteChar: '"',
      escapeChar: '"',
      header: true,
      dynamicTyping: false,
      encoding: '',
      worker: false,
      skipEmptyLines: false
    });

  private tangleSettings: BehaviorSubject<any> = new BehaviorSubject(
    {
      nodeAddress: '',
      receiverAddress: '',
      seed: ''
    });

  constructor() { }

  getDataObservable(): Observable<any> {
    return this.data.asObservable();
  }

  getImportOptionsObservable(): Observable<any> {
    return this.importOptions.asObservable();
  }

  getTangleSettingsObservable(): Observable<any> {
    return this.tangleSettings.asObservable();
  }

  getFileName(): string {
    return this.fileName.getValue();
  }

  setData(val) {
    this.data.next(val);
  }

  setImportOptions(val) {
    this.importOptions.next(val);
  }

  setTangleSettings(val) {
    this.tangleSettings.next(val);
  }

  setFileName(val: string) {
    this.fileName.next(val);
  }
}
