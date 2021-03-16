const mongoose = require('mongoose');

function initConnection(onSuccess, onError) {
    if (process.env.NODE_ENV === 'test')
    {
        const Mockgoose = require('mockgoose').Mockgoose;
        const testDB = new Mockgoose(mongoose);

        testDB.prepareStorage().then(() => {
            mongoose.connect(process.env.MONGOCLUSTER, {useNewUrlParser: true, useUnifiedTopology:true});
        });
    }
    else
        mongoose.connect(process.env.MONGOCLUSTER, {useNewUrlParser: true, useUnifiedTopology:true});

    mongoose.connection.once('open', () => {
        console.log('Despite what you were expecting, it actually connects!')
        onSuccess();
    }).on('error', () => {
        console.log('Oh no, you broke something! Now I cant connect to a database :(')
    });
}

const closeConnection = () => {
    return mongoose.disconnect();
}

module.exports = {
    initConnection,
    closeConnection
};