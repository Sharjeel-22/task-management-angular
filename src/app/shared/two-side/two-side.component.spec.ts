import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoSideComponent } from './two-side.component';

describe('TwoSideComponent', () => {
  let component: TwoSideComponent;
  let fixture: ComponentFixture<TwoSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoSideComponent]
    });
    fixture = TestBed.createComponent(TwoSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
