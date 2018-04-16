# Code Exercise

In this exercise, your task is to develop a module that wraps [RethinkDB](https://rethinkdb.com/) changefeeds into [RX](https://github.com/Reactive-Extensions/RxJS) observables with a simple API while providing a powerful abstraction to one of Rethink's most useful features.

## Synopsis

RethinkDB is an open-source NoSQL database for realtime applications. One of the most powerful features is its ability to watch for database changes in realtime using [changefeeds](https://rethinkdb.com/docs/changefeeds/javascript/). You can write very specific queries and instantly trigger execution whenever a change occurs. For example:

```javascript
r
.table('users')
.filter({email: 'user@example.com'})
.changes()
.run(conn, () => {
  // Whenever any matching resource changes, this callback is run
});
```

This abstraction model is very helpful in the effort to avoid periodically polling the database to observe changes - which wastes resources and lacks general flexibility.

**The problem of callbacks**

Building complex business logic on top of the callback-based programming pattern quickly becomes challenging. This is especially true for asynchronous tasks. For this reason, JS is moving away from callbacks with the latest ES additions like promises and async/await.

Although promises are great they are not particularly well suited for event based systems. To unleash the full power of Rethink's evented changefeeds we can leverage the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

[Reactive-Extensions](https://github.com/Reactive-Extensions/RxJS) allows you to implement functional, event based observer patterns with a really nice API. With RX we can subscribe to any observable, use functional [MFR](https://en.wikipedia.org/wiki/MapReduce) and deal directly with data flows.

*The goal of this exercise is to implement an observer based abstraction to Rethink's changefeeds.*

## Tasks

You are expected to complete the following tasks:

- [x] Setup environment
- Fork this repository to your own GitHub profile
- Setup development environment with RethinkDB and Node >=8.0.0
- Use Docker to get up and running fast with RethinkDB


- [x] Module skeleton  
- Use the module skeleton provided as a starting point
- Adhere to the same coding style


- [x] Module implementation
- Use whatever NPM packages and resources you might need
- Use ES6 with Node >=8.0.0


- [x] Unit tests
- Unit test your module using mocha and chai


- [x] Documentation
- Write a lightweight documentation for your solution

Finally check `playground.js` and play around with your new module!

## References

**Here's some helpful resources:**

*RethinkDB*

https://rethinkdb.com/  
https://rethinkdb.com/docs/changefeeds/javascript/  

*Rethinkdbdash (improved RethinkDB client)*

https://github.com/neumino/rethinkdbdash

*RxJS*

https://github.com/Reactive-Extensions/RxJS  
