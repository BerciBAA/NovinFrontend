import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantCreationComponent } from './accountant-creation.component';

describe('AccountantCreationComponent', () => {
  let component: AccountantCreationComponent;
  let fixture: ComponentFixture<AccountantCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantCreationComponent]
    });
    fixture = TestBed.createComponent(AccountantCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
