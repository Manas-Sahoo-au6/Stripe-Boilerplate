const stripe = require('../libs/stripe')
module.exports = app => {
    // Function is used for creating web hooks   
    app.post("/stripe/webHook/create", async (req, res) => {
        try {
            const webhookEndpoint = await stripe.webhookEndpoints.create({
                url: 'https://01d0277b227d.ngrok.io/webhook',
                enabled_events: [
                    'charge.failed',
                    'charge.succeeded',
                ],
            });
            res.status(201).json({ data: webhookEndpoint })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })
// This funxtion is basically used as when even any event occur the webhook automatically calls and the user operation happens like any mail or message sent to the user toe hwi
    app.post('/webhook', async (request, res) => {
        try {
            const event = request.body;

            // Handle the event
            switch (event.type) {
                case 'charge.succeeded':
                    const charge = event.data.object;
                    console.log(`charge for ${charge.amount} was successful!`);
                    break;
                case 'charge.failed':
                    console.log(charge, 'failed')
                    break;
                default:
                    // Unexpected event type
                    console.log(`Unhandled event type ${event.type}.`);
            }
            res.json({ data: event })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })


}

