

module.exports = function(app) {
   

    /** 2018.11.01  
     *  move routing to other files
    */
    require('./others/vendor')(app);
    require('./others/user')(app);
    require('./others/order')(app);
    require('./others/auth')(app);
    

 
};
