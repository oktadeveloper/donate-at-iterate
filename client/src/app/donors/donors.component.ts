import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DonationService } from '../shared/donation/donation.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  hours: Array<any>;
  dollars: Array<any>;

  constructor(private donationService: DonationService) {
  }

  ngOnInit() {
    this.sub = this.donationService.getDonors().subscribe(data => {
      this.hours = data['time'];
      this.dollars = data['money'];
    }, error => console.error(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
