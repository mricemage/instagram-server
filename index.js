var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer')
var cloudinary = require('cloudinary')
var cloudinaryStorage = require('multer-storage-cloudinary')


// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 8200));

// bodyParser needs to be configured for parsing JSON from HTTP body

// receive input from client
app.use(bodyParser.json());

app.use(cors());

/* Config html directory to serve static HTML files.
   Pages are accessed with /static URL. */
app.use('/static', express.static('html'))

/* Config cloudinary for the multer-storage-cloudinary object.
   Notice that the cloudinary object automatically configures itself
   based on the Heroku env-variables. */
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '', // cloudinary folder where you want to store images, empty is root
  allowedFormats: ['jpg', 'png'],
});

/* Initialize multer middleware with the multer-storage-cloudinary based
   storage engine */
var parser = multer({ storage: storage });

// Home loading


var posts = [
        {
            id: 0,
            name: "alo",
            user: {
                id: 1,
                username: "jasonstatham",
                profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg"
            },
            image: "http://www.students.oamk.fi/~t5homi00/images/jason1.jpg",
            imageThumbnail: "http://www.students.oamk.fi/~t5homi00/images/jason1.jpg",
            likes: 892,
            caption: "Prepare for my new movies!",
            tags:  ["#thang", "#actor"],

            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "selenagomez",
                        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/selena.jpg"
                    },
                    comment: "I am really hyped for that! #newStatham",
                    userRefs: [],
                    tags: ["newStatham"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "edsheeran",
                        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/edsheeran.jpg"
                    },
                    comment: "Me too @selenagomez",
                    userRefs: ["selenagomez"],
                    tags: []
                },
            ]
        },
        {
            id: 1,
            name: "post2",
            user: {
                id: 4,
                username: "jamesmcavoy",
                profileImageSmall: "https://s-media-cache-ak0.pinimg.com/originals/f3/15/01/f3150106e24a639559d74da095a70b1c.jpg"
            },
            image: "http://cdn.inquisitr.com/wp-content/uploads/2016/07/Split-M-Night-Shyamalan-James-McAvoy-900x440.jpg",
            imageThumbnail: "http://cdn.inquisitr.com/wp-content/uploads/2016/07/Split-M-Night-Shyamalan-James-McAvoy-900x440.jpg",
            likes: 10100,
            caption: "Are you ready for Split? ",
            userRefs: [],
            tags: ["#moe", "#milk", "#actor"],
            comments: []
        },
         {
            id: 2,
            name: "post3",
            user: {
                id: 5,
                username: "jenniferlawrence",
                profileImageSmall: "http://cliqueimg.com/cache/posts/185560/copy-that-a-jennifer-lawrence-hairstyle-for-every-day-of-the-week-1676154-1456538020.640x0c.jpg"
            },
            image: "http://www.passengersmovie.com/share.jpg",
            imageThumbnail: "http://www.passengersmovie.com/share.jpg",
            likes: 7665,
            caption: "Are you ready for Passenger ?",
            userRefs: [],
            tags: ["#passenger"],
            comments: []
        },
        {
            id: 3,
            name: "post4",
            user: {
                id: 6,
                username: "eddieredmayne",
                profileImageSmall: "https://s-media-cache-ak0.pinimg.com/originals/fa/3f/69/fa3f691d3fdc13ac0ccc707132730b66.jpg"
            },
            image: "https://i.ytimg.com/vi/ViuDsy7yb8M/maxresdefault.jpg",
            imageThumbnail: "https://i.ytimg.com/vi/ViuDsy7yb8M/maxresdefault.jpg",
            likes: 1029,
            caption: "Let's come to magic world!!!",
            userRefs: [],
            tags: ["#magic"],
            comments: []
        }


    ]

//Other users


var otherUsers = [
    {
        id: 1,
        username: "jasonstatham",
        fullname: "Jason Statham",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg",
    },
    {
        id: 2,
        username: "selenagomez",
        fullname: "Selena Gomez",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/selena.jpg"
    },
    {
        id: 3,
        username: "edsheeran",
        fullname: "Ed Sheeran",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/edsheeran.jpg"
    },
    {
        id: 4,
        username: "jamesmcavoy",
        fullname: "James McAvoy",
        profileImageSmall: "https://s-media-cache-ak0.pinimg.com/originals/f3/15/01/f3150106e24a639559d74da095a70b1c.jpg"
    },
    {
        id: 5,
        username: "jenniferlawrence",
        fullname: "Jennifer Lawrence",
        profileImageSmall: "http://cliqueimg.com/cache/posts/185560/copy-that-a-jennifer-lawrence-hairstyle-for-every-day-of-the-week-1676154-1456538020.640x0c.jpg"
    },
    {
        id: 6,
        username: "eddieredmayne",
        fullname: "Eddie Redmayne",
        profileImageSmall: "https://s-media-cache-ak0.pinimg.com/originals/fa/3f/69/fa3f691d3fdc13ac0ccc707132730b66.jpg"
    }


]

// Here is the database about username, password, profileImage, and name
var activeUsers = [
    {
        id:"a9dm85",
        username: "jasonstatham",
        password: "123456",
        name: "Jason Statham",
        profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/jason.jpg",
        postCount: 1,
        followers: 5,
        following: 2,
        activity: []
    }
];

app.get('/', function(req, res) {
    res.send("Hello world");
});

app.post('/', function(req,res) {
    res.send("Hello!");
});

app.post('/signup', function(req,res){

    var user = activeUsers.push(
    	{
            id: "1",
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            profileImageSmall: "http://www.students.oamk.fi/~t5homi00/images/facebook.gif",
            postCount: 0,
            followers: 0,
            following: 0,
            activity: 0
        }
    	);
      console.log(req.body);

    if(user !== undefined)
    {
        return res.sendStatus(200);
    }
    else
    {
        return res.sendStatus(401);
    }
})

app.post('/login', function(req,res){
    console.log("test");
    console.log(req.body);



    var u = activeUsers.find(function(element){

        return (element.username === req.body.username) && (element.password === req.body.password);
    });

    if(u !== undefined)
    {
        return res.json({id: u.id,
                         username: u.username,
                         name: u.name,
                         profileImageSmall: u.profileImageSmall,
                         postCount: u.postCount,
                         followers: u.followers,
                         following: u.following,
                         activity: u.activity
        });
    }
    else
    {
        return res.sendStatus(401);
    }
});


var searchUser = function() {
    return otherUsers;

}
app.get('/search', function(req,res){
   res.json(searchUser());
});

app.post('/search', function(req, res){
  getpost = function()
  {
      return posts.filter(function(post){
          console.log('posts' + req.body.username);
         if(post.user.username.includes(req.body.username)){

          return post;
              }
              else{
                  console.log("false");
              }



        })
  }

  res.json( getpost() );

});
app.get('/posts/relevant', function(req, res) {
    res.json(posts);
});

app.get('/posts/:id', function(req, res) {
    res.json(posts[req.params.id]);
});
//tag
app.post('/posts/tag', function(req,res){

    getpost = function()
    {
        return posts.filter(function(post){
            console.log('posts.tag' + req.body.tags);
           if(post.tags.includes(req.body.tags)){

            return post;
                }
                else{
                    console.log("false");
                }



          })
  }

    res.json( getpost() );
});


// Home Connection
var following = function()
{
    return posts;
}

app.get('/posts', function (req, res) {
    res.json ( following() );
});

// End of Home Connection

//Upload Images to server
app.post('/upload', parser.single('imageUri'), function (req, res) {
    console.log(req.file);
    res.json(req.file); // respond with json output of the cloudinary data
});

//End of Upload Images to server

app.listen(app.get('port'), function() {
        console.log('Node app is running ');
});
