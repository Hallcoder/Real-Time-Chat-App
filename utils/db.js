const mongoose= require('mongoose');
const config= require('config');
    
    const dbUrl = 'mongodb+srv://zesta:%21%21%21%3F%21%3F123Abana@versusbet.bwxby.mongodb.net/test?authSource=admin&replicaSet=atlas-ob0mnz-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
const options = {
    useUnifiedTopology:true,
}
module.exports = () => {
    mongoose.connect(dbUrl,options)
                .then(_ => console.log('Connected to the db'))
                .catch(err => console.log(err))
}