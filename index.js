const express = require('express')
const chargebee = require("chargebee")
// CORS is enabled only for demo. Please dont use this in production unless you know about CORS
const cors = require('cors')


chargebee.configure({site : "renesf-test", 
  api_key : "test_sWiqD3husCfh1xpokiR0f0BitSXpvZ0g"});
const app = express()

app.use(express.urlencoded())
app.use(cors())
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index.html');
});

app.post("/api/generate_checkout_new_url", (req, res) => {
  chargebee.hosted_page.checkout_new({
    subscription : {
      plan_id : "pro"
    }
  }).request(function(error,result){
    if(error){
      //handle error
      console.log(error);
    }else{
      res.send(result.hosted_page);
    }
  });
});

app.post("/api/generate_portal_session", (req, res) => {
  chargebee.portal_session.create({
    customer : {
      id : "1mhuIhIQhDeD9KFIJ"
      }
  }).request(function(error,result) {
    if(error){
      //handle error
      console.log(error);
    }else{
      res.send(result.portal_session);
    }
  });
});


app.listen(process.env.PORT || 8000, 
	() => console.log("Server is running..."));
