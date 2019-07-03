$(function () {
    var email_e_msg=$("#email_error_message");
    email_e_msg.hide();
    var password_e_msg=$("#password_error_message");
    password_e_msg.hide();

    var error_email = false;
    var error_password = false;

    var form_email=$("#form_email");

    form_email.focusout(function() {
        check_email();
    });
    var form_password=$("#form_password");
    form_password.focusout(function() {
        check_password();
    });

     function check_password() {
            var password_length = form_password.val().length;
            if (password_length < 8) {
               password_e_msg.html("Atleast 8 Characters");
               password_e_msg.css("font-size","10px");
               password_e_msg.css("color","red");
               form_password.css("border-bottom","2px solid #34F458");
               password_e_msg.show();
               error_password = true;
            } else {
               password_e_msg.hide();
              form_password.css("border-bottom","2px solid #34F458");
            }
         }

         function check_email() {
            var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var email = form_email.val();
            if (pattern.test(email) && email !== '') {
               email_e_msg.hide();
               form_email.css("border-bottom","2px solid #34F458");
            } else {
               email_e_msg.html("Invalid Email");
               email_e_msg.show();
               email_e_msg.css("color","red");
               email_e_msg.css("font-size","10px");
               form_email.css("border-bottom","2px solid #34F458");

               error_email = true;
            }
         }

         $("#Registration_form").submit(function() {
            error_email = false;
            error_password = false;
            check_email();
            check_password();
            if ( error_email === false && error_password === false ) {
               return true;
            } else {
               alert("Please Fill the form Correctly");
               return false;
            }
         });

});
