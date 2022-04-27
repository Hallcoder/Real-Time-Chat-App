const mongoose= require('mongoose');
const dbUrl = 'mongodb://localhost:27017/chat'
const options = {
    useUnifiedTopology:true,
}
module.exports = () => {
    mongoose.connect(dbUrl,options)
                .then(_ => console.log('Connected to the db'))
                .catch(err => console.log(err))
}