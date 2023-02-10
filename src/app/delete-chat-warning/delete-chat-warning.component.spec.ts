import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChatWarningComponent } from './delete-chat-warning.component';

describe('DeleteChatWarningComponent', () => {
  let component: DeleteChatWarningComponent;
  let fixture: ComponentFixture<DeleteChatWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChatWarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteChatWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
