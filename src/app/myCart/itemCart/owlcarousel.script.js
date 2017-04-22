console.log("Owl-carousel");
$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      loop:true,
        margin:10,
        dots:false,
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
                nav:true,
                loop:true
            },
            600:{
                items:3,
                nav:true,
                loop:true
            },
            1000:{
                items:5,
                nav:true,
                loop:true
            }
        }
  });
});