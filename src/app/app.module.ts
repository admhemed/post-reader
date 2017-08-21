import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ServerApiService} from './server-api.service';
import {PostService} from './post.service';
import { PostListComponent } from './post-list/post-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    ServerApiService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
