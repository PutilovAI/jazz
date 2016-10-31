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
