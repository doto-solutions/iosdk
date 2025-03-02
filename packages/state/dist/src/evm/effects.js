"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sendSignedMessage = exports.connect = exports.initWeb3 = void 0;
var web3_1 = __importDefault(require("web3"));
var web3js = null;
var ethereum = window.ethereum;
var account_address = "";
var initWeb3 = function () {
    if (!web3js) {
        web3js = new web3_1["default"](ethereum);
    }
};
exports.initWeb3 = initWeb3;
(0, exports.initWeb3)();
var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    var r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (web3js === null || web3js === void 0 ? void 0 : web3js.givenProvider.request({
                    method: "eth_requestAccounts"
                }))];
            case 1:
                r = _a.sent();
                return [4 /*yield*/, ethereum.enable()];
            case 2:
                _a.sent();
                account_address = r.toString();
                console.log("account:", r);
                return [2 /*return*/];
        }
    });
}); };
exports.connect = connect;
var sendSignedMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
    var m, payload, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                m = {
                    collectionAddress: "100",
                    nftIndex: "10",
                    timestamp: Date.now(),
                    address: account_address
                };
                payload = JSON.stringify(m);
                return [4 /*yield*/, (web3js === null || web3js === void 0 ? void 0 : web3js.eth.personal.sign(payload, account_address, ""))];
            case 1:
                signature = _a.sent();
                console.log(JSON.stringify({ payload: payload, signature: signature }));
                return [2 /*return*/];
        }
    });
}); };
exports.sendSignedMessage = sendSignedMessage;
