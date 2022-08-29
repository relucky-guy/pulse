$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev" style="outline:none;"> <img src="icons/slider/chevron-left-solid.png" alt="left"></button>',
        nextArrow: '<button type="button" type="button" class="slick-next" style="outline:none;"> <img src="icons/slider/right.svg" alt="left"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false,
                  adaptiveHeight: true,
                }
            }
        ]
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })            
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');    

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast')
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })
    });

    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                  },
                phone: "required",
                email: {
                  required: true,
                  email: true
                }
            },
            messages: {
                name: {
                    required: "*Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("*Введите минимум {0} символа!"),
                    maxlength: jQuery.validator.format("*Допустимое значение {0} символов!")
                  },            
                phone: "*Пожалуйста, введите свой номер телефона",
                email: {
                  required: "*Пожалуйста, введите свою почту",
                  email: "*Ваша почта должна быть введена в формате name@domain.com"
                }
              }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        // if (!$(this).valid()) {
        //     return;
        // };

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('fast');


            $('form').trigger('reset');
        })
        return false;
    })
}); 