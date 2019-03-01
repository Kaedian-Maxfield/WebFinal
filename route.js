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