let bcrypt = require('bcrypt-nodejs');

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
        mouth:req.body.mouth
    };
    //From here, make a new account and log the user into it with sessions
    res.send(user);
}

exports.login = (req, res) =>{
    if(req.session.p && bcrypt.compareSync(req.session.p, pass)){
        res.send("Welcome, logged in user!");
     } else {
        req.session.p = "pass";
        res.send("Welcome to this page for the first time!");
     }
}