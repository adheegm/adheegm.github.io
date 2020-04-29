var container = document.getElementById("container"),
    dimension = 2,
    imageSize = 720;

//module
var puzzle = {};

var board = (function () {
    var boardWidth, boardHeight;
    function setBackground(el) {
        var val = el.dataset.value;
        el.style.backgroundPosition = "left " + ((val % dimension) * -1 * boardWidth) + "px top " + (Math.floor(val / dimension) * -1 * boardHeight) + "px";
        el.style.backgroundSize = imageSize + "px " + imageSize + "px";
    }
    return {
        drawBoard: function () {
            container.innerHTML = "",
                boardWidth = container.offsetWidth / dimension,
                boardHeight = container.offsetHeight / dimension;

            var val = [], valLength = Math.pow(dimension, 2);

            while (val.length < valLength) {
                var num = Math.ceil(Math.random() * valLength)
                if (val.indexOf(num) === -1) {
                    val.push(num)
                }
            }

            for (var i = 0; i < val.length; i++) {
                var el = this.template(val[i] - 1);
                container.appendChild(el);
                puzzle.validState.push(i);
            }
        },
        template: function (val) {
            var el = document.createElement("div");
            el.dataset.value = val;
            el.classList.add("board");
            el.style.width = boardWidth + "px";
            el.style.height = boardHeight + "px";
            setBackground(el);
            el.addEventListener("click", handler.onBoardClick);
            return el;
        },
        swapValue: function (from, to) {
            if (from == to) return;

            /** swap value */
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) + parseInt(container.children[to].dataset.value);
            container.children[to].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            container.children[from].dataset.value = parseInt(container.children[from].dataset.value) - parseInt(container.children[to].dataset.value);
            /** */

            setBackground(container.children[from]);
            setBackground(container.children[to]);

            puzzle.counter++;
        }
    }
})();

var canvas = (function () {
    return {
        init: function () {
            container.style.width = imageSize + "px";
            container.style.height = imageSize + "px";
            board.drawBoard();
        }
    }
})();

var handler = (function () {
    return {
        onButtonNavClick: function (e) {
            if (puzzle.isGameOver()) puzzle.start();
            else {
                var boards = document.getElementsByClassName("board");
                var action = e.target.innerHTML;
                e.target.innerHTML = (action === "Show Image") ? "Continue" : "Show Image";
                for (var i = 0; i < boards.length; i++)
                    action === "Show Image" ? boards[i].classList.add("hide") : boards[i].classList.remove("hide");
            }
        },
        onBoardClick: function (e) {
            if (puzzle.isGameOver()) return;
            puzzle.swapBoard(e.target);
        }
    }
})();

(function (puzzle) {
    var btnNav = document.getElementById("btnNav"),
        messageBox = document.getElementById("message");
    puzzle.isGameOver = function () {
        var state = [];
        for (var i = 0; i < container.children.length; i++) {
            state.push(parseInt(container.children[i].dataset.value));
        }
        return JSON.stringify(puzzle.validState) === JSON.stringify(state);
    }
    puzzle.onGameOver = function () {
        messageBox.innerHTML = "Game Over!!!";
        btnNav.innerHTML = "Next";
    }
    var from = to = undefined;
    puzzle.swapBoard = function (el) {
        if (from === undefined) {
            from = [].indexOf.call(el.parentNode.children, el);
        }
        else {
            to = [].indexOf.call(el.parentNode.children, el);
            board.swapValue(from, to);
            from = to = undefined;
            if (puzzle.isGameOver()) puzzle.onGameOver();
        }
    }
    puzzle.start = function () {
        dimension++;
        messageBox.innerHTML = "";
        btnNav.innerHTML = "Show Image";
        puzzle.counter = 0;
        puzzle.movement = [];
        puzzle.validState = [];
        canvas.init();
    }
    btnNav.addEventListener("click", handler.onButtonNavClick);
})(puzzle);