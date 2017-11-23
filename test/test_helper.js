const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/vendor_test',{useMongoClient:true});

mongoose.connection
                .once('open',()=>{console.log('good to go')})
                .on('error',(errorMsg)=>{console.warn('error occured:',errorMsg)});


beforeEach((done)=>{

mongoose.connection.collections.vendors,drop(()=>{

    done();
});

});                
