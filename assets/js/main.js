;$(document).ready(function(){
    var __tabs = '.js-about-tabs',
        __controls = __tabs + '__control'
        __contents = __tabs + '__content';

    var $tabs = $(__tabs),
        $controls = $(__tabs);

    $tabs.each(function(){
        var $wrapper = $(this),
            $controls = $wrapper.find(__controls),
            $contents = $wrapper.find(__contents);

        $controls.on('click', function(e){
            e.preventDefault();

            var $curControl = $(this),
                idtab       = $curControl.data('tab');

            if ( $curControl.hasClass('active') ){
                return;
            } else {
                $controls.removeClass('active');
                $contents.removeClass('active');
                $curControl.addClass('active');
                $contents.filter('[data-tab='+idtab+']').addClass('active');
            }
        })
    })
});


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

(function( $ ){
    var namePlugin = 'validForm',
        __item     = '.js-valid-form__item',
        __button   = '.js-valid-form__button',
        __error    = '.js-valid-form__error';

    var methods = {
        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                    data = $this.data(namePlugin),
                    $items = $this.find(__item),
                    $inputs = $items.find('input'),
                    $buttons = $items.find(__button),
                    idTimer = null;

                 // Если плагин ещё не проинициализирован
                 if ( ! data ) {
                   //Тут выполняем инициализацию
                   $(this).data(namePlugin, {
                       target : $this
                   });
                }

                $inputs.on('validation.' + namePlugin, function(){
                    _inputValidation($(this));
                })

                $this.on('submit', function(e){
                    $inputs.trigger('validation.' + namePlugin);
                    var isValidForm = _validationForm($(this));

                    if (!isValidForm){
                        return false;
                    }

                })

                $inputs.on('keydown focusout', function(){
                    var $input = $(this);
                    clearTimeout(idTimer);

                    idTimer = setTimeout(function(){
                        _inputValidation($input);
                    }, 50)
                });

            });
        },
        destroy : function( ) {

            return this.each(function(){

             var $this = $(this),
                 data = $this.data(namePlugin);

             // пространства имён рулят!!11
             $(window).unbind('.' + namePlugin);
             $this.removeData(namePlugin);

            })

        },
        vilidation : function( ) {
            return this.each(function(){
                var $this = $(this);
                _validationForm($this);
            })
        }
    };

    function _validationForm($form){
        var $items = $form.find(__item),
            countitems = $items.length,
            countValiditems = 0,
            isValidForm = false;

        $items.each(function(){
            var $item = $(this),
                isValid = $item.data('isvalid');
                console.log('item valid = ' + isValid);
            if (isValid){
                countValiditems ++
            }
        })

        //Форма валидна, если все элементы формы прошли валидацию или элементов вовсе нет
        if ( countitems === countValiditems || countitems === 0){
            _formSucces($form)
            isValidForm = true;
        } else {
            _formFailure($form);
            isValidForm = false;
        }
        return isValidForm;
    }

    function _formSucces($form) {
        $form.data('isvalid', true);
        console.log('форма валид')
    }
    function _formFailure($form) {
        $form.data('isvalid', false);
        console.log('форма инвалид')
    }

    function _inputValidation($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error),
            type = $input[0].type,
            isvalid = false,
            value = $input.val();

        if ( type == 'text'){
            if ( $input.hasClass('js-mask-phone') ){
                value = value.replace(/\+7/, '').replace(/\D/g, '');

            }
            if ( value !== '' ){
                _inputSucces($input);
                isvalid = true;
            } else {
                _inputFailure($input);
                isvalid = false;
            }
        }

        return isvalid;
    }

    function _inputSucces($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error);

        $item
            .data('isvalid', true)
            .removeClass('error')
            .addClass('succes');
        $input.data('isvalid', true);
        $error.fadeOut();
    }
    function _inputFailure($input){
        var $item = $input.closest(__item),
            $error = $item.find(__error);

        $item
            .data('isvalid', false)
            .addClass('error')
            .removeClass('succes');
        $input.data('isvalid', false);
        $error.fadeIn();
    }

  $.fn[namePlugin] = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    }

  };

})( jQuery );

;$(document).ready(function(){
    $('.js-valid-form').validForm();
});

;$(function(){
    var __itemsWrap = '.js-menu-items';

    var $items = $('.js-menu-items').children(),
        $button = $('.js-menu-button');

    var $menuPopup = $('<div/>', {class: 'menu-popup js-menu-popup'});
    var $menuPopupClose = $('<div/>', {class: 'menu-popup__close js-menu-popup__close'});
    var $menuPopupWrapItems = $('<div/>', {class: 'menu-popup__items js-menu-popup__items'});
    var $itemsClone = $items.clone();

    $menuPopupWrapItems.append($itemsClone)
    $menuPopup.append($menuPopupClose, $menuPopupWrapItems).appendTo($('body'))
    hidePopup();

    $button.on('click', function(e){
        showPopup()
    })
     $menuPopupClose.on('click', function(e){
        hidePopup()
    })

    function showPopup(){
        $('body').addClass('popup-open');
        var delay = 0;
        $itemsClone.each(function(ind, item){
            var $item = $(item);
            delay += 150
            $item.css({opacity: 0, top: '-20px', transition: 'all 0.3s linear '+delay+'ms'})
        })
        $menuPopup.fadeIn(400, function(){
            $itemsClone.css({opacity: 1, top: 0})
            $itemsClone.one('transitionend', function(){
                $(this).attr('style', '')
            })
            $menuPopupClose.addClass('show')
        })
    }
    function hidePopup(){
        $menuPopupClose.removeClass('show')
        $menuPopup.fadeOut(400, function(){
            $('body').removeClass('popup-open');
        })
    }

});

/* ===========================================================
 * jquery-onepage-scroll.js v1.3.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

!function($){

  var defaults = {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: true,
    responsiveFallback: false,
    direction : 'vertical'
	};

	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */
	/*------------------------------------------------*/

	$.fn.swipeEvents = function() {
      return this.each(function() {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
          }
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
            }
          }
        }

      });
    };


  $.fn.onepage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        $sections = $(settings.sectionContainer),
        total = $sections.length,
        status = "off",
        topPos = 0,
        leftPos = 0,
        lastAnimation = 0,
        quietPeriod = 500,
        paginationList = "",
        $body = $('body');

    var __pagination     = '.onepage-pagination',
        __paginationLink = '.onepage-pagination li a';

    var $curSection = $sections.filter('.active'),
        curIndex = 0;

    $.fn.transformPage = function(settings, pos, index) {

      if (typeof settings.beforeMove == 'function') settings.beforeMove(index);

      // Just a simple edit that makes use of modernizr to detect an IE8 browser and changes the transform method into
    	// an top animate so IE8 users can also use this script.
    	if($('html').hasClass('ie8')){
        if (settings.direction == 'horizontal') {
          var toppos = (el.width()/100)*pos;
          $(this).animate({left: toppos+'px'},settings.animationTime);
        } else {
          var toppos = (el.height()/100)*pos;
          $(this).animate({top: toppos+'px'},settings.animationTime);
        }
    	} else{
    	  $(this).css({
    	    "-webkit-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "-moz-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "-ms-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "transition": "all " + settings.animationTime + "ms " + settings.easing
    	  });
    	}
      $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    }


    $.fn.moveDown = function() {
        _movePage.call(this, 'down');
    }

    $.fn.moveUp = function() {
     _movePage.call(this, 'up');
    }

    $.fn.moveTo = function(page_index) {
        console.log(this)
        _movePage.call(this, page_index);
    }

    function responsive() {
      //start modification
      var valForTest = false;
      var typeOfRF = typeof settings.responsiveFallback

      if(typeOfRF == "number"){
      	valForTest = $(window).width() < settings.responsiveFallback;
      }
      if(typeOfRF == "boolean"){
      	valForTest = settings.responsiveFallback;
      }
      if(typeOfRF == "function"){
      	valFunction = settings.responsiveFallback();
      	valForTest = valFunction;
      	typeOFv = typeof valForTest;
      	if(typeOFv == "number"){
      		valForTest = $(window).width() < valFunction;
      	}
      }

      //end modification
      if (valForTest) {
       $body.addClass("disabled-onepage-scroll");
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        el.swipeEvents().unbind("swipeDown swipeUp");
      } else {
        if($("body").hasClass("disabled-onepage-scroll")) {
         $body.removeClass("disabled-onepage-scroll");
          $("html, body, .wrapper").animate({ scrollTop: 0 }, "fast");
        }


        el.swipeEvents().bind("swipeDown",  function(event){
          if (!$body.hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveUp();
        }).bind("swipeUp", function(event){
          if (!$body.hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveDown();
        });

        $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
            if ($('body').hasClass('popup-open')) return false;
          event.preventDefault();
          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          init_scroll(event, delta);
        });
      }
    }


    function init_scroll(event, delta) {
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          el.moveDown()
        } else {
          el.moveUp()
        }
        lastAnimation = timeNow;
    }

    // Prepare everything before binding wheel scroll

    el.addClass("onepage-wrapper").css("position","relative");
    $.each( $sections, function(i) {
        var $curSection = $(this),
            curId = $curSection[0].id,
            linkHash = curId || i+1,
            tooltip  = $curSection.data('nav-tooltip');

      $curSection.css({
        position: "absolute",
        top: topPos + "%"
      }).addClass("section").attr("data-index", i+1);


     $curSection.css({
        position: "absolute",
        left: ( settings.direction == 'horizontal' )
          ? leftPos + "%"
          : 0,
        top: ( settings.direction == 'vertical' || settings.direction != 'horizontal' )
          ? topPos + "%"
          : 0
      });

      if (settings.direction == 'horizontal')
        leftPos = leftPos + 100;
      else
        topPos = topPos + 100;


      if(settings.pagination == true) {

        if (tooltip){
            paginationList += "<li><a data-index='"+(i+1)+"' href='#" + linkHash + "'></a> <div class='onepage-pagination__tooltip'>"+tooltip+"</div></li>"
        } else {
            paginationList += "<li><a data-index='"+(i+1)+"' href='#" + linkHash + "'></a></li>"
        }

      }
    });

    el.swipeEvents().bind("swipeDown",  function(event){
      if (!$body.hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveUp();
    }).bind("swipeUp", function(event){
      if (!$body.hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveDown();
    });

    // Create Pagination and Display Them
    if (settings.pagination == true) {
      if ($(__pagination).length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

      if( settings.direction == 'horizontal' ) {
        posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
        el.find(".onepage-pagination").css("margin-left", posLeft);
      } else {
        posTop = (el.find(".onepage-pagination").height() / 2) * -1;
        el.find(".onepage-pagination").css("margin-top", posTop);
      }
      $(__pagination).html(paginationList);
    }

    var init_index = 1;

    if(window.location.hash != "") {
        var initHash = window.location.hash.replace("#", "");

        if ($sections.filter('#'+initHash).length){
            init_index = parseInt($sections.filter('#'+initHash).data('index'));
        } else {
            init_index = parseInt(initHash);
        }

        if (init_index <= 0 || init_index > total){
          init_index = 1
        }
    }

    $curSection = $sections.filter("[data-index='" + init_index + "']").addClass("active");
    curIndex = init_index;

    el.moveTo(init_index);

    if(settings.pagination == true)  {
        $body.on('click', __paginationLink, function(e){
            e.preventDefault();
            var page_index = $(this).data("index");
            el.moveTo(page_index);
        })
    }


    $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
        if ($('body').hasClass('popup-open')) return false;
      event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      if(!$body.hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
    });


    if(settings.responsiveFallback != false) {
      $(window).resize(function() {
        responsive();
      });

      responsive();
    }

    if(settings.keyboard == true) {
      $(document).keydown(function(e) {
          if ($('body').hasClass('popup-open')) return false;

        var tag = e.target.tagName.toLowerCase();

        if (!$body.hasClass("disabled-onepage-scroll")) {
          switch(e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 40:
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 32: //spacebar
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 33: //pageg up
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 34: //page dwn
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 36: //home
              el.moveTo(1);
            break;
            case 35: //end
              el.moveTo(total);
            break;
            default: return;
          }
        }

      });
    }

    function _movePage(direction){
        var el = $(this),
            pos = null,
            $next = null,
            nextIndex = null,
            curId = null;

        switch (typeof direction){
            case 'string' : {
                switch (direction){
                    case 'down' : {
                        $next = $sections.filter("[data-index='" + (curIndex + 1) + "']");
                        if($next.length < 1) {
                          if (settings.loop == true) {
                            pos = 0;
                            $next = $sections.filter("[data-index='1']");
                          } else {
                            return;
                          }
                        } else {
                          pos = (curIndex * 100) * -1;
                        }
                    }; break;

                    case 'up' : {
                        $next = $sections.filter("[data-index='" + (curIndex - 1) + "']");
                        if($next.length < 1) {
                          if (settings.loop == true) {
                            pos = ((total - 1) * 100) * -1;
                            $next = $sections.filter("[data-index='"+total+"']");
                          }
                          else {
                            return
                          }
                        } else {
                          pos = (($next.data("index") - 1) * 100) * -1;
                        }
                    }; break;

                }
            } break;

            case 'number': {
                $next = $sections.filter("[data-index='" + (direction) + "']");

                if($next.length > 0) {
                    pos = ((direction - 1) * 100) * -1;
                } else {
                    return
                }

            } break;
        }

      nextIndex = $next.data("index");
      curId = $next[0].id;

      if (typeof settings.beforeMove == 'function') settings.beforeMove(nextIndex);

      $curSection.removeClass("active")
      $next.addClass("active");

      if(settings.pagination == true) {
        $(__paginationLink + "[data-index='" + curIndex + "']").removeClass("active");
        $(__paginationLink + "[data-index='" + nextIndex + "']").addClass("active");
      }

     $body[0].className = $body[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
     $body.addClass("viewing-page-"+ nextIndex)

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (curId || nextIndex);
        history.pushState( {}, document.title, href );
      }

      el.transformPage(settings, pos, nextIndex);

      $curSection = $next;
      curIndex = nextIndex;
    }

    return false;
  }


}(window.jQuery);


$(function(){
    $(".js-scroll-page").onepage_scroll({
        sectionContainer: ".js-section",
        easing: "ease-in-out",
        animationTime: 1000,
        pagination: true,
        updateURL: true,
        keyboard: true,
        beforeMove: null,
        afterMove: null,
        loop: true,
        responsiveFallback: false,
        direction : 'vertical'
    });

});

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

;$(document).ready(function(){
    $('.js-section-scroll').on('click', function(e){
        e.preventDefault();

        $('.js-scroll-page').moveDown();
    });

    var $section = $('.js-section'),
        $window = $(window),
        timerPosCenter = null;

    //sectionSetHeight( $window.outerHeight() );

    $window.on('resize', function(e){
        //sectionSetHeight( $window.outerHeight() );
        //sectionParllaxBg();
    })

    // $(window).on('load', function(){
    //     setPosCenter();
    // });

    $(document).on('scroll', function(e){
        //sectionParllaxBg();

        // clearTimeout(timerPosCenter);
        // timerPosCenter = setTimeout(function(){
        //     setPosCenter();
        // }, 1000)
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
                // $bg.css({
                //     transform: 'translateY('+(wScr-curTop)*0.8+'px)'
                // });

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
            $item.css({
                height: height + 'px'
            });
        })
    }

    function setPosCenter(){//Авто центр страницы

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

;$(document).ready(function(){
    var __tabs = '.js-about-tab',
        __controls = __tabs + '__control'
        __contents = __tabs + '__content';

    var $tabs = $(__tabs),
        $controls = $(__tabs);

    $tabs.each(function(){
        var $wrapper = $(this),
            $controls = $wrapper.find(__controls),
            $contents = $wrapper.find(__contents);

        $controls.on('click', function(e){
            e.preventDefault();

            var $curControl = $(this),
                idtab       = $curControl.data('tab');

            if ( $curControl.hasClass('active') ){
                return;
            } else {
                $controls.removeClass('active');
                $contents.removeClass('active');
                $curControl.addClass('active');
                $contents.filter('[data-tab='+idtab+']').addClass('active');
            }
        })
    })
});

// $(document).ready(function(){
//     $('.js-custom-scroll').scrollbar();
//
//     $('.js-mask-phone').mask("+7 (999) 999-99-99",
//         { completed:function(){
//             this.trigger('validation.validForm');
//             this.closest('.js-valid-form').trigger('validation.vilidForm');
//             console.log('finish');
//         } },
//         { autoclear: false },
//         { placeholder:"+7 (___) ___-__-__" });
//
//
//      $('.js-popup-gallery').magnificPopup({
//        delegate: '.owl-item:not(.cloned) a',
//        type: 'image',
//        tLoading: 'Loading image #%curr%...',
//        mainClass: 'mfp-img-mobile',
//        closeBtnInside: false,
//        gallery: {
//          enabled: true,
//          navigateByImgClick: true,
//          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
//        },
//        image: {
//          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
//          titleSrc: function(item) {
//            return item.el.attr('title');
//          }
//        }
//      });
//
//
//     //Просто попап для форм и любого контента
//     $('.js-popup-open').magnificPopup({
//       type: 'inline',
//       preloader: false,
//       focus: '#name',
//       showCloseBtn : false,
//
//       // When elemened is focused, some mobile browsers in some cases zoom in
//       // It looks not nice, so we disable it:
//       callbacks: {
//         beforeOpen: function() {
//           if($(window).width() < 700) {
//             this.st.focus = false;
//           } else {
//             this.st.focus = '#name';
//           }
//         }
//       }
//     });
//
//
//
//
// });
