jQuery(document).ready(function ($) {
  var $carousel = $('.children');

  $carousel.owlCarousel({
    items: 1,
    autoplay: true,
    loop: false,
autoplayHoverPause: true,
  smartSpeed: 1000,
    nav: true,
    dots: true,
    onInitialized: updatePagination,
    onChanged: updatePagination,
responsive:{
   0: {
      items: 1,
      autoHeight: true
    },
    768: {
      items: 1,
        autoHeight: false      
    }
  }
    
  });

  function updatePagination(event) {
    var current = event.item.index + 1;
    var total = event.item.count;

    var currentFormatted = current < 10 ? '0' + current : current;
    var totalFormatted = total < 10 ? '0' + total : total;
$(".custom-pagination").html(
  '<span class="pagination-start">' + currentFormatted + '</span>' +
  ' _______ ' +
  '<span class="pagination-end">' + totalFormatted + '</span>'
);


    var $prevBtn = $('.owl-prev');
    var $nextBtn = $('.owl-next');

    if (event.item.index === 0) {
      $prevBtn.addClass('disabled');
    } else {
      $prevBtn.removeClass('disabled');
    }

    if (event.item.index + event.page.size >= event.item.count) {
      $nextBtn.addClass('disabled');
    } else {
      $nextBtn.removeClass('disabled');
    }
  }
});


jQuery(document).ready(function ($) {
  var $carousel = $('.indstry');

  $carousel.owlCarousel({
    center: true,
    smartSpeed: 1000,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
    items:10,
   dots:false,
    loop:true,
	  autoplay:true,
    margin:20,
  nav:true,
  arrows:true,
    onInitialized: updatePagination,
    onChanged: updatePagination,
   responsive:{
        0: { items: 1 },
    600: { items: 2,
     },
    960: { items: 2,
    
     },
    1200: { items: 2 }
    }
  });

   function updatePagination(event) {
    var carousel = event.relatedTarget;
    var current = carousel.relative(carousel.current()) + 1;
    var total = carousel.items().length;
    var currentFormatted = current < 10 ? '0' + current : current;
    var totalFormatted = total < 10 ? '0' + total : total;

    $(".custom-pagination").text(currentFormatted + " _______ " + totalFormatted);
}

});




var slide4Carousel = $('.slide4');
slide4Carousel.owlCarousel({
 loop:true,
	autoplay:true,
	nav:true,
  smartSpeed: 1000,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
	autoplayHoverPause: true,
  
  margin: 10,
  responsive: {
    0: { items: 1 },
    600: { items: 1 },
    960: { items: 2 },
    1200: { items: 2 },
    1700: {item: 2.5}
  }
});



jQuery(document).ready(function ($) {
  var $carousel = $('.banner-carousel');

  var owl = $carousel.owlCarousel({
    items: 1,
    loop:true,
    nav: true,
    dots: false,
    autoplay:true,
    autoplayTimeout: 5000,
    onInitialized: function (event) {
      var totalSlides = event.item.count;
      $('.total-number').text(totalSlides < 10 ? '0' + totalSlides : totalSlides);
      updateCurrent(event);
    },
    onChanged: function (event) {
      updateCurrent(event);
    }
  });

  function updateCurrent(event) {
    var totalSlides = event.item.count;
    var realIndex = event.item.index - event.relatedTarget._clones.length / 2;

  
    if (realIndex >= totalSlides) realIndex = 0;
    if (realIndex < 0) realIndex = totalSlides - 1;

    var current = realIndex + 1;
    var formatted = current < 10 ? '0' + current : current;
    $('.current-number').text(formatted);
  }
});

  jQuery(document).ready(function($){
  $('.elementor-counter-number').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-to-value');

    $({ countNum: $this.text() }).animate({
      countNum: countTo
    },
    {
      duration: 8000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }
    });  
  });
});
jQuery(document).ready(function($){
  $('.elementor-counter-number').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-to-value');

    $({ countNum: $this.text() }).animate({
      countNum: countTo
    },
    {
      duration: 8000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }
    });  
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".ekit-search-group");
    const searchInput = form.querySelector(".ekit_search-field");

    form.addEventListener("submit", function (e) {
        const value = searchInput.value.trim();

        if (value === "") {
            alert("Search field must be filled out");
            
        }
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".search-form");
    const searchInput = form.querySelector(".search-field");

    form.addEventListener("submit", function (e) {
        const value = searchInput.value.trim();

        if (value === "") {
            alert("Search field must be filled out");
           
        }
    });
});

document.querySelectorAll('model-viewer').forEach(modelViewer => {
  modelViewer.addEventListener('load', () => {
    modelViewer.autoRotate = false;
    let lastTime = null;
    const speed = 1;

    function rotateModel(time) {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const orbit = modelViewer.getCameraOrbit();
      const newTheta = (orbit.theta + speed * delta * 2 * Math.PI) % (2 * Math.PI);
      modelViewer.cameraOrbit = `${newTheta}rad ${orbit.phi}rad ${orbit.radius}m`;

      requestAnimationFrame(rotateModel);
    }

    requestAnimationFrame(rotateModel);
  });
});

window.onscroll = function() {myscroll()};
const heder = document.getElementById("masthead");
function myscroll(){
if(document.body.scrollTop>50)
{
heder.style.position = "fixed";
}
else{
  heder.style.position = "relative";
}
}