import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantsComponent } from './accountants.component';

describe('AccountantsComponent', () => {
  let component: AccountantsComponent;
  let fixture: ComponentFixture<AccountantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantsComponent]
    });
    fixture = TestBed.createComponent(AccountantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
