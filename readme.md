# The Super Topper Blog Post Reader!!

An assignent demo to 1&1

## Installing

```
npm install
```

```
ng serve
```

Then open http://localhost:4200/


Steps & Files Description
===================

### <i class="icon-file"></i> Create the app

```
ng new app2 --skip-tests true --skip-git true --prefix '' --routing true
```
Tests are not required (FYI, I do testing and TDD)


### <i class="icon-plus"></i> Add bootstrap 4

 - Install bootstrap 4 
```
npm i bootstrap@next --save
```
 - use SCSS instead of css 
 - Install ng-bootstrap
```
npm install --save @ng-bootstrap/ng-bootstrap
```

### <i class="icon-plus"></i> Create Post type

    export interface Post {
	    id: number;
	    title: string;
	    body: string;
	    active: boolean;
	    favorite: boolean;
	}

Also provides initialising function and a mapping function.
The mapping function converts the incoming data into objects of type Post.

    export function viewModelMap(p: ApiPost): Post {
      const post = _.cloneDeep(p);
      delete post.userId;
      post.active = false;
      post.favorite = false;
      return post;
    }

### <i class="icon-plus"></i> Create API service
    ng g service server-api
this service is only to communicate with server api.
add service to providers of *Module*

### <i class="icon-plus"></i> Create Post service
This service represent a solution similar to *Store* from *Redux*.

 - It converts data into view model Post objects. 
 - provides observable *posts$* to components
 - Receives update requests from components and handle them in similar way that *store* handles *actions*


### <i class="icon-plus"></i> Create Routing file
Creates 2 routs:

      {
        path: 'post-list',
        component: PostListComponent
      },
      {
        path: 'post-list/:id',
        component: PostListComponent
      },

### <i class="icon-plus"></i> Create Post List **Smart** component

This component provides pagination, and responds to *routing*

### <i class="icon-plus"></i> Create Post Details **Presentation** component

This component shows post details and let user toggle favorite
