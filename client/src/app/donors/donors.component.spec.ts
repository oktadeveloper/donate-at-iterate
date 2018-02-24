import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsComponent } from './donors.component';
import { NvD3Module } from 'ng2-nvd3';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../shared/donation/donation.service';

describe('DonorsComponent', () => {
  let component: DonorsComponent;
  let fixture: ComponentFixture<DonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonorsComponent],
      imports: [MatCardModule, NvD3Module, HttpClientTestingModule, FormsModule],
      providers: [DonationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
