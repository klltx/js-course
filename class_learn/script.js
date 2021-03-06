'use strict';

const square = document.querySelector('.square');
let coordX = 0,
    coordY = 0;

const DomElement = function(selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.addElement = function(){
    switch(this.selector[0]){
        case '.':
            let newDiv = document.createElement('div');
            newDiv.classList.add(this.selector.substring(1));
            newDiv.style.height = this.height;
            newDiv.style.width = this.width;
            newDiv.style.background = this.bg;
            newDiv.style.fontSize = this.fontSize;
            newDiv.textContent = '123';
            document.querySelector('body').insertAdjacentElement('afterbegin', newDiv);
            break;
        case '#':
            let newP = document.createElement('p');
            newP.id = this.selector.substring(1);
            newP.style.height = this.height;
            newP.style.width = this.width;
            newP.style.background = this.bg;
            newP.style.fontSize = this.fontSize;
            newP.textContent = '123';
            document.querySelector('body').insertAdjacentElement('afterbegin', newP);
            break;
    }
};

const elem = new DomElement('.green', 1000, 10, '#f7f7f7', 150);
elem.addElement();
elem.addElement();


const elemP = new DomElement('#page', 1000, 10, '#f7f710', 150);
elemP.addElement();

document.addEventListener('keydown', function(e){
    console.log(e);
    switch(e.key){
        case 'ArrowUp':
            coordY -= 10;
            square.style.top = coordY + 'px';
            break;
        case 'ArrowLeft':
            coordX -= 10;
            square.style.left = coordX + 'px';
            break;
        case 'ArrowRight':
            coordX += 10;
            square.style.left = coordX + 'px';
            break;
        case 'ArrowDown':
            coordY += 10;
            square.style.top = coordY + 'px';
            break;
    }
});