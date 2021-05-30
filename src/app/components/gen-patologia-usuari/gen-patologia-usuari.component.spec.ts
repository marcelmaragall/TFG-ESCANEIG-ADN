import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenPatologiaUsuariComponent } from './gen-patologia-usuari.component';

describe('GenPatologiaUsuariComponent', () => {
  let component: GenPatologiaUsuariComponent;
  let fixture: ComponentFixture<GenPatologiaUsuariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenPatologiaUsuariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenPatologiaUsuariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
