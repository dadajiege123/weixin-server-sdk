import isPromise from "./isPromise.js";
// 统一处理：无论同步/异步，都返回 Promise<Result>
export async function callMaybeAsync(fn) {
    const result = fn();
    // 运行时判断是否是 Promise（注意：不能只靠 instanceof）
    if (result != null && typeof result === 'object' && typeof result.then === 'function') {
        return await result;
    }
    return result;
}
//# sourceMappingURL=callMaybeAsync.js.map