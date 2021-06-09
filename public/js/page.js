var renderPage = true;

        if (navigator.userAgent.indexOf('MSIE') !== -1
            || navigator.appVersion.indexOf('Trident/') > 0) {
            /* Microsoft Internet Explorer detected in. */
            alert("Please view this in a modern browser such as Chrome or Microsoft Edge.");
            renderPage = false;
        }

//script para esconder a marcação da limpeza

$(document).ready(function(){
    $('#Login').on('click', function(){
        $('#Login').hide(); //Faz apareçer a tm-section-3, utiliza o id da secção
        $('#Logout').show(); //Faz apareçer a tm-section-2, utiliza o id da secção
    })
})

    
$(document).ready(function(){
    $('#Logout').on('click', function(){
        $('#Login').show(); //Faz apareçer a tm-section-3, utiliza o id da secção
        $('#Logout').hide(); //Faz apareçer a tm-section-2, utiliza o id da secção
    })
})
// Marcação da limpeza
$(document).ready(function(){
    $('#limpeza').on('click', function(){
        $('#marcarlimpeza').show();
        $('#mostrarmarcacoes').hide();
        $('#feedbackdotrabalhador').hide();
    })
})
// Verificar as marcações
$(document).ready(function(){
    $('#marcacoes').on('click', function(){
        $('#mostrarmarcacoes').show();
        $('#marcarlimpeza').hide();
        $('#feedbackdotrabalhador').hide();
    })
})
// Feedback do trabalhador
$(document).ready(function(){
    $('#feedback').on('click', function(){
        $('#feedbackdotrabalhador').show();
        $('#mostrarmarcacoes').hide();
        $('#marcarlimpeza').hide();
    })
})

// Verificar as marcações
$(document).ready(function(){
    $('#verificar_marcacoes').on('click', function(){
        $('#marcacoesdelimpeza').show();
        $('#Feedback_do_trabalhador').hide();
        $('#nome').show();
    })
})

// Deixar Feedback na area do trabalhador
$(document).ready(function(){
    $('#feedback_trabalhador').on('click', function(){
        $('#marcacoesdelimpeza').hide();
        $('#Feedback_do_trabalhador').show()
        $('#nome').show()
    })
})

function setCarousel() {
    var slider = $('.tm-img-slider');

    if (slider.hasClass('slick-initialized')) {
        slider.slick('destroy');
    }

    if ($(window).width() > 991) {
        // Slick carousel
        slider.slick({
            autoplay: true,
            fade: true,
            speed: 800,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    } else {
        slider.slick({
            autoplay: true,
            fade: true,
            speed: 800,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
}

$(document).ready(function () {
    if (renderPage) {
        $('body').addClass('loaded');
    }

    setCarousel();

    $(window).resize(function () {
        setCarousel();
    });

    // Close menu after link click
    $('.nav-link').click(function () {
        $('#mainNav').removeClass('show');
    });

    // https://css-tricks.com/snippets/jquery/smooth-scrolling/
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top + 1
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
});