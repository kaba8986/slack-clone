import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojipickerComponent } from './emojipicker.component';

describe('EmojipickerComponent', () => {
  let component: EmojipickerComponent;
  let fixture: ComponentFixture<EmojipickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojipickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmojipickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
