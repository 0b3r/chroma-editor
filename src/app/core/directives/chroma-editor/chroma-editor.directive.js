'use strict';
import chromaEditorTpl from './chromaEditor.html'
export default function (app) {

    app.directive('chromaEditor', chromaEditorDirective);

    function chromaEditorDirective ($log) {
        'ngInject';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: chromaEditorTpl,
            controller: chromaEditorController,
            controllerAs: 'ce',
            bindToController: {
                img: '='
            },
            link: linkFn

        };

        function chromaEditorController(){

            this.tolerance = 250;


        }

        function linkFn (scope, elem, attrs, ctrl) {
            let _srcImg = $(elem).children('.srcImg').get(0);
            let _canvasBg = $(elem).children('.canvasBg');
            let _canvas = _canvasBg.children('.greenScreen').get(0);

            _srcImg.src = ctrl.img;


            _srcImg.onload = function(){
                greenScreen(this);
            };

            function greenScreen(img){
                
                let ctx = _canvas.getContext('2d');
                _canvas.width = img.width;
                _canvas.height = img.height;
                _canvasBg.width(img.width);
                _canvasBg.height(img.height);

                ctx.drawImage(img, 0, 0);


                let rawImgData = ctx.getImageData(0, 0, _canvas.width, _canvas.height);
                let imgData = rawImgData.data;
                $log.log(imgData);
                let start = {
                    r: imgData[0],
                    g: imgData[1],
                    b: imgData[2]
                };

                for(let i=0, n = imgData.length; i < n; i += 4) {
                    let diff = Math.abs(imgData[i] - imgData[0]) + Math.abs(imgData[i+1] - imgData[1]) + Math.abs(imgData[i+2] - imgData[2]);
                    imgData[i+3] = (diff*diff)/ctrl.tolerance;
                }

                ctx.putImageData(rawImgData, 0, 0);
                _canvasBg.css({backgroundColor: '#ccc'});




            }

            

            /*let _srcImgAttrs = {
                width: _srcImg.width(),
                height: _srcImg.height()
            };

            

            _srcImg.on('load', greenScreen);

            */
        }
    }
}