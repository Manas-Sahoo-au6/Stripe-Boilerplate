const stripe = require('../libs/stripe')
module.exports=app=>{
     // One Time Payment stripe taking data in body 
     app.post("/stripe/card/create/:customerId",async (req, res) => {
        try { 
            const {customerId}=req.params;
            const card = await stripe.customers.createSource(
                customerId,
                {source: req.body.source}
              );
            res.status(201).json({data:card})  
        }
        catch (error) {
            console.log(error) 
            res.status(403).send('something went wrong')
        }
    })


    // There is update card and retrive partilcular card is there 

// List all Cards of the particular customer to show in the frontend 

app.get("/stripe/card/list/:customerId",async (req, res) => {
    try { 
        const {customerId}=req.params;
        const card = await stripe.customers.listSources(
            customerId,
            {object: 'card', limit: 3}
          );
        res.status(201).json({data:card.data})  
    }
    catch (error) {
        console.log(error) 
        res.status(403).send('something went wrong')
    }
})

// this function is used to get the details of the particulart card 

app.get("/strpe/card/:cardId",async (req,res)=>{
    try{}
    catch(error){
        console.log(error)
        res.status(400).send("some thing went wrong!")
    }
})


}