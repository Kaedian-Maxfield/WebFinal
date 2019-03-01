exports.index = function(req, res){
    res.render('home', {
        "title":'Home',
    });
}

exports.create = function(req,res){
    res.render('create', {
        title: 'Create Account'
    });
}

