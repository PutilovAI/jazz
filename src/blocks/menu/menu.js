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
