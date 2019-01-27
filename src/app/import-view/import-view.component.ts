import {Component, NgZone, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-import-view',
  templateUrl: './import-view.component.html',
  styleUrls: ['./import-view.component.scss']
})
export class ImportViewComponent implements OnDestroy {

  data;
  dataSubscription;

  columnsToDisplay: string[] = [];

  constructor(private dataService: DataService,
              private zone: NgZone,
              private router: Router) {
    this.dataSubscription = this.dataService.getDataObservable().subscribe(data => {
      this.data = data.data;
      this.setColumns(data.data);
    });
  }

  setColumns(data) {
    this.columnsToDisplay = Object.keys(data[0]);
  }

  backClicked() {
    this.zone.run(async () => {
      await this.router.navigateByUrl('/import');
    });
  }

  nextClicked() {
    this.zone.run(async () => {
      await this.router.navigateByUrl('/import/tangleSettings');
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
