var cc = function (value) {
    console.log(JSON.stringify(value))
}
var ID = function (id) {
    return document.getElementById(id);
};




function getPos(element) {
    return rect = element.getBoundingClientRect();
}
function setSize(elem, w, h) {
    elem.style.width = `${w}px`
    elem.style.height = `${h}px`
}

function startDrag(point, elem, kind) {
    var params = {
        point: point,
        elem: elem,
        tl: [-3, -3],
        isDown: false,
        startPos: { x: 0, y: 0 },
        oldPos: { x: 0, y: 0 },
        diff: { x: 0, y: 0 },
        kind: kind
    }

    params.point.onmousedown = function (e) {
        params.isDown = true;
        params.startPos = { x: e.clientX, y: e.clientY }
        // console.log("start")
        // console.log(params.startPos)
        params.oldPos = { x: e.clientX, y: e.clientY }
    }

    document.addEventListener('mousemove', function (e) {

        e.preventDefault()
        if (params.isDown) {
            params.startPos = { x: e.clientX, y: e.clientY }
            // console.log("mousemove")
            // console.log(params.startPos)
            var diffw = params.startPos.x - params.oldPos.x
            var diffh = params.startPos.y - params.oldPos.y
            params.oldPos = { x: e.clientX, y: e.clientY }

            // elem.style.top = e.clientY + "px";
            // elem.style.left = e.clientX + "px";

            if (params.kind == "tl" || params.kind == "bl" || params.kind == "br" || params.kind == "tr") {
                // point.style.top = params.startPos.y - 3 + "px";
                // point.style.left = params.startPos.x - 3 + "px";
                /* chnage height + width */
                setSize(params.elem, parseInt(getPos(params.elem).width) + diffw, (parseInt(params.elem.style.height) + diffh))
            }
            if (params.kind == "tc") {
                params.elem.style.top = parseInt(params.elem.style.top) + diffh + "px";
                setSize(params.elem, params.elem.style.width, (parseInt(params.elem.style.height) - diffh))
            }
            if (params.kind == "bc") {
                setSize(params.elem, params.elem.style.width, (parseInt(params.elem.style.height) + diffh))
            }

            if (params.kind == "lc") {
                params.elem.style.left = parseInt(params.elem.style.left) + diffw + "px";
                setSize(params.elem, parseInt(params.elem.style.width) - diffw, params.elem.style.height)
            }
            if (params.kind == "rc") {
                setSize(params.elem, parseInt(getPos(params.elem).width) + diffw, params.elem.style.height)
            }

            if (params.kind == 'center') {
                params.elem.style.top = (parseInt(getPos(params.elem).top) + diffh) + "px";
                params.elem.style.left = (parseInt(getPos(params.elem).left) + diffw) + "px";
            }

        }
    })

    document.addEventListener('mouseup', function (e) {
        params.isDown = false;
    })
    document.addEventListener('mouseleave', function (e) {
        // console.log('mouseleave')
        params.isDown = false;
    })
}

function render(container) {
    var html = `
    <div id="zxxDragBg" style="z-index:2;height:100%; background:white; opacity:0.3; filter:alpha(opacity=30); cursor:move;"></div>
    <div id="dragLeftTop" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:-3px; cursor:nw-resize;"></div>
    <div id="dragLeftBot" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; bottom:-3px; cursor:sw-resize;"></div>
    <div id="dragRightTop" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:-3px; cursor:ne-resize;"></div>
    <div id="dragRightBot" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; bottom:-3px; cursor:se-resize;"></div>
    <div id="dragTopCenter" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; top:-3px; left:50%; margin-left:-3px; cursor:n-resize;"></div>
    <div id="dragBotCenter" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; bottom:-3px; left:50%; margin-left:-3px; cursor:s-resize;"></div>
    <div id="dragRightCenter" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; right:-3px; top:50%; margin-top:-3px; cursor:e-resize;"></div>
    <div id="dragLeftCenter" style="z-index:2;position:absolute; width:4px; height:4px; border:1px solid #000; background:white; overflow:hidden; left:-3px; top:50%; margin-top:-3px; cursor:w-resize;"></div>
    `
    container.innerHTML = html;
}

function drawImage(image, width, height, x, y) {

    var canvas = document.getElementById('result')
    var ctx = null;
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'result')
        document.body.append(canvas);

    }
    canvas.width = width
    canvas.height = height
    ctx = canvas.getContext('2d');
    // ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

}





function ajaxLoadImage(image, width, height) {

    var canvas = document.getElementById('_image')
    if (!canvas) {
        canvas = document.createElement('canvas')
    }
    canvas.setAttribute('id', '_image')
    canvas.width = width
    canvas.height = height;
    ID('handel').appendChild(canvas)

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);




    var kk = document.getElementById('zxxCropBox')
    if (!kk) {
        kk = document.createElement('div')
    }
    kk.setAttribute('id', 'zxxCropBox')
    kk.style.height = '80px'
    kk.style.width = "80px"
    kk.style.position = 'absolute'
    kk.style.top = '104px'
    kk.style.left = '250px'
    kk.style.border = ' 1px solid black'
    ID('handel').appendChild(kk)



    render(ID('zxxCropBox'))
    startDrag(ID('zxxDragBg'), ID('zxxCropBox'), 'center')

    /* top */
    startDrag(ID('dragLeftTop'), ID('zxxCropBox'), 'tl')
    startDrag(ID('dragTopCenter'), ID('zxxCropBox'), 'tc')
    startDrag(ID('dragRightTop'), ID('zxxCropBox'), 'tr')
    /* center */
    startDrag(ID('dragLeftCenter'), ID('zxxCropBox'), 'lc')
    startDrag(ID('dragRightCenter'), ID('zxxCropBox'), 'rc')
    /* bottom */
    startDrag(ID('dragLeftBot'), ID('zxxCropBox'), 'bl')
    startDrag(ID('dragRightBot'), ID('zxxCropBox'), 'br')
    startDrag(ID('dragBotCenter'), ID('zxxCropBox'), 'bc')
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
/* 選擇圖片 */
ID('选择圖片').onchange = function (e) {
    var image = new Image();
    var objUrl = getObjectURL(e.target.files[0]);
    if (objUrl) {
        image.src = objUrl;
        image.onload = function () {
            ajaxLoadImage(image, 400, 400)
        }
    }

}
/* caijian */
ID('caijian').onclick = function (e) {
    var width = getPos(ID('zxxCropBox')).width
    var height = getPos(ID('zxxCropBox')).height
    var top = getPos(ID('zxxCropBox')).top
    var left = getPos(ID('zxxCropBox')).left
    var image = new Image();
    image.src = ID('_image').toDataURL("image/png");
    image.onload = function (e) {
        drawImage(image, width, height, left, (top - 24))
    }
}