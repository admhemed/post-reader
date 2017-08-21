import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServerApiService } from './server-api.service';
import { ApiPost, Post, viewModelMap } from './post-type';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Injectable()
export class PostService implements OnDestroy {
  private subject: BehaviorSubject<Post[]>;
  posts$: Observable<Post[]>;
  private sub: Subscription;
  private activePostId = 1;

  constructor(private serverApiService: ServerApiService) {
    this.subject = new BehaviorSubject<Post[]>([]);
    this.posts$ = this.subject.asObservable();
    this.serverApiService.getPosts()
      .filter(posts => !!posts.length)
      .map(
        (apiPosts: ApiPost[]): Post[] => _.map(apiPosts, viewModelMap)
      )
      .map(
        posts => this.setActive(posts)
      )
      .subscribe(
        posts => {
          this.subject.next(posts);
        },
        (error) => {
          console.log(error); // handle the error by doing something
        }
      );
  }

  private setActive(posts: Post[]): Post[] {
    const id = this.activePostId;
    posts = _.cloneDeep(posts);
    posts.forEach(post => post.active = false);
    const p = _.find(posts, { id});
    p.active = true;
    return posts
  }

  setActivePost(id: number): void {
    this.activePostId = id; // use for initial state
    if (this.subject.getValue().length) { // avoid initial state
      const posts = this.setActive(this.subject.getValue());
      this.subject.next(posts);
    }
  }

  toggleFavoritePost(post): void {
    const posts = _.cloneDeep(this.subject.getValue());
    const p: Post = _.find(posts, {id: post.id});
    p.favorite = !p.favorite;
    this.subject.next(posts);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
