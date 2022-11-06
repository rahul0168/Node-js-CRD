const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const DB = mongoose.connection
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
///error
DB.on('error',console.error.bind(console,'error connecting db'));

//con
DB.once('open',function(){
    console.log('successfully connected');
});