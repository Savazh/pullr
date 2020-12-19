$(document).ready(function() {
  fixedHeader();
  mainAnimate();
  anchorScroll();
  headingParallax();
  menuHandle();
  aboutSliderInit();
  sendForm();
  checkHeader();

  // whyUsIcons();
  // newMenu();
});

function anchorScroll() {
  $(".js-scrollto").on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top-42
    }, 500);
    $(".header__nav").removeClass("header__nav--expanded");
  });
}

function headingParallax() {
  if ($(".infoblock__bgtext").length) {
    var headings = new Rellax(".infoblock__bgtext", {
      speed: -1.3,
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
  }
}

function mainAnimate() {
  $(window).on('resize scroll', function() {
    AnimateBlock($('.startups .infoblock'));
    AnimateBlock($('.investors .infoblock'));
    AnimateBlock($('.branding .infoblock'));
    AnimateBlock($('.clients'));
    AnimateBlock($('.whyus'));
    AnimateBlock($('.contact'));
    AnimateBlock($('.expertise'));
  });
  (function() {
    AnimateBlock($('.startups .infoblock'));
    AnimateBlock($('.investors .infoblock'));
    AnimateBlock($('.branding .infoblock'));
    AnimateBlock($('.whyus'));
    AnimateBlock($('.clients'));
    AnimateBlock($('.contact'));
    AnimateBlock($('.expertise'))
  })();
}

function mainSliderInit() {
  mainSlider = new Swiper (".greeting__slider-wrapper", {
    wrapperClass: 'greeting__slider',
    slideClass :'greeting__slide',
    slideActiveClass: 'greeting__slide--active',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    direction: 'vertical',
    autoplay: {
      delay: 999999999,
    },
    pagination: {
      el: '.greeting__pagination',
      type: 'bullets',
      bulletClass: 'greeting__bullet',
      bulletActiveClass: 'greeting__bullet--active',
      clickable: true,
    },
    breakpoints: {
      1050: {
        longSwipes: false,
        allowTouchMove: false,
      }
    }
  });
};

function aboutSliderInit() {
  if($(".about-team__slider").length) {
    aboutSlider = new Swiper (".about-team__slider", {
      wrapperClass: 'about-team__slider-wrapper',
      slideClass : 'about-team__slide',
      slideActiveClass: 'about-team__slide--active',
      speed: 1000,
      loop: true,
      effect: "fade",
      slidesPerView: 1,
      navigation: {
        prevEl: '.about-team__arrow--prev',
        nextEl: '.about-team__arrow--next',
      },
    });
  }
}

function mainVideoInit() {
  var video = document.querySelector(".greeting__video");
  if (video.paused) {
    video.play();
  }
}

function updateVh() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

function menuHandle() {
  $(".js-menu-btn").click(function() {
    $(".header__nav").addClass("header__nav--expanded");
  });

  $(".menu-close").click(function() {
    $(".header__nav").removeClass("header__nav--expanded");
  });
}

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function AnimateBlock(selector) {
  if (selector.length > 0) {
    if (selector.isInViewport()) {
      selector.delay(1200).addClass('animate');
    // } else {
    //   selector.removeClass('animate');
    }
  }
}


function whyUsIcons() {
  var icons = document.querySelectorAll(".whyus__icon svg");
  
  if (icons.length) {
    icons.forEach(function(icon, index) {
      new Vivus(icon, {
        duration: 200,
        type: "oneByOne",
      });
    });
  }
}


function sendForm() {
  $("form").submit(function() {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "/mailer/mailer.php",
      data: th.serialize()
    }).done(function() {
      setTimeout(function() {
        th.trigger("reset");
      }, 1000);

    });
    return false;
  });
}

function fixedHeader() {
  var header = $(".header");
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = header.outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    if (st>50) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }
}
function checkHeader() {
  var header = $(".header");
  var st = $(this).scrollTop();
  if (st>50) {
    header.addClass("fixed");
  } else {
    header.removeClass("fixed");
  }
}
function newMenu() {
  $(".menu-btn").click(function() {
    $(this).toggleClass("menu-btn--active")
  })
}
