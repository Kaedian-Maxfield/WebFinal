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
var messageSchema = mongoose.Schema({
    username: String,
    messageContents: String,
    timestamp: String
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
var Message = mongoose.model('Message_Collection', messageSchema);

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
}

let time = new Date();

exports.index = function(req, res){
    Message.find({}, function(err, messages){
        if(err)return console.log(err);
        res.render('home', {
            title:'Home',
            username:req.session.username,
            messages:messages
        });
    });
}
exports.onIndex = (req, res) =>{
    time = new Date();
    let mes = new Message({
        username:req.session.username,
        messageContents:req.body.message,
        timestamp: hourConvert(time.getHours()) + ":" + minuteConvert(time.getMinutes()) + " " + isAM(time.getHours())
    });
    mes.save(function(err, mes){
        if(err) return console.log(err);
        res.redirect("/");
    })
}

exports.create = function(req,res){
    res.render('create', {
        title: 'Create Account',
        username:req.session.username
    });
}
exports.onCreate = (req, res) =>{
    let user = new User({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),
        age:req.body.age,
        eyes:req.body.eyes,
        nose:req.body.nose,
        mouth:req.body.mouth,
        r:req.body.r,
        g:req.body.g,
        b:req.body.b
    });
    user.save(function (err, newUser) {
        if (err) return console.error(err);
        console.log(newUser.username + " saved to collection.");
        req.session.loggedIn = true;
        req.session.username = newUser.username;
        res.redirect('/');
      });
}

exports.edit = function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err) return console.error(err);
        res.render('edit', {
            title: 'Edit User',
            user: user
        })
    })
}

exports.editUser = function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err) return console.error(err);
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = bcrypt.hashSync(req.body.password);
        user.age = req.body.age;
        user.eyes = req.body.eyes;
        user.nose = req.body.nose;
        user.mouth = req.body.mouth;
        user.r = req.body.r;
        user.g = req.body.g;
        user.b = req.body.b;
        user.save(function(err,user){
            if(err) return console.error(err)
            console.log(req.body.username + 'updated')
        });
    });
    res.redirect('/');
}

exports.login = (req, res) =>{
    if(req.session.loggedIn){
        res.send("Welcome, " + req.session.username);
    }
    else{
        res.render('login',{
            title: "Login",
            errorMessage:"",
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
    User.findOne({username:tryLogin.username}, function(err, account){
        if(err) return console.log(err);
        if(account != null){
            let pHash = account.password;
            if(bcrypt.compareSync(tryLogin.pass, pHash)){
                req.session.loggedIn = true;
                req.session.username = tryLogin.username;
                res.redirect('/');
            }
            else{
                res.render('login',{
                    title: "Login",
                    errorMessage:"Invalid Password",
                    username:req.session.username
                });
            }
        }
       else{
        res.render('login',{
            title: "Login",
            errorMessage:"Account Not Found",
            username:req.session.username
        });
       }
    });
}

exports.logout = (req, res) =>{
    req.session.loggedIn = false;
    req.session.username = "";
    res.redirect('/');
};