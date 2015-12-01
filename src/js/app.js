global.jQuery = global.$ = require('jquery');
var matchHeight = require('jquery-match-height');
var Wallop = require('Wallop');

var WallopElement = document.querySelector('.Wallop');
var slider = new Wallop(WallopElement);
var first  = false;
var lastTarget = '';
var originClassName = 'col-sm-3 col-xs-6 text-center slider-bar';

document.querySelector('.bar-component').addEventListener('click', function(e){
        if(e.target != this){
            if(!first && e.target.dataset.slide != 0){
                slider.goTo(e.target.dataset.slide);
                first = true;
                console.log(e.target.class);
                this.querySelector('.active').className = originClassName;
                e.target.className += ' active';
                lastTarget = e.target;
            }
            else {
                if(first){
                    lastTarget.className = originClassName;
                    slider.goTo(e.target.dataset.slide);
                    e.target.className += ' active';
                    lastTarget = e.target;
                }
            }
        }
});

var WallopElementTem = document.querySelector('.WallopTem');
var temoignages = new Wallop(WallopElementTem);


var options = {
    byRow: true,
    property: 'height',
    target: null,
    remove: false
};

$(function() {
    $('.item-prog').matchHeight(options);
});

require('bootstrap')