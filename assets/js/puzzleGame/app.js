var gc = document.getElementById("puzzleGame"),
    container = document.getElementById("container"),
    btnShowImage = document.getElementById("btnShowImage"),
    dimension = 1,  
    imageSize = 720,
    counter,
    bGameOver = false,
    movement = [],
    validState = [];

//game module
var puzzle = {};

var board = (function(){
    var boardWidth, boardHeight;
    function drawBackground(el) {
        var val = el.dataset.value;
        
        /**draw background position */
        el.style.backgroundPosition = "left " + ((val % dimension) * -1 * boardWidth) + "px top " + (Math.floor(val / dimension) * -1 * boardWidth) + "px";
        /** */
        
        el.style.backgroundSize = imageSize + "px " + imageSize + "px";
    }
    return {
        init: function () {
            container.innerHTML = "",     
            boardWidth = container.offsetWidth / dimension,
            boardHeight = container.offsetHeight / dimension;

            var val = [], 
                valLength = Math.pow(dimension, 2);
            
            while(val.length < valLength){
                var num = Math.ceil(Math.random() * valLength)
                if(val.indexOf(num) === -1){
                    val.push(num)
                }  
            }
            
            for(var i = 0; i < val.length; i++) {
                var el = this.template(val[i] - 1);
                container.appendChild(el);    
                drawBackground(el);      
                validState.push(i);
            }
            
            var boards = document.getElementsByClassName("board");
            for(var i = 0; i < boards.length; i++) {
                boards[i].addEventListener("click", handler.onBoardClick);
            }
        },
        template: function(val) {
            var el = document.createElement("div");             
                
            el.dataset.value = val;
            el.classList.add("board");
            
            el.style.width = boardWidth + "px";
            el.style.height = boardHeight + "px";

            return el;
        },
        swapValue: function (from, to) {
            if(from == to) return;
            
            /** swap value */
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) + parseInt(container.children[to].dataset.value);
            container.children[to].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            /** */

            drawBackground(container.children[from]);
            drawBackground(container.children[to]);
            
            counter++;
        }
    }
})();

var canvas = (function() {
    return {        
        init: function() {
            container.style.width = imageSize + "px";
            container.style.height = imageSize + "px";
            board.init();
        }
    }
})();

var handler = (function(){
    return {
        onButtonShowImageClick: function(e) {
            if(bGameOver) puzzle.start();
            var boards = document.getElementsByClassName("board");
            var action = e.target.innerHTML;
            e.target.innerHTML = (action === "Show Image") ? "Continue" : "Show Image";
            for(var i = 0; i < boards.length; i++){
                action === "Show Image" ? boards[i].classList.add("hide") : boards[i].classList.remove("hide");
            }
        },
        onBoardClick: function(e) { 
            if(bGameOver) return;   
            puzzle.swapBoard(e.target);         
        }
    }
})();

(function(puzzle) {
    var messageBox = document.getElementById("message");
    puzzle.checkGameState = function() {
        var state = [];
        for(var i = 0; i < container.children.length; i++) {
            state.push(parseInt(container.children[i].dataset.value));
        }
        bGameOver = JSON.stringify(validState) === JSON.stringify(state);
        return bGameOver;
    }
    puzzle.gameOver = function() {
        messageBox.innerHTML = "Game Over!!!";   
        btnShowImage.innerHTML = "Next";
    }
    var from = to = undefined;
    puzzle.swapBoard = function(el) {
        if(from === undefined) {
            from = [].indexOf.call(el.parentNode.children, el);
        }
        else {
            to = [].indexOf.call(el.parentNode.children, el);
            board.swapValue(from, to);
            from = to = undefined;
            if(puzzle.checkGameState()) puzzle.gameOver();
        }   
    }
    puzzle.start = function() {
        counter = 0;
        bGameOver = false;
        validState = [];
        movement = [];
        dimension++;
        messageBox.innerHTML = "";
        canvas.init();
    }    
    btnShowImage.addEventListener("click", handler.onButtonShowImageClick);
})(puzzle);