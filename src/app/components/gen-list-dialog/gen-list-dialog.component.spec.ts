import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenListDialogComponent } from './gen-list-dialog.component';

describe('GenListDialogComponent', () => {
  let component: GenListDialogComponent;
  let fixture: ComponentFixture<GenListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
