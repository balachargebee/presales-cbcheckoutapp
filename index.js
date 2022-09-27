const express = require('express')
const chargebee = require("chargebee")
// CORS is enabled only for demo. Please dont use this in production unless you know about CORS
const cors = require('cors')
//chargebee.configure({site : "renesf-test", 
//api_key : "test_sWiqD3husCfh1xpokiR0f0BitSXpvZ0g"});
const app = express()

app.use(express.urlencoded())
app.use(cors())
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
  // ejs render automatically looks in the views folder
  res.render('index.html');
});

// Checkout via API
app.post("/api/generate_checkout_new_url", (req, res) => {
  chargebee.configure({
    site: "checkoutexamples-test",
    api_key: "test_kUATb6hFHyLZsOLYhnPOQJ2jZnAys5JY"
  });
  chargebee.hosted_page.checkout_new_for_items({
    subscription_items: [
      {
        item_price_id: req.body.planid
      }]
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      res.send(result.hosted_page);
    }
  });
});


// Portal via API
app.post("/api/generate_portal_session", (req, res) => {
  chargebee.configure({
    site: "checkoutexamples-test",
    api_key: "test_kUATb6hFHyLZsOLYhnPOQJ2jZnAys5JY"
  });
  chargebee.portal_session.create({
    customer: {
      id: "16BjhnSq5Ut9CWRA"
    }
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      res.send(result.portal_session);
    }
  });
});

// Hybrid Checkout via API
app.post("/api/generate_hybrid_checkout_new_url", (req, res) => {
  chargebee.configure({
    site: "presaleshybridcheckout-test",
    api_key: "test_DZiSa1S4dcdgdMOqXNcdyuTacdSkJVCSgj9"
  });

  console.log("First Name");
  console.log(req.body.first_name);
  console.log("Last Name");
  console.log(req.body.last_name);
  console.log("Email");
  console.log(req.body.email);
  console.log("Company");
  console.log(req.body.company);

  chargebee.hosted_page.checkout_new_for_items({
    coupon_ids: ["5EURDISCOUNT"],

    customer: [
      {
        email: req.body.email
      },
      {
        first_name: req.body.customer_name
      },
      {
        last_name: req.body.lastName
      },
      {
        company: req.body.company
      }],

    subscription_items: [
      {
        item_price_id: "Pro-EUR-Monthly"
      },
      {
        item_price_id: "Analytics-Addon-EUR-Monthly"
      },
      {
        item_price_id: "Chat-Addon-EUR-Monthly"
      }]
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      res.send(result.hosted_page);
    }
  });
});

/*Checkout by Chargebee.js*/
app.post("/api/create_customers", (req, res) => {
  chargebee.configure({
    site: "checkoutexamples-test",
    api_key: "test_kUATb6hFHyLZsOLYhnPOQJ2jZnAys5JY"
  });
  var random_id = getRandomString(5);

  console.log("First Name");
  console.log(req.body.customer_name);
  console.log("Email");
  console.log(req.body.email);
  console.log("Token");
  console.log(req.body.token);
  console.log("planID");
  console.log(req.body.plan);
  console.log("quantity");
  console.log(req.body.quantity);

  chargebee.customer.create({
    id: random_id,
    first_name: req.body.customer_name,
    last_name: req.body.lastName,
    email: req.body.email,
    token_id: req.body.token,
    last_name: req.body.lastName,
    company: req.body.company
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      // res.send(result.hosted_page);
      chargebee.subscription.create_with_items(random_id, {
        subscription_items: [
          {
            item_price_id: req.body.plan,
            quantity: req.body.quantity
          }
        ]
      }).request(function (error, result) {
        if (error) {
          //handle error
          console.log(error);
        } else {
          console.log(result);
          var subscription = result.subscription;
          var customer = result.customer;
          var card = result.card;
          var invoice = result.invoice;
          var unbilled_charges = result.unbilled_charges;
        }
      });

    }
  });
});

/* Create Payment Intent */

app.post("/api/create_payment_intent", (req, res) => {
  chargebee.configure({
    site: "checkoutexamples-test",
    api_key: "test_kUATb6hFHyLZsOLYhnPOQJ2jZnAys5JY"
  });
  chargebee.payment_intent.create({
    amount: req.body.amount,
    currency_code: req.body.currency_code,
    gateway_account_id: req.body.gateway_account_id
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      console.log(result);
      var payment_intent = result.payment_intent;
      res.send(result.payment_intent);
    }
  });
});



/*Create Customer*/
app.post("/api/create_customer_3ds", (req, res) => {
  chargebee.configure({
    site: "checkoutexamples-test",
    api_key: "test_kUATb6hFHyLZsOLYhnPOQJ2jZnAys5JY"
  });
  var random_id = getRandomString(5);

  console.log("First Name");
  console.log(req.body.customer_name);
  console.log("Email");
  console.log(req.body.email);
  console.log("Token");
  console.log(req.body.payment_intent);
  console.log(req.body.gateway_account_id);
  chargebee.customer.create({
    id: random_id,
    first_name: req.body.customer_name,
    email: req.body.email,
    payment_intent: {
      id: req.body.payment_intent
    }
  }).request(function (error, result) {
    if (error) {
      //handle error
      console.log(error);
    } else {
      console.log(result);
      var customer = result.customer;
      var card = result.card;
      res.send(result);
    }
  });
});


function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}


app.listen(process.env.PORT || 8000,
  () => console.log("Server is running..."));
