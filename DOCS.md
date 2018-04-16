# Documentation

Module feed takes input as RethinkDB queryObject, creates a [queryfeed](https://rethinkdb.com/docs/changefeeds/javascript/) and returns an [observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html).

```javascript
feed(r.table('users'))
feed(r.table('users').filter( ... ))
feed(r.table('users')).subscribe( ... )
```

Usage examples in unit tests