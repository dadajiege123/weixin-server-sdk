/**
 * //判断参数是否为 Promise 对象
 * @param value
 * @returns boolean
 */
export default function isPromise(value) {
    return value != null && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map