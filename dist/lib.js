"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = exports.Status = void 0;
const zod_1 = __importDefault(require("zod"));
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["internal_server_error"] = 500] = "internal_server_error";
    Status[Status["unauthorized"] = 403] = "unauthorized";
    Status[Status["not_found"] = 404] = "not_found";
    Status[Status["invalid_input_types"] = 411] = "invalid_input_types";
})(Status || (exports.Status = Status = {}));
;
exports.signUpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
        .min(8, { message: 'Minimum length 8' })
        .max(20, { message: 'Maximum length 20' })
        .refine((password) => /[A-Z]/.test(password), {
        message: 'Must contain one uppercase alphabet',
    })
        .refine((password) => /[a-z]/.test(password), {
        message: 'Must contain one lowercase alphabet',
    })
        .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
        .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'Must contain one special character',
    }),
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
        .min(8, { message: 'Minimum length 8' })
        .max(20, { message: 'Maximum length 20' })
        .refine((password) => /[A-Z]/.test(password), {
        message: 'Must contain one uppercase alphabet',
    })
        .refine((password) => /[a-z]/.test(password), {
        message: 'Must contain one lowercase alphabet',
    })
        .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
        .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'Must contain one special character',
    })
});
