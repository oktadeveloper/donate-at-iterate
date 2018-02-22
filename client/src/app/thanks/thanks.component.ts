import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DonationService } from '../shared/donation/donation.service';
import { Subscription } from 'rxjs/Subscription';
import { D3ChartService } from './d3chart.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css',
    './thanks.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ThanksComponent implements OnInit, OnDestroy {
  donations: any = {
    time: 0,
    money: 0
  };
  donationData: any;
  chartOptions: any;
  sub: Subscription;

  constructor(private donationService: DonationService) {
  }

  ngOnInit() {
    this.sub = this.donationService.getStats().subscribe((donations: any) => {
      this.donations = donations;
      this.chartOptions = {... D3ChartService.getChartConfig()};
      this.donationData = [
        {
          key: 'Hours',
          y: donations.time,
          color: '#13C0f9'
        }, {
          key: 'Money',
          y: donations.money,
          color: '#15F94E'
        }
      ];
    }, error => console.error(error));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
