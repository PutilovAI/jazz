;$(document).ready(function(){
    $('.js-section-scroll').on('click', function(e){
        e.preventDefault();

        var $section = $(this).parents('.section'),
            curPageScroll = $(window).scrollTop();
            sectionTop = $section[0].getBoundingClientRect().top
            newTop = 0;

        newTop = curPageScroll + sectionTop;

        $('body, html').animate({scrollTop: newTop +'px'}, 500);

    });

    var $section = $('.js-section'),
        $window = $(window),
        timerPosCenter = null;

    sectionSetHeight( $window.outerHeight() );

    $window.on('resize', function(e){
        sectionSetHeight( $window.outerHeight() );
        sectionParllaxBg();
    })

    $(window).on('load', function(){
        setPosCenter();
    });

    $(document).on('scroll', function(e){
        sectionParllaxBg();

        clearTimeout(timerPosCenter);
        timerPosCenter = setTimeout(function(){
            setPosCenter();
        }, 1000)
    })

    function sectionParllaxBg(){
        var wScr = $(document).scrollTop(),
            wH   = $window.outerHeight();

        $section.each(function(){
            var $item = $(this),
                $bg = $item.find('.section__bg'),
                $elPlx = $item.find('[data-parallax]'),
                curTop = $item.offset().top;

            if (  curTop >= wScr - ( wH*2) && curTop <= wScr + (wH*2)){
                $bg.css({
                    transform: 'translateY('+(wScr-curTop)*0.8+'px)'
                });

                if ($elPlx.length){
                    var plxValue = $elPlx.data('parallax'),
                        plxParam = $elPlx.data('parallax-param') || "marginTop",
                        cssObj   = {};
                        cssObj[plxParam] = (wScr-curTop) * plxValue + 'px';

                    $elPlx.css(cssObj);
                }

            }

        })
    }

    function sectionSetHeight(h){
        $section.each(function(ind){
            var height = h;
            var $item = $(this);
            //if (ind > 0 && $section.length - 1) height *= 1.05
            $item.css({
                height: height + 'px'
            });
        })
    }

    function setPosCenter(){

        var wScr = $(document).scrollTop(),
            wH   = $window.outerHeight();

        var a = wScr / wH;
        var b = parseInt(a);
        var k = a - b;

        if (k == 0) return;

        var newScr = 0;

        if (k >= 0.5) {
            newScr = (b + 1) * wH;
        } else {
            newScr = b * wH;
        }

        $('body, html').animate({scrollTop: newScr +'px'}, 500);

    }





});
