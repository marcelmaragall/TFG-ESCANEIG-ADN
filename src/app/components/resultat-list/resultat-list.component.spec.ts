import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatListComponent } from './resultat-list.component';

describe('ResultatListComponent', () => {
  let component: ResultatListComponent;
  let fixture: ComponentFixture<ResultatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
