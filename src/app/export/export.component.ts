import {Component, NgZone, OnInit} from '@angular/core';
import { extractJson } from '@iota/extract-json';
import { composeAPI} from '@iota/core';
import {UtilityService} from '../services/utility.service';
import {Papa} from 'ngx-papaparse';
import {ElectronService} from 'ngx-electron';
import {CsvService} from '../services/csv.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  nodeAddress = 'https://durian.iotasalad.org:14265';
  tailTransactionHash = '';

  constructor(private utilityService: UtilityService,
              private papa: Papa,
              private electronService: ElectronService,
              private csvService: CsvService,
              private zone: NgZone,
              private router: Router,
              private route: ActivatedRoute) {
    this.utilityService.setToolbarTitle('CSV Export');
  }

  ngOnInit() {
    this.tailTransactionHash = this.route.snapshot.paramMap.get('tailTransactionHash');
  }

  testClicked() {
    this.utilityService.setIsLoading(true);
    const iota = composeAPI({
      provider: this.nodeAddress
    });

    iota.getNodeInfo()
      .then(info => {
          console.log(info);
          this.utilityService.openSnackBar('Connected to Node');
          this.utilityService.setIsLoading(false);
        }
      )
      .catch(err => {
        console.log(`Request error: ${err.message}`);
        this.utilityService.openSnackBar('Couldn\'t connect to Node');
        this.utilityService.setIsLoading(false);
      });
  }

  exportClicked() {
    this.utilityService.setIsLoading(true);
    const iota = composeAPI({
      provider: this.nodeAddress
    });
    iota.getBundle(this.tailTransactionHash)
      .then(async bundle => {
        let csvData = JSON.parse(extractJson(bundle));
        csvData = await this.csvService.jsonToCsvstring(csvData);
        this.electronService.remote.dialog.showSaveDialog(
          {title: 'Select a path',
            filters: [{ name: 'CSV', extensions: ['csv'] }]},
          async (filePath) => {
            if (filePath === undefined) {
              console.log('You didn\'t select a file');
              return;
            }
            await this.csvService.writeFile(filePath, csvData);
            this.utilityService.openSnackBar('File saved');
            this.zone.run(async () => {
              await this.router.navigateByUrl('/log');
            });
          });
        this.utilityService.setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        this.utilityService.openSnackBar('An error occurred');
        this.utilityService.setIsLoading(false);
      });
  }

}
