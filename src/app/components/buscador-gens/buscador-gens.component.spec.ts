import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorGensComponent } from './buscador-gens.component';

describe('BuscadorGensComponent', () => {
  let component: BuscadorGensComponent;
  let fixture: ComponentFixture<BuscadorGensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorGensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorGensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
