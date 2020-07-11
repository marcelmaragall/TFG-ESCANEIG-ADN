import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaneigComponent } from './escaneig.component';

describe('EscaneigComponent', () => {
  let component: EscaneigComponent;
  let fixture: ComponentFixture<EscaneigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscaneigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaneigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
