$(document).ready(function() {
  var cbInstance = window.Chargebee.init({site: "renesf-test"});
  
  $("#subscribe-form").on("click", function(event) {
    console.log(event);
    event.preventDefault();
    $("#loader").show();
    $("#errorContainer").hide();
    cbInstance.openCheckout({
        hostedPage: function() {
          // Hit your end point that returns hosted page object as response
          // This sample end point will call the below api
          // You can pass hosted page object created as a result of checkout_new, checkout_existing, manage_payment_sources
          // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_new_subscription
          // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_existing_subscription
          // https://apidocs.chargebee.com/docs/api/hosted_pages#manage_payment_sources
          // If you want to use paypal, go cardless and plaid, pass embed parameter as false
          return $.ajax({
            method: "post",
            url: "http://localhost:8000/api/generate_checkout_new_url"
          });
        },
        loaded: function() {
          console.log("checkout opened");
        },
        error: function() {
          $("#loader").hide();
          $("#errorContainer").show();
        },
        
        success: function(hostedPageId) {
          console.log(hostedPageId);
          
          close: function() {
            $("#loader").hide();
            $("#errorContainer").hide();
            console.log("checkout closed");
            window.location.replace("http://127.0.0.1:8080/dashboard2.html");
          }
          // Hosted page id will be unique token for the checkout that happened
          // You can pass this hosted page id to your backend 
          // and then call our retrieve hosted page api to get subscription details
          // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
        },
        step: function(value) {
            // value -> which step in checkout
            console.log(value);
        }
      });
  });


  /*$(".w3-bar-block").click(function(event){
  if(event.target.id == 'upgrade'){	
  console.log('value');
    event.preventDefault();
    cbInstance.setPortalSession(function(){
      // We will discuss on how to implement this end point below.
      console.log('value');
      return $.ajax({
        url: "http://localhost:8000/api/generate_checkout_existing_url",
        method: 'POST',
        data: data
      });
    });
    let cbPortal = cbInstance.createChargebeePortal();
    cbPortal.open({
      close() {
        //close callbacks
      }
    });
  }

  });

  $("#upgrade").on("click", function(event) {

console.log(event);

    


  

    });*/

    $("#upgrade").on("click", function() {
      event.preventDefault();
      cbInstance.setPortalSession({
        hostedPage: function() {
          // Hit your end point that returns hosted page object as response
          // This sample end point will call the below api
          // You can pass hosted page object created as a result of checkout_new, checkout_existing, manage_payment_sources
          // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_new_subscription
          // https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_existing_subscription
          // https://apidocs.chargebee.com/docs/api/hosted_pages#manage_payment_sources
          // If you want to use paypal, go cardless and plaid, pass embed parameter as false
          return $.ajax({
            method: "post",
            url: "http://localhost:8000/api/generate_checkout_existing_url"
          });
        },
        loaded: function() {
          console.log("checkout opened");
        },
        error: function() {
        },
        close: function() {
          console.log("checkout closed");
        },
        success: function(hostedPageId) {
          console.log(hostedPageId);
          // Hosted page id will be unique token for the checkout that happened
          // You can pass this hosted page id to your backend 
          // and then call our retrieve hosted page api to get subscription details
          // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
        },
        step: function(value) {
            // value -> which step in checkout
            console.log(value);
        }
      });
  
      let cbPortal = cbInstance.createChargebeePortal();
      cbPortal.open({
          close() {
              
          }
      })
  
    });
    
      
      
     
      
   } );
  
