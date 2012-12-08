$(function() {

    var ctx = document.getElementById('canvas').getContext('2d');
    
    var img = new Image();
    img.src = 'http://www.theemailguide.com/wp-content/uploads/2012/08/Alchemy-Worx.jpg';
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.moveTo(30, 96);
        ctx.stroke();
    }

    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e) {

        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    $('#canvas').mouseleave(function(e) {
        paint = false;
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw() {

        canvas.width = canvas.width;

        ctx.drawImage(img, 0, 0);

        ctx.strokeStyle = "#E40001";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            ctx.beginPath();
            if (clickDrag[i] && i) {
                ctx.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                ctx.moveTo(clickX[i] - 1, clickY[i]);
            }
            ctx.lineTo(clickX[i], clickY[i]);
            ctx.closePath();
            ctx.stroke();
        }
    }

    $('#clearCanvas').click(function() {
        ctx.drawImage(img, 0, 0);

        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();

    })
});