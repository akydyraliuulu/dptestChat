const User = require('mongoose').model('User');
module.exports = (req,res) =>{
            res.status(200).json({status:'success',
            error:'',
            hint:'Loged out',
            });   
}
