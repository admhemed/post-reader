import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import {Observable} from 'rxjs/Rx';
import { Post, initializePost } from '../post-type';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import * as _ from 'lodash';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  collectionSize: number;
  pageSize: number = PAGE_SIZE;
  pageNumber = 1;
  private sub: Subscription;
  private sub2: Subscription;

  page$: Observable<Post[]>;
  activePost$: Observable<Post>;
  private postsSubject: BehaviorSubject<Post[]>;
  private pageSubject: BehaviorSubject<Post[]>;
  private activePostSubject: BehaviorSubject<Post>;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
    this.pageSubject = new BehaviorSubject<Post[]>([]);
    this.activePostSubject = new BehaviorSubject<Post>(initializePost());
    this.sub2 = this.postService.posts$
      .filter(posts => !!posts.length)
      .subscribe(
      posts => {
        this.collectionSize = posts.length;
        this.postsSubject.next(posts);
        const activePost =  _.find(posts, {active: true});
        this.activePostSubject.next(activePost);
        this.loadPage(this.pageNumber);
      }
      );

    this.page$ = this.pageSubject.asObservable();
    this.activePost$ = this.activePostSubject.asObservable();
  }


  loadPage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    const posts = this.postsSubject.getValue();
    const page = posts.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
    this.pageSubject.next(page);
  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        if (params['id']) { // avoid initial route state
          this.postService.setActivePost(+params['id']);
          this.loadPage(this.pageNumber);
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  toggleFavoritePost(post) {
    this.postService.toggleFavoritePost(post);
  }
}
