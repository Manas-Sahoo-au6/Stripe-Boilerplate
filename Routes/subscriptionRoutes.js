const stripe = require('../libs/stripe')
module.exports = app => {
    //Create a new subscription for a particukar customer 
    app.post("/stripe/subscription/create", async (req, res) => {
        try {

            const subscription = await stripe.subscriptions.create({
                customer: req.body.customerId,
                items: [
                    { price: req.body.PriceId, price_data: { currency: "USD", product: req.body.productId, recurring: { interval: "month" }, unit_amount: 0 } }
                ],
                // metadata: { userId: req.body.userId },
                coupon: req.body.coupon || null,
                cancel_at_period_end: req.body.cancelAtPeriodEnd || false
            })
            res.status(201).json({ data: subscription })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

    //Cancel a subscription bu subscription id
    app.delete("/stripe/subscription/cancel/:subscriptionId", async (req, res) => {
        try {
            const subscription = await stripe.subscriptions.del(req.params.subscriptionId)
            res.status(201).json({ data: subscription })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })


}