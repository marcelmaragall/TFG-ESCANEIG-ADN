import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouEscanerComponent } from './nou-escaner.component';

describe('NouEscanerComponent', () => {
  let component: NouEscanerComponent;
  let fixture: ComponentFixture<NouEscanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouEscanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouEscanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
