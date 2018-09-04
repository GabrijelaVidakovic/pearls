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
//viewport animation

$(function($, win) {
  $.fn.inViewport = function(cb) {
    return this.each(function(i,el){
      function visPx(){
        var H = $(this).height(),
            r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
        return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
      } visPx();
      $(win).on("resize scroll", visPx);
    });
  };
}(jQuery, window));


jQuery(function($) {

  $(".teaser__number").inViewport(function(px) {
    if(px>0 && !this.initNumAnim) {
      this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
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
            }

          });
        }

      });
    }
  });

});
