import type { UnwrapPromise } from "../types/global.js";
export declare function callMaybeAsync<F extends () => any>(fn: F): Promise<UnwrapPromise<ReturnType<F>>>;
//# sourceMappingURL=callMaybeAsync.d.ts.map