import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardList } from './credit-card-list';

describe('CreditCardList', () => {
  let component: CreditCardList;
  let fixture: ComponentFixture<CreditCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
