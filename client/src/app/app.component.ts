import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { D3ChartService } from './thanks/d3chart.service';
import { DonationService } from './shared/donation/donation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Donate @ Iterate';
  sub: Subscription;
  donations: any = {
    time: 0,
    money: 0
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title,
              private donationService: DonationService) {
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.title = event['title'];
        this.titleService.setTitle(event['title']);
      });

    this.sub = this.donationService.getStats().subscribe((donations: any) => {
      this.donations = donations;
    }, error => console.error(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
