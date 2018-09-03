//navigation

var open = $(".toggle-btn");
var menu = $(".navigation");
var page = $(".page-wrapper")

open.click(function(){
  menu.toggleClass("open");
  page.toggleClass("page-slide");
});

//Form validation
$('#contact').on('submit', function(e) {

  // function submitValidate(field) {
  //
  //   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //   var emailValue = $('.email-form').val();
  //   console.log(regex.test(emailValue));
  //
  //   if(($('.form-name').val() != "") && ($('.form-msg').val() != "") && (regex.test(emailValue))) {
  //     $('.submit').removeClass('disabled');

    $.ajax({
          url : url,
          type: 'POST',
          data : data,
          dataType: 'html',
          // contentType: 'application/json'
      }).done(function(response){
          console.log(response);
      });
  // } else {
  //   $('.submit').addClass('disabled');
  // }


   });
// // Wait for the DOM to be ready
// $(function() {
//   // Initialize form validation on the registration form.
//   // It has the name attribute "registration"
//   $("form[name='contact']").onclick()({
//     // Specify validation rules
//     rules: {
//       // The key name on the left side is the name attribute
//       // of an input field. Validation rules are defined
//       // on the right side
//       user: "required",
//       user_message: "required",
//       email: {
//         required: true,
//         // Specify that email should be validated
//         // by the built-in "email" rule
//         emailValue: true
//       },
//     },
//     // Specify validation error messages
//     messages: {
//       user: "Please enter your firstname",
//       user_message: "Please enter your lastname",
//       email: "Please enter a valid email address"
//     },
//     // Make sure the form is submitted to the destination defined
//     // in the "action" attribute of the form when valid
//     submitHandler: function(form) {
//       form.submit();
//     }
//   });
// });



  // $('#show-language').click(function() {
	// 	$('.header-language-content').addClass('show');
	// });


    // $('#show-language').click(function() {
  	// 	$('#header-language > .header-language-content').toggleClass('show');
  	// 	return false;
  	// });


    $(document).ready(function() {
      $('.wrapper').scroll( function(){

        $('.teaser__number').each(function() {
          var $this = $(this),
              countTo = $this.attr('data-count');
          var bottom_of_object = $(this).position().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();

          if( bottom_of_window > bottom_of_object ){

            $({ countNum: $this.text()}).animate({
              countNum: countTo
            },

            {
              duration: 1000,
              easing:'linear',
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
                //alert('finished');
              }

            });
          }

        });
      });
    });
