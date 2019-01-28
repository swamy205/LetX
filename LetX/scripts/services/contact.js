$(document).ready(function () {
              $('#contact-form').bootstrapValidator({
                  // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                  feedbackIcons: {
                      valid: 'fa fa-check',
                      invalid: 'fa fa-times',
                      validating: 'fa fa-sync'
                  },
                  fields: {
                      name: {
                          validators: {
                              notEmpty: {
                                  message: 'Please enter your name'
                              }
                          }
                      },
                      email: {
                          validators: {
                              notEmpty: {
                                  message: 'Please enter your email address'
                              },
                              emailAddress: {
                                  message: 'Please enter a valid email address'
                              }
                          }
                      },
//////                      phone: {
//////                          validators: {
//////                              notEmpty: {
//////                                  message: 'Please enter your phone number'
//////                              },
//////                              emailAddress: {
//////                                  message: 'Please enter a valid phone number'
//////                              }
//////                          }
////                      },
//                      subject: {
//                          validators: {
//                              notEmpty: {
//                                  message: 'Please enter your budget'
//                              }
//                          }
//                      },
                      comment: {
                          validators: {
                              stringLength: {
                                  min: 10,
                                  max: 200,
                                  message: 'Please enter at least 10 characters and no more than 200'
                              },
                              notEmpty: {
                                  message: 'Please enter your description'
                              }
                          }
                      }
                  },
                  submitHandler: function (validator, form, submitButton) {
                      sentMail();
                      // $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                      //  $('#contact_form').data('bootstrapValidator').resetForm();
          
                      // var bv = form.data('bootstrapValidator');
                      // Use Ajax to submit form data
                      //$.post(form.attr('action'), form.serialize(), function (result) {
                      //    console.log(result);
                      //}, 'json');
                  },
              });
          
              //.on('success.form.bv', function(e) {
              //    $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
              //        $('#contact-form').data('bootstrapValidator').resetForm();
          
              //    // Prevent form submission
              //    e.preventDefault();
          
              //    // Get the form instance
              //    var $form = $(e.target);
          
              //    // Get the BootstrapValidator instance
              //    var bv = $form.data('bootstrapValidator');
          
              //    // Use Ajax to submit form data
              //    $.post($form.attr('action'), $form.serialize(), function(result) {
              //        console.log(result);
              //    }, 'json');
              //});
    var location_details = null;
    $.get("http://ipinfo.io", function (response) {
                location_details = response.city +', '+ response.region +', '+ response.country;
            }, "jsonp");
          
              function sentMail() {
                  var fname = $("#txtName").val();
                  var email_address = $("#txtEmail").val();
				  var contact_no = $("#txtPhone").val();
                  var budget = $("#txtSub").val();
                 var project_details = $("#txtMessage").val().replace(/\n/g, "\\r\\n");
                   var  services_type = $("#services_type").val();
                   var location = location_details;
                 var dataObj = {
                      name: fname,
                      email: email_address,
                      contact_no: contact_no,
                      buget: budget,
                      project_details: project_details,
                      services_type : services_type,
                      location: location,
                     
                  }
                  var altMess = "";
                  if (fname == "") {
                      altMess = altMess + "Please enter name\n";
                  }
                  if (email_address == "") {
                      altMess = altMess + "Please enter email\n";
                  }
                  if (budget == "") {
                      altMess = altMess + "Please enter subject\n";
                  }
                  if (project_details == "") {
                      altMess = altMess + "Please enter message\n";
                  }
                   if (contact_no == "") {
                      altMess = altMess + "Please enter phone no\n";
                  }
                  if (altMess != "") {
                      alert(altMess);
                      return false;
                  }
//                  http://183.82.97.49:82/api/Contact/SubmitQoute?fname=akshay&contact_no=455554554&email_address=akshay.d@paraminfo.com&budget=45545&services_type=test&project_details=testdestsdsfsfd&location=dubai
                  $.getJSON("http://mecareers.paraminfo.com/api/Contact/SubmitQoute?fname=" + fname + "&email_address=" + email_address + "&contact_no=" + contact_no + "&budget=" + budget + "&services_type=" + services_type + "&project_details=" + project_details  +  "&location=" + location, 
                            function (data) {
                      window.location.href = "http://paraminfo.com/thankyou.html";
//                      window.location.href = "http://paraminfo.com/thankyou.html?msg=true";
                  });
              }
              function getParameterByName(name, url) {
                  if (!url) url = window.location.href;
                  name = name.replace(/[\[\]]/g, "\\$&");
                  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                      results = regex.exec(url);
                  if (!results) return null;
                  if (!results[2]) return '';
                  return decodeURIComponent(results[2].replace(/\+/g, " "));
              }
          
              var msg = getParameterByName('msg');
              if (msg == 'true') {
                  $("#alertMsg").html('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Thanks for contacting us, we will get back to you shortly.</div>')
              }
          
              function success(data) {
          
              }

          });
		  
			  function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }