$(document).ready(function () {

  $("input").on("focus", function () {
    $(this).addClass("focus");
  });

  $("input").on("blur", function () {
    $(this).removeClass("focus");
  });

  $("input").on("keyup", function () {
    if ($(this).val()) {
      $(this).removeClass("empty");
      $(this).addClass("val");
    }
    else {
      $(this).addClass("empty");
      $(this).removeClass("val");
    }
  });



  var cbInstance = Chargebee.init({
    site: "checkoutexamples-test",
    publishableKey: "test_S3m3YGlRntq88LHcsfqJYvcdzW2zYgnDC"
  });

  var options = {
    fonts: [
      'https://fonts.googleapis.com/css?family=Roboto:300,500,600'
    ],

    // add classes for different states
    classes: {
      focus: 'focus',
      invalid: 'invalid',
      empty: 'empty',
      complete: 'complete',
    },

    // add placeholders
    placeholder: {
      number: "4000 0000 0000 3220"
    },

    // Set locale
    locale: 'en',

    style: {

      // Styles for default state
      base: {
        color: '#333',
        fontWeight: '500',
        // fontFamily: 'Roboto, Segoe UI, Helvetica Neue, sans-serif',
        fonrFamily: 'Avenir Next, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        fontSize: '13px',
        fontSmoothing: 'antialiased',

        ':focus': {
          // color: '#424770',
        },

        '::placeholder': {
          color: '#abacbe',
        },

        ':focus::placeholder': {
          // color: '#7b808c',
        },
      },

      // Styles for invalid state
      invalid: {
        color: '#E94745',

        ':focus': {
          color: '#e44d5f',
        },
        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    },
  }

  /*cbInstance.load('ideal').then(iDealHandler => {
  iDealHandler.mountBankList('#ideal-container', {
    currency: 'EUR'
  });
});*/

  cbInstance.load("components").then(() => {

    // Create card
    var cardComponent = cbInstance.createComponent("card", options);
    // Create card fields
    cardComponent.createField("number").at("#card-number");
    cardComponent.createField("expiry").at("#card-expiry");
    cardComponent.createField("cvv").at("#card-cvc");



    // Mount card component
    cardComponent.mount();

    $("#subscribe-form").on("submit", function (event) {
      console.log("Success");
      var cbInstance = window.Chargebee.init({ site: "checkoutexamples-test" });
      var url = window.location.href;
      var arr = url.split("/");
      var domain = arr[0] + "//" + arr[2];
      $("#submit-button").addClass("submit");
      event.preventDefault();

      var additionalData = {
        plan: "",
        billingAddress: {
          firstName: "Anna",
          lastName: "T",
          addressLine1: "Sengthal",
          addressLine2: "test",
          city: "Schwand im Innkreis",
          state: "Oberösterreich",
          countryCode: "AT",
          zip: "5134"
        },
        customerBillingAddress: {
          firstName: "Anna",
          lastName: "T",
          addressLine1: "Sengthal",
          addressLine2: "test",
          city: "Schwand im Innkreis",
          state: "Oberösterreich",
          countryCode: "AT",
          zip: "5134"
        },
      };

      var callbacks = {

      };

      $.ajax(
        {
          url: domain + "/api/create_payment_intent",
          type: 'POST',
          dataType: 'json',
          data: { "amount": "5000", "currency_code": "USD", "gateway_account_id": "gw_16CKeZSq8GuvIHNR" },
          success: function (result) {
            console.log("successfull", result);
            console.log("Helloo");
            $("#submit-button").removeClass("submit");

            cardComponent.authorizeWith3ds(result, additionalData, callbacks).then(paymentIntent => {

              $.ajax(
                {
                  url: domain + "/api/create_customer_3ds",
                  type: 'POST',
                  dataType: 'json',
                  data: { "customer_name": "Anna", "email": "anna@test.com", "payment_intent": paymentIntent.id, "gateway_account_id": "gw_16CKeZSq8GuvIHNR" },
                  success: function (result) {
                    console.log("successfull", result);
                    $("#token").html("successfull");



                    //$("#submit-button").removeClass("submit");
                  }
                });



            });

            $("#div1").html(result);
            return;
          }
        });


    });//payment submit

  });
});//document ready

