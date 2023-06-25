module.exports = {
    addContactInputValidation: (req, res, next) => {
        const { contactPhone, contactName } = req.body;
        if (!contactPhone || !contactName){
            console.log("Bad Request")
            res.status(400).send({
                statusCode:400,
                errorMessage:"Bad request"
            })
        }
        else if (contactPhone.length != 11 || isNaN(contactPhone)) {
            res.status(400).send({
                statusCode: 400,
                errorMessage: "شماره همراه معتبر نیست"
            });
        }
        else
            next()
    }
}