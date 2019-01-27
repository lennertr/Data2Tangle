import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ElectronService} from 'ngx-electron';
import {Papa} from 'ngx-papaparse';
import {Router} from '@angular/router';
import {UtilityService} from '../services/utility.service';
import {CsvService} from '../services/csv.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnDestroy {

  importOptionsSubscription;

  importOptions = {
    delimiter: '',
    newline: '',
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    dynamicTyping: false,
    encoding: '',
    worker: false,
    skipEmptyLines: false
  };

  constructor(private dataService: DataService,
              private electronService: ElectronService,
              private papa: Papa,
              private zone: NgZone,
              private router: Router,
              private utilityService: UtilityService,
              private csvService: CsvService) {
    this.utilityService.setToolbarTitle('CSV Import');
    this.importOptionsSubscription = this.dataService.getImportOptionsObservable().subscribe(importOptions => {
      this.importOptions = importOptions;
    });
  }

  ngOnDestroy() {
    this.importOptionsSubscription.unsubscribe();
  }

  dummyDataClicked() {
    const csv = { data: [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
      ]};
    this.dataService.setData(csv);
    this.dataService.setImportOptions(this.importOptions);
    this.zone.run(async () => {
      await this.router.navigateByUrl('/import/view');
    });
  }

  importClicked() {
    this.electronService.remote.dialog.showOpenDialog(
      {title: 'Select a file',
        properties: ['openFile'],
        filters: [{ name: 'CSV', extensions: ['csv'] }]},
      async (filePath) => {
        if (filePath === undefined) {
          console.log('You didn\'t select a file');
          return;
        }
        const fileName = filePath[0].split('/').pop();
        this.dataService.setFileName(fileName);
        let csv = await this.csvService.readFile(filePath[0]);
        csv = await this.csvService.csvstringToJson(csv.toString(), this.importOptions);
        this.dataService.setData(csv);
        this.dataService.setImportOptions(this.importOptions);
        this.zone.run(async () => {
          await this.router.navigateByUrl('/import/view');
        });
      });
  }

}
