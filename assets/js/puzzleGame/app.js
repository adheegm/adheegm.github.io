var gc = document.getElementById("puzzleGame"),
    container = document.getElementById("container"),
    btnShowImage = document.getElementById("btnShowImage"),
    column = 10, 
    row = 10, 
    imageSize = 380,
    boardWidth, 
    boardHeight,
    counter,
    isGameOver = false,
    validState = new Array();

//module
var puzzle = {};

var board = (function(){
    return {
        drawBackground: function(el) {
            var val = el.dataset.value;
            el.style.background = "no-repeat url(\"/assets/img/sample-image.jpg\")";
            el.style.backgroundPosition = "left " + ((val % column) * -1 * boardWidth) + "px top " + (Math.floor(val / row) * -1 * boardWidth) + "px";
            el.style.backgroundSize = imageSize + "px " + imageSize + "px";
        },
        drawBoards: function () {
            container.innerHTML = "",     
            boardWidth = container.offsetWidth / column,
            boardHeight = container.offsetHeight / row;

            var val = [], 
                valLength = column * row;
            
            while(val.length < valLength){
                var num = Math.ceil(Math.random() * valLength)
                if(val.indexOf(num) === -1){
                    val.push(num)
                }  
            }
            
            for(var i = 0; i < val.length; i++) {
                var el = document.createElement("div");             
                
                el.dataset.value = val[i] - 1;
                el.className += "board";
                
                el.style.width = boardWidth + "px";
                el.style.height = boardHeight + "px";
                el.style.display = "inline";
                el.style.cssFloat = "left";
                el.style.cursor = "pointer";

                board.drawBackground(el);   
                container.appendChild(el);       

                validState.push(i);
            }
            
            var boards = document.getElementsByClassName("board");
            for(var i = 0; i < boards.length; i++) {
                boards[i].addEventListener("click", handler.onBoardClick);
            }
        },
        swapValue: function (from, to) {
            if(from == to) return;
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) + parseInt(container.children[to].dataset.value);
            container.children[to].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            board.drawBackground(container.children[from]);
            board.drawBackground(container.children[to]);
            counter++;
        }
    }
})();

var canvas = (function() {
    return {        
        init: function() {
            container.style.margin = "0 auto";
            container.style.border = "none";
            container.style.width = imageSize + "px";
            container.style.height = imageSize + "px";
            container.style.background = "no-repeat url(\"/assets/img/sample-image.jpg\")";
            board.drawBoards();
        }
    }
})();

var handler = (function(){
    function checkGameState() {
        var state = [];
        for(var i = 0; i < container.children.length; i++) {
            state.push(parseInt(container.children[i].dataset.value));
        }
        isGameOver = JSON.stringify(validState) === JSON.stringify(state);
        return isGameOver;
    }

    var from = to = undefined;

    return {
        onButtonShowImageDown: function(e) {
            var boards = document.getElementsByClassName("board");
            for(var i=0;i<boards.length;i++){
                boards[i].classList.add("hide");
            }
        },
        onButtonShowImageUp: function(e) {
            var boards = document.getElementsByClassName("board");
            for(var i=0;i<boards.length;i++){
                boards[i].classList.remove("hide");
            }
        },
        onBoardClick: function(e) { 
            if(isGameOver) return;
            
            if(from === undefined) {
                from = [].indexOf.call(e.target.parentNode.children, e.target);
            }
            else {
                to = [].indexOf.call(e.target.parentNode.children, e.target);
                board.swapValue(from, to);
                from = to = undefined;
                if(checkGameState()) {
                    document.getElementById("message").innerHTML = "Game Over";                    
                }
            }            
        }
    }
})();

(function(puzzle) {
    puzzle.init = function() {
        counter = 0;
        isGameOver = false;
        canvas.init();
    }
    btnShowImage.addEventListener("mousedown", handler.onButtonShowImageDown);
    btnShowImage.addEventListener("mouseup", handler.onButtonShowImageUp);
    return puzzle;
})(puzzle);