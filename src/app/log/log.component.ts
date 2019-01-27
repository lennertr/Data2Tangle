import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../services/log.service';
import {UtilityService} from '../services/utility.service';
import {ElectronService} from 'ngx-electron';
import {Router} from '@angular/router';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnDestroy {

  log = [];
  logSubscription;

  constructor(private logService: LogService,
              private utilityService: UtilityService,
              private electronService: ElectronService,
              private zone: NgZone,
              private router: Router,
              private clipboardService: ClipboardService) {
    this.utilityService.setToolbarTitle('Log');
    this.logSubscription = this.logService.getLogObservable().subscribe(log => {
      this.log = log;
    });
  }

  ngOnDestroy() {
    this.logSubscription.unsubscribe();
  }

  formatDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  copy(data: string) {
    this.clipboardService.copyFromContent(data);
    this.utilityService.openSnackBar('Copied to clipboard');
  }

  viewClicked(tailTransactionHash: string) {
    const shell = this.electronService.shell;
    shell.openExternal('https://thetangle.org/transaction/' + tailTransactionHash);
  }

  exportClicked(tailTransactionHash: string) {
    this.zone.run(async () => {
      await this.router.navigateByUrl('/export/' + tailTransactionHash);
    });
  }

}
