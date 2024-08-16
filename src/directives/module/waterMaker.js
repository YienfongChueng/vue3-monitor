const addWaterMarker = (str, parentNode, font, textColor) => {
    // 水印文字，父元素，字体，文字颜色
    let can = document.createElement("canvas");
    parentNode.appendChild(can);
    can.width = 200;
    can.height = 150;
    can.style.display = "none";
    let cans = can.getContext("2d");
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = font || "16px Microsoft JhengHei";
    cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
    cans.textAlign = "left";
    cans.textBaseline = "Middle";
    cans.fillText(str, can.width / 10, can.height / 2);
    parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
};

export default {
    // 当被绑定的元素插入到 DOM 中时……
    mounted(el,binding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
    },
    // 如果元素从 DOM 中移除……
    unmounted(el) {
        // el.removeEventListener('click');
    }
};