window.onload = function () {
    var btn = document.getElementById("btn");
    var iframe = document.getElementById("iframe");
    var srcs = ["https://editor.p5js.org/lewlian/embed/fM3QHCYT9", "https://editor.p5js.org/lewlian/embed/DczO27-hX"];
    var i = 0;
    btn.addEventListener("click", buttonClick, false);

    function buttonClick(e) {
        iframe.src = srcs[i];
        console.log('loading src', srcs[i]);
        i = ((1 + i) % srcs.length);
    };

    btn.click();
}