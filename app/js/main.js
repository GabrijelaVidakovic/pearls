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

//Fit video

$(document).ready(function(){
  // Target your .container, .wrapper, .post, etc.
  $(".video").fitVids();
});

//  Isotope gallery

var initial_items = 5;
var next_items = 8;

var  $items = $('.grid-item');
var $grid = $('.grid-container');

$grid.isotope({
  // filter: '.select',
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    columnWidth: '.grid-sizer'
  },

  getSortData : {
      selected : function(itemElem){
        var $item = $( itemElem );
        return $item.hasClass('selected') ? -1 : $item.index();
      }
    },
    sortBy : 'selected',
  })

  $items.click(function(){
    var $this = $(this);
    // don't proceed if already selected
    var $previousSelected = $('.selected');
    if ( !$this.hasClass('selected') ) {
      $this.addClass('selected');
    }

    $previousSelected.removeClass('selected');

    // update sortData for new items size
    $grid
      .isotope( 'updateSortData', $this )
      .isotope( 'updateSortData', $previousSelected )
      .isotope();
  });

// bind filter button click
$('.button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    $grid.isotope({filter: filterValue});
    updateFilterCounts();
});
function updateFilterCounts() {
    // get filtered item elements
    var itemElems = $grid.isotope('getFilteredItemElements');
    var count_items = $(itemElems).length;

    if (count_items > initial_items) {
        $('#show-more').show();
    }
    else {
        $('#show-more').hide();
    }
    if ($('.grid-item').hasClass('visible_item')) {
        $('.grid-item').removeClass('visible_item');
    }
    var index = 0;

    $(itemElems).each(function () {
        if (index >= initial_items) {
            $(this).addClass('visible_item');
        }
        index++;
    });
    $grid.isotope('layout');
}

// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});

function showNextItems(pagination) {
    var itemsMax = $('.visible_item').length;
    var itemsCount = 0;
    $('.visible_item').each(function () {
        if (itemsCount < pagination) {
            $(this).removeClass('visible_item');
            itemsCount++;
        }
    });
    if (itemsCount >= itemsMax) {
        $('#show-more').hide();
    }
    $grid.isotope('layout');
}

// function that hides items when page is loaded
function hideItems(pagination) {
    var itemsMax = $('.grid-item').length;
    var itemsCount = 0;
    $('.grid-item').each(function () {
        if (itemsCount >= pagination) {
            $(this).addClass('visible_item');
        }
        itemsCount++;
    });
    if (itemsCount < itemsMax || initial_items >= itemsMax) {
        $('#show-more').hide();
    }
    $grid.isotope('layout');
}
$('#show-more').on('click', function (e) {
    e.preventDefault();
    showNextItems(next_items);
});
hideItems(initial_items);
