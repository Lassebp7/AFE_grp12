import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetails } from './credit-card-details.component';

describe('CreditCardItem', () => {
  let component: CreditCardDetails;
  let fixture: ComponentFixture<CreditCardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
