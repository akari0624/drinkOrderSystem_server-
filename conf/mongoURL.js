if (process.env.NODE_ENV === 'production') {

    module.exports = {
        MONGODB_URL: 'the_url_to_mongoDB',
    };

} else {

    module.exports = {
        MONGODB_URL: 'mongodb://localhost:27017/drink_order_system',
    };
}
