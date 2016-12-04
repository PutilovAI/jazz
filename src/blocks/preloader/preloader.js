;$(document).ready(function(){
    var $preloader = $('.preloader');
    var $preloaderPercent = $preloader.find('.preloader__percent');
    var $elBg = $('.section__bg, .js-carousel-item-img');
    var totalImg = $elBg.length;
    var countLoad = 0;

    function renderPercent(){
        var percent = Math.floor( (countLoad / totalImg) * 100 );
        $preloaderPercent.text(percent + '%');
    }

    $elBg.each(function(){
        console.log($(this))
        var $this = $(this);
        $('<img>').attr('src',function(){
            var imgUrl =  $this.css('background-image');
            imgUrl = imgUrl.substring(5, imgUrl.length - 2);

            return imgUrl;
        }).on('load', function(){
           countLoad++;
           renderPercent();
        });
    });
});


window.addEventListener('load', function(){
    $('.preloader').delay(1000).fadeOut(function(){$('.preloader').remove()})
})
