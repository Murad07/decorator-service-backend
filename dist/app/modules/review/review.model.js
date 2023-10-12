"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    decoratorService: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'DecoratorService',
        required: true,
    },
    reviewBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)('Review', exports.ReviewSchema);
