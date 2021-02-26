const stripe = require('../libs/stripe')
module.exports = app => {
    // Store the Card details in stripe database
    app.post("/stripe/paymentMethod/create", async (req, res) => {
        const card = req.body
        try {
            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: card
            });
            res.status(201).json({ data: paymentMethod })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

    // Function is used to attach a payment methods to a  customer

    // Attach a payment method to stripe database 
    app.post("/stripe/paymentMethod/attach/:customerId", async (req, res) => {
        const { customerId } = req.params;
        const { pmId } = req.query;
        try {
            const paymentMethod = await stripe.paymentMethods.attach(pmId,
                { customer: customerId });
            res.status(201).json({ data: paymentMethod })
        }
        catch (error) {
            console.log(error) 
            res.status(403).send('something went wrong')
        }
    })

        // Detach a payment method to stripe database      

    // **** important once the paymentMethod is detach it cannot be reattached to that customer ****
        app.post("/stripe/paymentMethod/detach", async (req, res) => {
            const { pmId } = req.query;
            try {
                const paymentMethod = await stripe.paymentMethods.detach(pmId);
                res.status(201).json({ data: paymentMethod })
            }
            catch (error) {
                console.log(error)
                res.status(403).send('something went wrong')
            }
        })





}