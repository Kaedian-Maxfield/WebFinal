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

// exports.index = function(req, res){
//     //let messages = [
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

function isAM(CurrentTime)
{
    return (CurrentTime < 12 ? "AM" : "PM")
}
function minuteConvert(CurrentTime)
{
    return (CurrentTime < 10 ? "0" + CurrentTime : CurrentTime)
}
function hourConvert(CurrentTime)
{
    return (CurrentTime < 13 ? CurrentTime : CurrentTime - 12)
}

function resetMessages()
{
    messages = [
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
}

let time = new Date();

exports.index = function(req, res){
    res.render('home', {
        title:'Home',
        username:req.session.username,
        messages:messages
    });
}
exports.onIndex = (req, res) =>{
    time = new Date();
    messages.push(
        {
            username:req.session.username,
            messageContents:req.body.message,
            timestamp: hourConvert(time.getHours()) + ":" + minuteConvert(time.getMinutes()) + " " + isAM(time.getHours())
        }
    );
    res.redirect("/");
}

exports.create = function(req,res){
    res.render('create', {
        title: 'Create Account',
        username:req.session.username
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
    if(req.session.loggedIn){
        res.send("Welcome, " + req.session.username);
    }
    else{
        res.render('login',{
            title: "Login",
            wasValid: true,
            username:req.session.username
        });
    }
}

let testPass = bcrypt.hashSync("myPass");

exports.onLogin = (req, res) =>{
    let tryLogin = {
        username:req.body.username,
        pass:req.body.password
    };
    //TODO: Make this load the passhash from the database by username
    let pHash = testPass;
    if(bcrypt.compareSync(tryLogin.pass, pHash)){
        req.session.loggedIn = true;
        req.session.username = tryLogin.username;
        res.redirect('/');
    }
    else{
        res.render('login',{
            title: "Login",
            wasValid:false,
            username:req.session.username
        });
    }
}

exports.logout = (req, res) =>{
    req.session.loggedIn = false;
    req.session.username = "";
    res.redirect('/');
};