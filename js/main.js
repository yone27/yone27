//+------------------------------------------------------------------+
//| Layout masonry                                     
//+------------------------------------------------------------------+
function masonry(container, items, columns) {
    if (screen.width <= 991 && screen.width >= 768) {
        columns = 2
    } else if (screen.width <= 767) {
        columns = 1
    }

    //agregamos clases a las columnas por si necesitaramos manipularlas posteriori, OPCIONAL
    container.classList.add(`columns-${columns}`);

    //colums items masonry
    let columnsElements = [];

    // insertamos las respectivas columnas masonry y las guardamos en la variable "columnsElements"
    for (let i = 1; i <= columns; i++) {
        let column = document.createElement("div");
        column.classList.add(`column-${i}`);
        column.style.gridColumn = i;
        container.appendChild(column);
        columnsElements.push(column);
    }

    /*
      Math.ceil(items.length / columns) = dividimos el nro de items entre las columnas y redondeamos hacia arriba
    */
    // Recorre todos los rows con sus respectivas columnas
    for (let m = 0; m < Math.ceil(items.length / columns); m++) {
        // Recorre los items
        for (let n = 0; n < columns; n++) {
            /*
              m*columns+n (posicion actual de los items)
            */
            let item = items[m * columns + n];
            columnsElements[n].appendChild(item);

        }
    }
}

function setMasonry() {
    let container = document.querySelector(".masonry-layout"),
        items = document.querySelectorAll(".masonry-layout > .item"),
        columns = 3;

    if (container && items && columns) {
        masonry(container, items, columns);
    }
}

document.addEventListener('onload', setMasonry())

//+------------------------------------------------------------------+
//| Menu
//+------------------------------------------------------------------+
let navButton = document.getElementById("nav-button"),
    menu = document.querySelector(".header.header-a")

navButton.addEventListener('click', function() {
    console.log('aloooo')
    menu.classList.toggle('left');
})