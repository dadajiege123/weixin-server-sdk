
/**
 * //判断参数是否为 Promise 对象
 * @param value 
 * @returns boolean
 */
export default function isPromise<T>(value: any): value is Promise<T> {
  return value != null && typeof value.then === 'function';
}