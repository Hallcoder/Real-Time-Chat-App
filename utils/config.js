const config = require('config');

module.exports.config = () =>{
    if(!config.get('jwtPrivateKey')){
        console.error('The key is not defined...');
        process.exit(1);
    }
}