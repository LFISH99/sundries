/**
 * 判断参数是否是其中之一
 * @param value         待验证字符
 * @param validList     比对列表
 * @returns {boolean}
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
