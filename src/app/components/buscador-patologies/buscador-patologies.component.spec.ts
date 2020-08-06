import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPatologiesComponent } from './buscador-patologies.component';

describe('BuscadorPatologiesComponent', () => {
  let component: BuscadorPatologiesComponent;
  let fixture: ComponentFixture<BuscadorPatologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorPatologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPatologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
