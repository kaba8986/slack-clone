import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxEmojiPickerModule }  from  'ngx-emoji-picker';

import { AppComponent } from './app.component';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { TextAreaAutosizeDirective } from './directives/text-area-autosize.directive';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { ReverseTextPipe } from './pipes/reverse-text.pipe';
import { AddChatComponent } from './add-chat/add-chat.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadcontentService } from './services/threadcontent.service';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { AlertLoginComponent } from './alert-login/alert-login.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { DeleteChatWarningComponent } from './delete-chat-warning/delete-chat-warning.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { EditChatMessageComponent } from './edit-chat-message/edit-chat-message.component';




@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    SigninComponent,
    LoginComponent,
    ChatComponent,
    TextAreaAutosizeDirective,
    AddChannelComponent,
    ReverseTextPipe,
    AddChatComponent,
    ThreadComponent,
    SearchFilterComponent,
    SearchFilterPipe,
    AlertLoginComponent,
    HighlightDirective,
    DeleteChatWarningComponent,
    ChatInterfaceComponent,
    EditChatMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    PickerModule,
    NgxEmojiPickerModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [ThreadcontentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
