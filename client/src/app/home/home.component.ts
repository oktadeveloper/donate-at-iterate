import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DonationService } from '../shared/donation/donation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  donations: any = {
    time: 0,
    money: 0
  };

  constructor(private donationService: DonationService) {
  }

  ngOnInit() {
    this.sub = this.donationService.getStats().subscribe((donations: any) => {
      this.donations = donations;
    }, error => console.error(error));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
