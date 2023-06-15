const mongoose=require('mongoose')

const userData=new mongoose.Schema({

    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
})

module.exports=new mongoose.model('userdata',userData)