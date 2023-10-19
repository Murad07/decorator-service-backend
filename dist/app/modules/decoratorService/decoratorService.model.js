"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorService = exports.DecoratorServiceSchema = void 0;
const mongoose_1 = require("mongoose");
const decoratorService_constant_1 = require("./decoratorService.constant");
exports.DecoratorServiceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: decoratorService_constant_1.category,
    },
    location: {
        type: String,
        enum: decoratorService_constant_1.location,
    },
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceImage: {
        type: String,
    },
    serviceStatus: {
        type: String,
        enum: decoratorService_constant_1.serviceStatus,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.DecoratorService = (0, mongoose_1.model)('DecoratorService', exports.DecoratorServiceSchema);
