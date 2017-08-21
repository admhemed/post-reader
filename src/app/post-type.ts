import * as _ from 'lodash';

export interface Post {
    id: number;
    title: string;
    body: string;
    active: boolean;
    favorite: boolean;
}
export function initializePost(): Post {
    return {
        id: 0,
        title: '',
        body: '',
        active: false,
        favorite: false
    };
}
export interface ApiPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function viewModelMap(p: ApiPost): Post {
  const post = _.cloneDeep(p);
  delete post.userId;
  post.active = false;
  post.favorite = false;
  return post;
}
