module.exports = (req, res, next) => {
    const { contactNewName, contactPhone } = req.body;
    console.log("contactNewName: ", contactNewName);
    if (!contactPhone) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad request"
        })
    }
    else if (!contactNewName)
        res.status(400).send({
            statusCode: 400,
            message: "لطفا نام را وارد کنید"
        })
    else
        next()
}