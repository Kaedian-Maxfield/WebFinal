let bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', {
    useNewUrlParser: true
})

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', function(callback){

});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: String,
    eyes: String,
    nose: String,
    mouth: String,
    r: String,
    g: String,
    b: String
});

var User = mongoose.model('User_Collection', userSchema);

exports.index = function(req, res){
    let messages = [
        {username:'Newuser1',
        messageContents:"Hello, I'm user 1 nice to meet you!",
        timestamp:"11:20 AM"
        },
        {username:'NewUserNumber2',
            messageContents:"hi, i am a different message",
            timestamp:"11:25 AM"
        },
        {username:'Newuser1',
        messageContents:"Nice to meet you, NewUserNumber2!",
        timestamp:"11:26 AM"
        }
    ];
    res.render('home', {
        "title":'Home',
        "messages":messages
    });
}

exports.create = function(req,res){
    res.render('create', {
        title: 'Create Account'
    });
}
exports.onCreate = (req, res) =>{
    let user = {
        username:req.body.username,
        email:req.body.email,
        pHash:bcrypt.hashSync(req.body.password),
        age:req.body.age,
        eyes:req.body.eyes,
        nose:req.body.nose,
        mouth:req.body.mouth,
        r:req.body.r,
        g:req.body.g,
        b:req.body.b
    };
    //From here, make a new account and log the user into it with sessions
    res.send(user);
}

exports.edit = function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit Person',
            user: user
        })
    })
}

exports.login = (req, res) =>{
    if(req.session.p && bcrypt.compareSync(req.session.p, pass)){
        res.send("Welcome, logged in user!");
     } else {
        req.session.p = "pass";
        res.send("Welcome to this page for the first time!");
     }
}