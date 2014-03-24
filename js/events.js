$(document).ready(function() {

  resizeWindow()
  $(window).resize(function() {
    resizeWindow();
  });

  $(document).on('mouseenter', 'div.small-point', function() {
    $(this).closest('div.points-list').prev()
      .find('div.msg-block-text')
      .text($(this).find('div.point-msg').text())
    
    $(this).find('div.point-point').addClass('animated pulse')
      .prev().addClass('animated border_pulse')
      .prev().show();
    $(this).closest('div.time-line-part').find('div.msg-block').show();
  });

  $(document).on('mouseleave', 'div.small-point', function() {
    $(this).find('div.point-point').removeClass('animated pulse')
      .prev().removeClass('animated border_pulse')
      .prev().hide();
    $(this).closest('div.time-line-part').find('div.msg-block').hide();
  });

  var jcarousel = $('.jcarousel');

  jcarousel.on('jcarousel:reload jcarousel:create', function () {
    var width_size_block = 350;
    var width_last_size_block = 80;
    var width_carousel_block = $('div.time-line-block').innerWidth();
    var count_full_blocks = Math.floor((width_carousel_block - width_last_size_block) / width_size_block);
    
    $('div.jcarousel-wrapper')
      .css('width', (count_full_blocks * width_size_block) + width_last_size_block + "px");
    jcarousel.jcarousel('items')
      .css('width', width_size_block + 'px');
  })
  .jcarousel();

  $('.jcarousel-control-prev')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
      target: '-=1'
    });

  $('.jcarousel-control-next')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
        target: '+=1'
    });

  $('.jcarousel').on('jcarousel:animateend', function(event, carousel) {
    if (lastItemIsVisible()) {
      $('.jcarousel-control-next')
        .addClass('inactive')
        .jcarouselControl({  target: '-=0' });
    } else {
      $('.jcarousel-control-next')
        .removeClass('inactive')
        .jcarouselControl({  target: '+=1' });
    }
  });

  $(document).on('mouseup', 'a.jcarousel-control-next,a.jcarousel-control-prev', function(event) {
    if (!$(this).hasClass('inactive')) {
      var target = $(this).hasClass('jcarousel-control-next') ? "-=1" : "+=1";
      goParalax(target);
    }
  });
});



function lastItemIsVisible() {
  var last_item = $('.jcarousel').jcarousel('items').last().get(0);
  var result = false

  _.map($('.jcarousel').jcarousel('visible'), function(item) {
    if (item === last_item) {
      result = true;
    }
  });

  return result;
}

function resizeWindow() {
  var padding_top_for_carcas = ($(window).height() - $("#carcas").height()) / 2;
  $('#carcas').css('marginTop', padding_top_for_carcas + "px");
}

function goParalax(target) {
  $('div.background-paralax').animate({
    left: (target === "+=1") ? "+=100" : "-=100",
  }, 400, function() {});
}