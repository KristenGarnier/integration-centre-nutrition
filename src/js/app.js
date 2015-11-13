var Wallop = require('Wallop');

var WallopElement = document.querySelector('.Wallop');
var slider = new Wallop(WallopElement);
var first  = false;

document.querySelector('.bar-component').addEventListener('click', function(e){
        if(e.target != this){
            if(!first && e.target.dataset.slide != 0){
                slider.goTo(e.target.dataset.slide);
                first = true;
            }
            else {
                if(first){
                    slider.goTo(e.target.dataset.slide);
                }
            }
        }
});
