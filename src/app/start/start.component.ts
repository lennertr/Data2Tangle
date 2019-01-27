import {Component} from '@angular/core';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(private utilityService: UtilityService) {
    this.utilityService.setToolbarTitle('CSV2Tangle');
  }
}
