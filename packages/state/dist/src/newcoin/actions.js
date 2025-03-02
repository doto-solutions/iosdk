"use strict";
// import { NONPOSTAUTHLOCATIONS } from "../.co./constants";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAccountHitory = exports.getPoolInfo = exports.getAccountBalance = void 0;
var overmind_1 = require("overmind");
var getAccountBalance = 
// pipe(
//     debounce(1000),
function (_a, _b) {
    var effects = _a.effects, state = _a.state;
    var user = _b.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, ps;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _c = state.newcoin;
                    return [4 /*yield*/, effects.newcoin.newcoin.getAccountBalance({
                            owner: user.username || ""
                        })];
                case 1:
                    _c.account = _e.sent();
                    return [4 /*yield*/, effects.newcoin.newcoin.getAccountBalance({
                            owner: user.username || "",
                            contract: "pools.nco"
                        })];
                case 2:
                    ps = _e.sent();
                    state.newcoin.pools = (_d = ps === null || ps === void 0 ? void 0 : ps.acc_balances) === null || _d === void 0 ? void 0 : _d.reduce(function (r, c) {
                        var _a;
                        var _b = c.split(/ /), total = _b[0], symbol = _b[1];
                        return __assign(__assign({}, r), (_a = {}, _a[symbol] = total, _a));
                    }, {});
                    return [2 /*return*/];
            }
        });
    });
};
exports.getAccountBalance = getAccountBalance;
// )
exports.getPoolInfo = (0, overmind_1.pipe)((0, overmind_1.debounce)(200), function (_a, _b) {
    var effects = _a.effects, state = _a.state;
    var pool = _b.pool;
    return __awaiter(void 0, void 0, void 0, function () {
        var r, e_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(pool.code || pool.owner))
                        return [2 /*return*/];
                    console.log("getPoolInfo for " + pool.owner);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, effects.newcoin.newcoin.getPoolInfo(pool)];
                case 2:
                    r = _d.sent();
                    if (!((_c = r.rows) === null || _c === void 0 ? void 0 : _c.length))
                        return [2 /*return*/];
                    state.newcoin.cache.pools.byOwner[r.rows[0].owner] = r;
                    state.newcoin.cache.pools.byCode[r.rows[0].code] = r;
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _d.sent();
                    debugger;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var getAccountHitory = 
// pipe(
// debounce(1000),
function (_a, _b) {
    var effects = _a.effects, state = _a.state;
    var user = _b.user, force = _b.force;
    return __awaiter(void 0, void 0, void 0, function () {
        var curr, r, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    curr = state.newcoin.cache.accountHistory[(user === null || user === void 0 ? void 0 : user.username) || ""];
                    if (curr && !force)
                        return [2 /*return*/];
                    return [4 /*yield*/, effects.newcoin.hyperion("/v2/state/get_account?account=".concat(user === null || user === void 0 ? void 0 : user.username))];
                case 1:
                    r = _e.sent();
                    _c = state.newcoin.cache.accountHistory;
                    _d = (user === null || user === void 0 ? void 0 : user.username) || "";
                    return [4 /*yield*/, r.json()];
                case 2: return [2 /*return*/, (_c[_d] =
                        (_e.sent()))];
            }
        });
    });
};
exports.getAccountHitory = getAccountHitory;
// )
