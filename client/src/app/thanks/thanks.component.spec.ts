import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';
import { NvD3Module } from 'ng2-nvd3';
import { MatCardModule } from '@angular/material';
import { DonationService } from '../shared/donation/donation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ThanksComponent', () => {
  let component: ThanksComponent;
  let fixture: ComponentFixture<ThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThanksComponent],
      imports: [MatCardModule, NvD3Module, HttpClientTestingModule, FormsModule],
      providers: [DonationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
