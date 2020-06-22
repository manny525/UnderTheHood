const mongoose=require('mongoose')

mongoose.connect(process.env.Mongoose,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
})