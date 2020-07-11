import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatologiaListComponent } from './patologia-list.component';

describe('PatologiaListComponent', () => {
  let component: PatologiaListComponent;
  let fixture: ComponentFixture<PatologiaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatologiaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatologiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
