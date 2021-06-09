import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerDetallComponent } from './escaner-detall.component';

describe('EscanerDetallComponent', () => {
  let component: EscanerDetallComponent;
  let fixture: ComponentFixture<EscanerDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanerDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanerDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
