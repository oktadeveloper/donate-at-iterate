import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation/donation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnDestroy {
  donation: any = {
    type: 'money'
  };
  sub: Subscription;

  constructor(private router: Router, private donationService: DonationService) { }

  save(form: NgForm) {
    this.sub = this.donationService.save(form).subscribe(result => {
      this.router.navigate(['/thank-you']);
    }, error => console.error(error));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
