import {Component, NgZone, OnDestroy} from '@angular/core';
import { composeAPI } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';
import {UtilityService} from '../services/utility.service';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-import-tangle-settings-component',
  templateUrl: './import-tangle-settings-component.component.html',
  styleUrls: ['./import-tangle-settings-component.component.scss']
})
export class ImportTangleSettingsComponentComponent implements OnDestroy {

  tangleSettingsSubscription;
  tangleSettings = {
    nodeAddress: '',
    receiverAddress: '',
    seed: ''
  };

  dataSubscription;
  data;

  constructor(private utilityService: UtilityService,
              private dataService: DataService,
              private zone: NgZone,
              private router: Router,
              private logService: LogService) {
    this.dataSubscription = this.dataService.getDataObservable().subscribe(data => {
      this.data = data.data;
    });
    this.tangleSettingsSubscription = this.dataService.getTangleSettingsObservable().subscribe(tangleSettings => {
      this.tangleSettings = tangleSettings;
    });
  }

  backClicked() {
    this.dataService.setTangleSettings(this.tangleSettings);
    this.zone.run(async () => {
      await this.router.navigateByUrl('/import/view');
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.tangleSettingsSubscription.unsubscribe();
  }

  testClicked() {
    this.utilityService.setIsLoading(true);
    const iota = composeAPI({
      provider: this.tangleSettings.nodeAddress
    });

    iota.getNodeInfo()
      .then(info => {
        console.log(info);
        this.utilityService.openSnackBar('Connected to Node. Please ensure remote POW is enabled!');
        this.utilityService.setIsLoading(false);
        }
      )
      .catch(err => {
        console.log(`Request error: ${err.message}`);
        this.utilityService.openSnackBar('Couldn\'t connect to Node');
        this.utilityService.setIsLoading(false);
      });
  }

  sendClicked() {
    this.utilityService.setIsLoading(true);

    const iota = composeAPI({
      provider: this.tangleSettings.nodeAddress
    });

    const message = asciiToTrytes(JSON.stringify(this.data));
    const transfers = [
      {
        value: 0,
        address: this.tangleSettings.receiverAddress,
        message: message
      }
    ];

    iota.prepareTransfers(this.tangleSettings.seed, transfers)
      .then(trytes => iota.sendTrytes(trytes, 3, 14))
      .then(async bundle => {
        await this.logService.addLogEntry('transaction', bundle[0].timestamp, this.getTailTransactionHash(bundle), this.dataService.getFileName());
        this.utilityService.openSnackBar('Transaction sent');
        this.utilityService.setIsLoading(false);
        this.zone.run(async () => {
          await this.router.navigateByUrl('/log');
        });
      }).catch(err => {
        console.log(err);
        this.utilityService.openSnackBar('Couldn\'t send transaction');
        this.utilityService.setIsLoading(false);
    });
  }

  getTailTransactionHash(bundle) {
    for (const tx of bundle) {
      if (tx.currentIndex === 0) {
        return tx.hash;
      }
    }
    console.error('tailTransactionHash not found');
    return null;
  }

  generateAddressClicked() {
    if (this.tangleSettings.seed.length !== 81) {
      this.utilityService.openSnackBar('Please enter a valid seed');
      return;
    }
    this.utilityService.setIsLoading(true);
    const iota = composeAPI({
      provider: this.tangleSettings.nodeAddress
    });
    iota.getNewAddress(this.tangleSettings.seed)
      .then(address => {
        this.tangleSettings.receiverAddress = address as string;
        this.utilityService.setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        this.utilityService.openSnackBar('Couldn\'t generate new address');
        this.utilityService.setIsLoading(false);
      });
  }

  // NOTE: This is not a secure method to generate seeds!
  generateSeedClicked() {
    this.utilityService.openSnackBar('Don\'t use this seed to store iota!');
    let seed = '';
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';

    for (let i = 0; i < 81; i++) {
      seed += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    this.tangleSettings.seed = seed;
  }
}
