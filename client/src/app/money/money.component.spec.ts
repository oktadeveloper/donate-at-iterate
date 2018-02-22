import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyComponent } from './money.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DonationService } from '../shared/donation/donation.service';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MoneyComponent', () => {
  let component: MoneyComponent;
  let fixture: ComponentFixture<MoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyComponent],
      imports: [MatCardModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule,
        HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [DonationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
