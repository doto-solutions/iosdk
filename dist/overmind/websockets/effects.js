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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (upd) {
    var state = {
        socket: null
    };
    var pingInterval;
    var pingCounter = 0;
    var processPong = function (ev) {
        if (ev.data === "pong") {
            pingCounter--;
            console.log("pong, pingCounter == ", pingCounter);
        }
    };
    var startPing = function () { return (pingInterval = setInterval(function () {
        var _a;
        (_a = state === null || state === void 0 ? void 0 : state.socket) === null || _a === void 0 ? void 0 : _a.send("ping");
        pingCounter++;
        console.log("ping, pingCounter == ", pingCounter);
    }, 10000)); };
    var stopPing = function () {
        clearInterval(pingInterval);
    };
    var toggle = function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = upd(token);
            if (state.url === url)
                return [2 /*return*/];
            state.url = url;
            if (state.socket) {
                state.socket.removeEventListener('message', processPong);
                state.socket.removeEventListener('open', startPing);
                state.socket.removeEventListener('close', stopPing);
                state.socket.close();
                state.socket = null;
            }
            stopPing();
            if (token && url) {
                state.socket = new WebSocket(state.url);
                state.socket.addEventListener('open', startPing);
                // effects.ux.message.info('websockets open');
                //     startPing();
                // });
                state.socket.addEventListener('close', stopPing);
                //  (ev) => {
                //     // effects.ux.message.info('websockets close');
                //     stopPing();
                // });
                state.socket.addEventListener('message', processPong);
            }
            return [2 /*return*/];
        });
    }); };
    state.toggle = toggle;
    return state;
});
//# sourceMappingURL=effects.js.map