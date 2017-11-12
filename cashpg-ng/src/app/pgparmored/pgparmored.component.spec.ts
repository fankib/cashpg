import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgparmoredComponent } from './pgparmored.component';

describe('PgparmoredComponent', () => {
  let component: PgparmoredComponent;
  let fixture: ComponentFixture<PgparmoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgparmoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgparmoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
