import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation/donation.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent {
  donation: any = {
    type: 'money'
  };

  constructor(private router: Router, private donationService: DonationService) { }

  save(form: NgForm) {
    this.donationService.save(form).subscribe(result => {
      this.router.navigate(['/thank-you']);
    }, error => console.error(error));
  }
}
