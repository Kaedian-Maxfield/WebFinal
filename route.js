let bcrypt = require('bcrypt-nodejs');

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

exports.index = function(req, res){
    
    res.render('home', {
        title:'Home',
        username:req.session.username,
        messages:messages
    });
}
exports.onIndex = (req, res) =>{
    messages.push(
        {
            username:"User3",
            messageContents:req.body.message,
            timestamp:"12:00 PM"
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
        mouth:req.body.mouth
    };
    //From here, make a new account and log the user into it with sessions
    res.send(user);
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
}