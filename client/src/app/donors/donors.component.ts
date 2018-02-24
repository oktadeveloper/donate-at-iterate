import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DonationService } from '../shared/donation/donation.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  hours: Array<any>;
  dollars: Array<any>;
  totalHours = 0;
  totalDollars = 0;
  timer: Observable<number>;

  constructor(private donationService: DonationService) {
    this.timer = TimerObservable.create(0, 5000);
  }

  ngOnInit() {
    this.timer.subscribe(() => {
        this.sub = this.donationService.getDonors()
          .subscribe(data => {
            this.hours = data['time'];
            this.dollars = data['money'];
            this.totalHours = this.totalDollars = 0;
            this.hours.forEach(donation => {
              this.totalHours += Number.parseInt(donation.hours);
            });
            this.dollars.forEach(donation => {
              this.totalDollars += Number.parseInt(donation.amount);
            });
          }, error => console.error(error));
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
