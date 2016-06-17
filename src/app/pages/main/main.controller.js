'use strict';
const screenImage = require('_images/copcar6.jpg');

function MainController($log) {
  'ngInject';

  $log.debug('Hello from main controller!');

  let self = this;
  self.rawImg = screenImage;

}

export default MainController;
