/**
 * Vue中加载百度地图
 * @param ak  百度密钥
 * @returns {Promise}
 */
const wm_ak = 'gdQqTNMXz82QGStsTtX0OCvlrnvK1bv4'

export function Map (ak = wm_ak) {
  return new Promise (function (resolve, reject) {
    window.init = function () {
        resolve(BMap);
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
