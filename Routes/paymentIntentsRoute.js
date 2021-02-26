const stripe = require('../libs/stripe')
module.exports = app => {
    // One Time Payment stripe taking data in body 
    app.post("/stripe/pi/create", async (req, res) => {
        let { customerId, paymentMethodId } = req.query;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'INR',
                payment_method_types: ['card'],
                amount: parseInt(req.body.amount),
                customer: customerId,
                capture_method: 'manual',  //if the capture method is manual then only the capture paymentIntent works
                payment_method: paymentMethodId,
                off_session: true,
                confirm: true,
                statement_descriptor: 'Custom descriptor',
            });
            res.status(201).json({ data: paymentIntent })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })
    //    There are 3 more apis for the payment intents but the important one is the capturing the payment intent to capture the payment else it will expire within the 7 days 
    // One Time Payment stripe taking data in body 
    app.post("/stripe/pi/capture", async (req, res) => {
        let { piId } = req.query;
        try {
            const paymentIntent = await stripe.paymentIntents.capture(piId)
            res.status(201).json({ data: paymentIntent })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

}