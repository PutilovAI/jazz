'use strict';
let dist = './dist';
let src = './src';
const conf = {
  path : {
    js : {
      src : ['./src/blocks/**/*.js', './src/assets/js/*.js'],
      vendor: [
        './src/assets/libs/jquery/jquery.min.js',
        //'./src/assets/libs/jquery-ui/jquery-ui.min.js',
        //'./src/assets/libs/owl.carousel/dist/owl.carousel.min.js',
        //'./src/assets/libs/selectize/dist/js/standalone/selectize.js',
        './src/assets/libs/jquery.maskedinput/src/jquery.maskedinput.js',
        //'./src/assets/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        './src/assets/libs/onepage-scroll/jquery.onepage-scroll.js'
      ],
      dest: "./dist/assets/js"
    },
    img : {
        src : [
    			'./src/assets/libs/jquery-ui/images/*.+(png|jpg|jpeg|gif|svg)',
    			'./src/blocks/**/*.+(png|jpg|jpeg|gif|svg)',
    			'./src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)'
    	],
        dest: dist + "/assets/images"
    },
    dist: dist,
    src: src
  },
  name: {
    zip: 'jazz-main.zip'
  }
}

module.exports = conf;
