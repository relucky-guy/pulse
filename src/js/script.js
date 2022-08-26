$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev" style="outline:none;"> <img src="icons/slider/chevron-left-solid.png" alt="left"></button>',
        nextArrow: '<button type="button" type="button" class="slick-next" style="outline:none;"> <img src="icons/slider/right.svg" alt="left"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false,

                }
            }
        ]
      });
  }); 