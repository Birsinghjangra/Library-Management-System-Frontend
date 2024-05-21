import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBooksComponent } from './issue-books.component';

describe('IssueBooksComponent', () => {
  let component: IssueBooksComponent;
  let fixture: ComponentFixture<IssueBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueBooksComponent]
    });
    fixture = TestBed.createComponent(IssueBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
