import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingComponent } from './selling.component';

describe('SellingComponent', () => {
  let component: SellingComponent;
  let fixture: ComponentFixture<SellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellingComponent]
    });
    fixture = TestBed.createComponent(SellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
