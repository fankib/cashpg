import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityDetailComponent } from './identity-detail.component';

describe('IdentityDetailComponent', () => {
  let component: IdentityDetailComponent;
  let fixture: ComponentFixture<IdentityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
