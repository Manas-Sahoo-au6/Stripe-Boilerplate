const express = require('express');
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())

require('./Routes/customerRoute')(app);

require('./Routes/chargesRoute')(app);

require('./Routes/paymentMethodRoute')(app);

require('./Routes/paymentIntentsRoute')(app);

require('./Routes/priceRoutes')(app);

require('./Routes/cardRoutes')(app);

require('./Routes/subscriptionRoutes')(app);

require('./Routes/webHookRoute')(app);

app.listen(9000,()=>{
    console.log('port is listening'+ " " +9000)
})