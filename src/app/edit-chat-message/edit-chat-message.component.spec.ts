import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatMessageComponent } from './edit-chat-message.component';

describe('EditChatMessageComponent', () => {
  let component: EditChatMessageComponent;
  let fixture: ComponentFixture<EditChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChatMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
