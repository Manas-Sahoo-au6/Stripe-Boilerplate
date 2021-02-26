const stripe = require('../libs/stripe')
module.exports=app=>{
     // One Time Payment stripe taking data in body 
     app.post("/stripe/charge/single",async (req, res) => {
        try { 
            const stripeResponse = await stripe.charges.create({
             amount:req.body.amount,    //always more than 50cents
             currency:"INR",
             source:req.body.id,   //id of the card which is enytered by the user
             description:"Charge taken for logggin in deltaz ecommerce",
             capture: false,
            })
            res.status(201).json({data:stripeResponse})
        }
        catch (error) {
            console.log(error) 
            res.status(403).send('something went wrong')
        }
    })

    // There are 3 more steps in charge api retrivc charge and update charge  but the  most important one is the Cpature the charge which is not captured

    // Capture charge of uncaptured charge as they are refund back and cannot be recapture after refund 

    app.get("/stripe/charge/capture/:chargeId",async (req, res) => {
        try { 
            const {chargeId}=req.params;
            const stripeResponse = await stripe.charges.capture(chargeId)
            res.status(201).json({data:stripeResponse})
        }
        catch (error) {
            console.log(error) 
            res.status(403).send('something went wrong')
        }
    })

}