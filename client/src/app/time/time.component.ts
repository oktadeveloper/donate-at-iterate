import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation/donation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnDestroy {
  donation: any = {
    type: 'time'
  };
  sub: Subscription;

  constructor(private router: Router, private donationService: DonationService) {
  }

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
