const stripe = require('../libs/stripe')
module.exports=app=>{
     // One Time Payment stripe taking data in body 
     app.post("/stripe/price/create",async (req, res) => {
        try { 
            const price = await stripe.prices.create({
                unit_amount: parseInt(req.body.amount),
                currency: 'INR',
                recurring: {interval: req.body.intervel ||'month'},
                product_data: {name:req.body.name},
                nickname:req.body.nickname
              });
            res.status(201).json({data:price})  
        }
        catch (error) {
            console.log(error) 
            res.status(403).send('something went wrong')
        }
    })


}