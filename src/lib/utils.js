export function debounce(fn, delay) {
    let timer = null; // 借助闭包
    return function () {
        if (timer) {
            clearTimeout(timer); // 取消当前的计时，重新开始计时
            timer = setTimeout(fn, delay);
        } else {
            timer = setTimeout(fn, delay); // 开始一个计时
        }
    }
}
