const stripe = require('../libs/stripe')

module.exports = app => {
    // Customers all type of Operations
    // Create a new customer
    app.post('/stripe/customer/createCustomer', async (req, res) => {
        try {
            const { name, email, address, description } = req.body
            const create_customer = await stripe.customers.create({ name, email, address, description })
            res.status(201).json({ data: create_customer })

        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

    // Retrive a customerbyid

    app.get('/stripe/customer/retriveCustomer/:customerId', async (req, res) => {
        try {
            const { customerId } = req.params;
            const customer = await stripe.customers.retrieve(customerId)
            res.status(201).json({ data: customer })

        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

    // This function allowed the customer to update the details of that cutomer
    app.patch('/stripe/customer/updateCustomer/:customerId', async (req, res) => {
        try {
            const { data } = req.body
            const { customerId } = req.params
            const create_customer = await stripe.customers.update(customerId, { ...data })
            res.status(201).json({ data: create_customer })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })

    // This function is used for getting the list of the customers 
    app.get('/stripe/customer/listCustomers', async (req, res) => {
        try {
            const customer = await stripe.customers.list({ limit: 10 })
            res.status(201).json({ data: customer.data })
        }
        catch (error) {
            console.log(error)
            res.status(403).send('something went wrong')
        }
    })


    app.delete("/stripe/customer/deleteAll", async (req, res) => {
        try {

            const customer = await stripe.customers.list({ limit: 100 })
            const pendingarray = []
            customer.data.forEach(async(customerData) => {
                const deleted = stripe.customers.del(
                    customerData.id  
                );
                pendingarray.push(deleted)

            })
            Promise.all([...pendingarray]).then((data) => {
                res.status(201).json({ data: data })
            }).catch((err) => {
                res.status(403).send('something went wrong')
            })

        }
        catch (err) {
            console.log(err)
            res.status(403).send('something went wrong')
        }
    })
}




