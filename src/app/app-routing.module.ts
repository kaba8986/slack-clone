import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path: 'channel', component:ChannelComponent},
  {path: 'signin', component:SigninComponent },
  {path: 'login', component:LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
