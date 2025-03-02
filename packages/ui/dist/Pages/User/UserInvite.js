"use strict";
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
exports.UserInvite = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var Form_1 = require("antd/lib/form/Form");
var react_1 = require("react");
var ContentLayout_1 = require("../../Components/ContentLayout");
var ProgressButton_1 = require("../../Components/ProgressButton");
var Spin_1 = require("../../Components/Spin");
var UserInvite = function () {
    var form = (0, Form_1.useForm)()[0];
    var actions = (0, state_1.useActions)();
    var _a = (0, react_1.useState)("start"), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)(""), fullName = _b[0], setFullName = _b[1];
    var onFinish = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setFullName(data.fullName);
                    return [4 /*yield*/, actions.api.user.invite({ userInvite: data })];
                case 1:
                    _a.sent();
                    setStatus("done");
                    return [3 /*break*/, 3];
                case 2:
                    ex_1 = _a.sent();
                    setStatus("failed");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    switch (status) {
        case "inprogress":
            return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
        case "failed":
            return (0, jsx_runtime_1.jsx)("div", { children: "Something wend wronk" });
        case "done":
            return (0, jsx_runtime_1.jsxs)("div", { children: ["You invited ", fullName] });
        case "start":
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "app-main-title-spacing header-2" }, { children: "Invite a friend" })), (0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ name: "basic", form: form, 
                        // labelCol={{ span: 6 }}
                        wrapperCol: { span: 24 }, 
                        // value={{ state }}
                        onFinish: onFinish, 
                        // onFinishFailed={onFinishFailed}
                        autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "phone", rules: [
                                    {
                                        message: "Please input your username!",
                                        required: true
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "phone" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "fullName", rules: [
                                    {
                                        message: "Please input your username!",
                                        required: true
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "name" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "email", rules: [
                                    {
                                        message: ""
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ wrapperCol: { offset: 8, span: 16 } }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.user.invite", type: "primary", htmlType: "submit" }, { children: "Submit" })) }))] }))] }));
    }
    return (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, {});
};
exports.UserInvite = UserInvite;
