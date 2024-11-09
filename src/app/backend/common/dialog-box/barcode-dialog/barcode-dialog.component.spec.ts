import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeDialogComponent } from './barcode-dialog.component';

describe('BarcodeDialogComponent', () => {
  let component: BarcodeDialogComponent;
  let fixture: ComponentFixture<BarcodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarcodeDialogComponent]
    });
    fixture = TestBed.createComponent(BarcodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
