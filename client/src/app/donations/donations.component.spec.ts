import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsComponent } from './donations.component';
import { NvD3Module } from 'ng2-nvd3';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../shared/donation/donation.service';

describe('DonationsComponent', () => {
  let component: DonationsComponent;
  let fixture: ComponentFixture<DonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonationsComponent],
      imports: [MatCardModule, NvD3Module, HttpClientTestingModule, FormsModule],
      providers: [DonationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
