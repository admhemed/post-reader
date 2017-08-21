import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Post, initializePost} from '../post-type';
import {PostService} from '../post.service';
import {Observable} from 'rxjs/Rx';

import * as _ from 'lodash';

@Component({
  /* tslint:disable */
  selector: 'post-details',
  /* tslint:enable */
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subject: BehaviorSubject<Post>;
  post$: Observable<Post>;
  private postId: number;

  @Input()
  post: Post | Post;

  @Output()
  toggleFavoritePost: EventEmitter<Post> = new EventEmitter<Post>();

  constructor() {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toggleFavorite(post: Post): void {
    this.toggleFavoritePost.emit(post);
  }
}
