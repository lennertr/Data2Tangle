import {Component, OnDestroy} from '@angular/core';
import {UtilityService} from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'CSV2Tangle';

  toolbarTitle = 'CSV2Tangle';
  toolbarTitleSubscription;
  isLoading = false;
  isLoadingSubscription;

  constructor(private utilityService: UtilityService) {
    this.isLoadingSubscription = this.utilityService.getIsLoadingObservable().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.toolbarTitleSubscription = this.utilityService.getToolbarTitleObservable().subscribe(toolbarTitle => {
      this.toolbarTitle = toolbarTitle;
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}
