import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanerListComponent } from './escaner-list.component';

describe('EscanerListComponent', () => {
  let component: EscanerListComponent;
  let fixture: ComponentFixture<EscanerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
