import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaguinaErroneaComponent } from './paguina-erronea.component';

describe('PaguinaErroneaComponent', () => {
  let component: PaguinaErroneaComponent;
  let fixture: ComponentFixture<PaguinaErroneaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaguinaErroneaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaguinaErroneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
