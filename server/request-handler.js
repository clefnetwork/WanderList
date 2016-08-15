var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');
var mongoose = require('mongoose');

var path = require('path');
// var Users = require('./collections/users');
// var User = require('./models/user');
var jsonfile = require('jsonfile');

// var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function(app) {
  //go to homepage
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  //get all lists, ADAPTED FOR MONGO
  app.get('/api/lists', function(req, res) {
    console.log("myreq", req);
    List.find({}, function(err, docs) {
      if(err) throw err;
      res.send(docs);
    });
  });

//List1 is Temporary for Pagination, Testing purposes only
   app.post('/api/lists1', function(req, res) {
    console.log("myreq", req.body);
    // List.find({}, function(err, docs) {
    //   if(err) throw err;
    //   res.send(docs);
    // });

      let p = (req.body.type - 1) * 10;
      console.log(p);


     List
    .find({})
    .sort({createdAt: 'asc'})
    .limit(10)
    .skip(p)
    .exec(function (err, posts) {

       res.send(posts);
      })
  




     //  List.find({}, { skip: p, limit: 5 }, function(err, results) {
     //    if(err) throw err;
     //    res.send(results);
     // });
  });




  app.get('/api/user', function(req, res) {
    User.findOne({'userId': 'IdsmlJL8EASGrdmZutK9P6HB2443'}, function(err, user) {
      if(err) throw err;
      res.send(user);
    });
  });

  app.get('/api/auth', function(req, res) {
    var info = req.query;
    User.where({
      username: info.username,
      password: info.password
    }).fetch().then(function(user) {
      if(user) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  app.post('/api/auth', function(req, res) {
    var info = req.body;
    let userSetup = {
      username: req.body.displayName,
      email: req.body.email,
      userId: req.body.userId,
      photo: req.body.photo,
      upvotedLists: [],
      downvotedLists: []

    }

    User.findOne({userId: req.body.userId}, function(err, user){
      if(err) throw err;
      if(!user){
        new User(userSetup).save(function(err){
          if(err) throw err;
        });
      }
      res.status(201).json(userSetup);

    })
  });
  //get individual list
  app.get('/api/lists/:id', function(req, res) {
    var id = req.params.id;

    List.findOne({_id: id}, function(err, obj) {
      if(err) throw err;
      res.send(obj);
    });
  });

  // Delete list
  app.delete('/api/lists/:id', function(req, res){
    List.findByIdAndRemove({_id: req.params.id}, function(err){
      if(err) throw err;
    });

  });

  //post a list
  app.post('/api/lists/', function(req, res){
    req.body.upvote = 0;
    req.body.downvote = 0;
    req.body.comments = [];
    req.body.createdAt = Date.now();

    var posted = req.body;

    new List(posted).save(function(err){
      if (err) throw err;
      res.status(201).json(posted);
    });
  });

  //post a comment
  app.post('/api/comments/', function(req, res){
    List.findById(req.body._id).exec()
    .then(function(doc) {
      doc.comments.push({
        "userId": req.body.userId,
        "user": req.body.user,
        "text": req.body.text,
        posted: Date.now()
      });

      return doc.save(); //returns a promise
    })
    .then(function(doc) {
      res.send(doc);
    })
    .catch(function(err) {
      throw err;
    });
  });

  //remove a comment
  app.post('/api/comments/:listId', function(req, res) {
    List.findById(req.params.listId).exec()
    .then(function(doc) {
      doc.comments.splice(req.body.commentIndex, 1);
      return doc.save(); //returns a promise
    })
    .then(function(doc) {
      res.send(doc);
    })
    .catch(function(err) {
      throw err;
    });

  });

  //post a vote for a list
  app.post('/api/votes', function(req, res){
    //params
    //@req.body.lid string
    //@req.body.votes boolean
    //@req.body.uid string
    var lid = req.body.lid;
    var vflag = req.body.votes;
    var uid = req.body.uid;

    console.log("USERID", uid);

    var mapUpLists = {};
    var mapDownLists = {};
    User.findOne({'userId': uid}, function(err, info) {
      if(err) throw err;
      var upflag = info.upvotedLists.map(function(objId) {
        return objId.toString();
      }).includes(lid) || false;
      var downflag = info.downvotedLists.map(function(objId) {
        return objId.toString();
      }).includes(lid) || false;
      var addUpFlag = false;
      var addDownFlag = false;
      var delUpFlag = false;
      var delDownFlag = false;
      List.findOne({'_id': lid}, function(err, list) {
        if(err) throw err;
        if(vflag) {
          if(!upflag && !downflag) {
            list.upvote = +list.upvote + 1;
            addUpFlag = true;
          }
          else if(!upflag && downflag) {
            list.upvote = +list.upvote + 1;
            list.downvote = +list.downvote - 1;
            addUpFlag = true;
            delDownFlag = true;
          }
          else if(upflag && !downflag) {
            list.upvote = +list.upvote - 1;
            delUpFlag = true;
          }
        } else {
          if(!upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            addDownFlag = true;
          }
          else if(upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            list.upvote = +list.upvote - 1;
            addDownFlag = true;
            delUpFlag = true;
          }
          else if(!upflag && downflag) {
            list.downvote = +list.downvote - 1;
            delDownFlag = true;
          }
        }
        list.save(function(err) {
          if(err) throw err;
          if(addUpFlag) {
            info.upvotedLists.push(lid);
            info.save(function(err) {
              if(err) throw err;
            });
          }
          if(addDownFlag) {
            info.downvotedLists.push(lid);
            info.save(function(err) {
              if(err) throw err;
            });
          }
          if(delUpFlag) {
            User.update({'userId': uid}, { $pullAll: {'upvotedLists': [lid]}}, function(err) {
              if(err) throw err;
            });
          }
          if(delDownFlag) {
            User.update({'userId': uid}, { $pullAll: {'downvotedLists': [lid]}}, function(err) {
              if(err) throw err;
            });
          }
        });
        res.sendStatus(201);
      });
    });
  });

  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}
