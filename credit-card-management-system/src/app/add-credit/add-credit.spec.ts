import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCredit } from './add-credit';

describe('AddCredit', () => {
  let component: AddCredit;
  let fixture: ComponentFixture<AddCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCredit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
