"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorServiceValidaion = void 0;
const zod_1 = require("zod");
const createDecoratorServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        price: zod_1.z.number(),
        category: zod_1.z.string(),
        location: zod_1.z.string(),
    }),
});
const updateDecoratorServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
    }),
});
exports.DecoratorServiceValidaion = {
    createDecoratorServiceZodSchema,
    updateDecoratorServiceZodSchema,
};
