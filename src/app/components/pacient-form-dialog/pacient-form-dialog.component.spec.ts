import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientFormDialogComponent } from './pacient-form-dialog.component';

describe('PacientFormDialogComponent', () => {
  let component: PacientFormDialogComponent;
  let fixture: ComponentFixture<PacientFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
