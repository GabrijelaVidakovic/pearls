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

  $.ajax({
      url : url,
      type: 'POST',
      data : data,
      dataType: 'html',
  }).done(function(response){
      console.log(response);
  });
});

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
