const  stripeKey  = 'sk_test_NlDj7eswSKSGyfVE6XxoBXct00FGFZSTqm'
const stripe = require('stripe')(stripeKey)

module.exports=stripe