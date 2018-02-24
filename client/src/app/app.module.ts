import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoneyComponent } from './money/money.component';
import { TimeComponent } from './time/time.component';
import { ThanksComponent } from './thanks/thanks.component';
import { FocusDirective } from './focus.directive';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { DonationService } from './shared/donation/donation.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DonationsComponent } from './donations/donations.component';
import { DonorsComponent } from './donors/donors.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Donate @ Iterate'
    }
  },
  {
    path: 'money',
    component: MoneyComponent,
    data: {
      title: 'Donate Money to Open Source'
    }
  },
  {
    path: 'time',
    component: TimeComponent,
    data: {
      title: 'Donate Time to Open Source'
    }
  },
  {
    path: 'thank-you',
    component: ThanksComponent,
    data: {
      title: 'Thanks for Your Donation @ Iterate!'
    }
  },
  {
    path: 'donations',
    component: DonationsComponent,
    data: {
      title: 'SMALL ACTIONS, BIG IMPACT'
    }
  }
  ,
  {
    path: 'donors',
    component: DonorsComponent,
    data: {
      title: 'Awesome Donors'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoneyComponent,
    TimeComponent,
    ThanksComponent,
    FocusDirective,
    DonationsComponent,
    DonorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    NvD3Module,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [DonationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
