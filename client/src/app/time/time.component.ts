import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation/donation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  donation: any = {
    type: 'time'
  };

  constructor(private router: Router, private donationService: DonationService) {
  }

  save(form: NgForm) {
    this.donationService.save(form).subscribe(result => {
      this.router.navigate(['/thank-you']);
    }, error => console.error(error));
  }
}
