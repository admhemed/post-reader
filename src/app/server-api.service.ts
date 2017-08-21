import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiPost} from './post-type';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/publishLast';

const ApiUrl = 'http://jsonplaceholder.typicode.com/posts';

@Injectable()
export class ServerApiService {

  constructor(private http: Http) { }

  getPosts(): Observable<ApiPost[]> {
    return this.http.get(ApiUrl)
      .map(res => res.json());
      // .publishLast().refCount();
  }

}
