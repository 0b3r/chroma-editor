'use strict';
const screenImage1 = require('_images/copcar6.jpg');
const screenImage2 = require('_images/1.jpg');


function MainController($log) {
  'ngInject';

  $log.debug('Hello from main controller!');

  let self = this;
  self.rawImg = screenImage2;

}

export default MainController;
