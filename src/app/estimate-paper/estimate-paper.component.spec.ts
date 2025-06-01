import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatePaperComponent } from './estimate-paper.component';

describe('EstimatePaperComponent', () => {
  let component: EstimatePaperComponent;
  let fixture: ComponentFixture<EstimatePaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstimatePaperComponent]
    });
    fixture = TestBed.createComponent(EstimatePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
