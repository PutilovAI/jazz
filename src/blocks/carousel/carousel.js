
$(function(){
    var $next = $('.js-carousel__control-next');
        $prev = $('.js-carousel__control-prev'),
        $owlWork = $('.js-carousel-work'),
        $items = $('.js-carousel-item'),
        $window = $(window);

    itemsSetHeight( $window.outerHeight() );

    $owlWork.owlCarousel({
        items: 1,
        margin: 0,
        loop: true,
        autoHeight:true,
        merge: true,
        smartSpeed: 1000,
    });


    $next.on('click', function(){
        var $carousel = $(this).parent().find('.js-carousel')
        $carousel.trigger('next.owl.carousel');
    })
    $prev.on('click', function(){
        var $carousel = $(this).parent().find('.js-carousel')
        $carousel.trigger('prev.owl.carousel');
    })




    $window.on('resize', function(e){
        itemsSetHeight( $window.outerHeight() );
    })

    function itemsSetHeight(h){
        $('.js-carousel-item').each(function(ind){
            var height = h;
            var $item = $(this);
            $item.css({
                height: height + 'px'
            });
        })
    }

});
