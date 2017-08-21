import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';

const routes: Routes = [
  {
    path: 'post-list',
    component: PostListComponent
  },
  {
    path: 'post-list/:id',
    component: PostListComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/post-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
