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
      number: "4111 1111 1111 1111"
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
      var cbInstance = window.Chargebee.init({ site: "checkoutexamples-test" });
      var url = window.location.href
      var arr = url.split("/");
      var domain = arr[0] + "//" + arr[2];

      // $("#submit-button").addClass("submit");
      event.preventDefault();
      cardComponent.tokenize().then(data => {
        // $("#submit-button").removeClass("submit");
        $("#token").show();
        $("#error").hide();
        $("#token").html("Token " + data.token + " successfully created!!");
        var email = $("#email").val();
        var customer_name = $("#firstName").val();
        var lastName = $("#lastName").val();
        var company = $("#company").val();
        var token = data.token;
        console.log("Hi");
        console.log(customer_name);


        $.ajax(
          {
            url: domain + "/api/create_customer",
            type: 'POST',
            dataType: 'json',
            data: { "customer_name": customer_name, "email": email, "token": token, "lastName": lastName, "company": company },
            success: function (result) {
              console.log("successfull", result);
              //$("#div1").html(result);
            }
          });
      }).catch(error => {
        $("#submit-button").removeClass("submit");
        // TODO get a proper error message
        $("#error").show();
        $("#error").html("Problem while tokenizing your card details");
        $("#token").hide();
        console.log(error);
      });




    });
  });
});