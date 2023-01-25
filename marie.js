var clicks = 0;

$(document).ready(function () {
  var clicks = 0;
  $('.click').click(function () {
    $('.plus-top').addClass('rotatedRight');
    if (clicks == 0) {
      $('.black-menu').css('height', 'auto');
      $('.black-menu').css('padding', '96px 48px 16px 16px');
      $('#projects').css('color', 'white');
      $('.plus-bottom').removeClass('hide');
      $('.plus-top').removeClass('rotatedLeft');
      $('.plus-top').addClass('rotatedRight');
      clicks = 1;
    } else {
      $('.black-menu').css('height', '0');
      $('.black-menu').css('padding', '0px 48px 0px 16px');
      $('#projects').css('color', 'black');
      $('.plus-bottom').addClass('hide');
      $('.plus-top').removeClass('rotatedRight');
      $('.plus-top').addClass('rotatedLeft');
      clicks = 0;
    }
  });

  var imagesNumber = $('.photo-area img').length;
  console.log('images number:', imagesNumber);
  var width = 0;
  var imageWidth = 0;
  var imageCount = 0;
  var offset = 0;
  $('.photo-area img').each(function () {
    width += $(this).outerWidth(true);
    imageWidth = $(this).outerWidth(true);
    imageCount += 1;
    offset = $(this).offset().left;
    console.log(
      imageCount +
        ': ' +
        ' image width: ' +
        imageWidth +
        ' image left offset: ' +
        offset +
        ' image right end inside the box: ' +
        width
    );
    if (width > containerWidth) {
      console.log('image is out');
      console.log('should move on click: ', width - containerWidth);
    }
  });

  var $arrowLeft = $('.arrow-left');
  var $arrowRight = $('.arrow-right');

  $('.photo-area img:first').addClass('active');

  function clickRightArrow() {
    console.log('right arrow clicked');

    //find active image and its sibling
    // active image is 0 on the left
    // sibling is
    var $img = $('img.active');
    var sibling = $('img.active').next();

    // get offset of an active image
    var $offset = $img.offset().left;
    console.log('right active image offset: ', $offset);

    // get the next sibling image to shift the active class

    var imgWidth = $('img.active').outerWidth(true);
    //console.log('get width of the next active image: ', $imgWidth);

    var moveFor = imgWidth + $offset;
    console.log('move for: ' + moveFor);

    $('.photo-area img').removeClass('active');
    sibling.addClass('active');
    $('#inner').animate({ scrollLeft: '+=' + moveFor }, 'fast');
    if ($('.photo-area img:last').hasClass('active')) {
      $arrowRight.hide();
    } else {
      $arrowRight.show();
    }
    if ($('.photo-area img:first').hasClass('active')) {
      $arrowLeft.hide();
    } else {
      $arrowLeft.show();
    }
  }

  function clickLeftArrow() {
    console.log('left arrow clicked');
    var $img = $('img.active');
    var $offset = $img.offset().left;
    var sibling = $('img.active').prev();
    var imgWidth = $('img.active').outerWidth(true);
    var moveFor = imgWidth - $offset;
    console.log('left arrow clicked');
    console.log('left: ' + $offset);
    console.log('move: ' + moveFor);
    $('.photo-area img').removeClass('active');
    sibling.addClass('active');
    $('#inner').animate({ scrollLeft: '-=' + moveFor }, 'fast');
    if ($('.photo-area img:first').hasClass('active')) {
      $arrowLeft.hide();
    } else {
      $arrowLeft.show();
    }
    if ($('.photo-area img:last').hasClass('active')) {
      $arrowRight.hide();
    } else {
      $arrowRight.show();
    }
  }

  $arrowRight.click(clickRightArrow);
  $arrowLeft.click(clickLeftArrow);

  if ($('.photo-area img:first').hasClass('active')) {
    $arrowLeft.hide();
  }
  if ($('.photo-area img:last').hasClass('active')) {
    $arrowRight.hide();
  }

  var containerWidth = $('.photo-area').width();
  console.log('container width:', containerWidth);
  var innerWidth = $('.photo-inner').width();
  console.log('inner width:', innerWidth);
  var screenWidth = $(document).width() - 16;
  console.log('screen width:', screenWidth);

  $('body').keydown(function (e) {
    // left arrow
    if ((e.keyCode || e.which) == 37) {
      clickLeftArrow();
    }
    // right arrow
    if ((e.keyCode || e.which) == 39) {
      clickRightArrow();
    }
  });
});
