const jsonResponserMiddleware = (req, res, next) => {

    const {result} = req;

    if (!result) {
        throw new Error('no result json obj in req!!');

    }

    res.json(result);

};

module.exports = jsonResponserMiddleware;