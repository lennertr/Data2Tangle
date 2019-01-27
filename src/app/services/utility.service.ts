import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private toolbarTitle: BehaviorSubject<string> = new BehaviorSubject('CSV2Tangle');

  constructor(private snackBar: MatSnackBar) { }

  getIsLoadingObservable(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  getToolbarTitleObservable(): Observable<string> {
    return this.toolbarTitle.asObservable();
  }

  setIsLoading(val: boolean) {
    this.isLoading.next(val);
  }

  setToolbarTitle(val: string) {
    this.toolbarTitle.next(val);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
    });
  }
}
