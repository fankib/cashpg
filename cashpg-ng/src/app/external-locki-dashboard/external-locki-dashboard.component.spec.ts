import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalLockiDashboardComponent } from './external-locki-dashboard.component';

describe('ExternalLockiDashboardComponent', () => {
  let component: ExternalLockiDashboardComponent;
  let fixture: ComponentFixture<ExternalLockiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalLockiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalLockiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
