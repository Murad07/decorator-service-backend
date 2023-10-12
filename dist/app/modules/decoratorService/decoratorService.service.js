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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorServiceService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const decoratorService_constant_1 = require("./decoratorService.constant");
const decoratorService_model_1 = require("./decoratorService.model");
const createDecoratorService = (decoratorService, addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    decoratorService.addedBy = addedBy;
    const newDecoratorService = yield decoratorService_model_1.DecoratorService.create(decoratorService);
    return newDecoratorService;
});
const getAllDecoratorServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: decoratorService_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield decoratorService_model_1.DecoratorService.find(whereConditions)
        .populate('addedBy')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield decoratorService_model_1.DecoratorService.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleDecoratorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield decoratorService_model_1.DecoratorService.findById(id).populate('addedBy');
    return result;
});
const updateDecoratorService = (id, payload, addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield decoratorService_model_1.DecoratorService.findOne({ _id: id, addedBy: addedBy });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You Do not have no Edit permission!');
    }
    const bookData = __rest(payload, []);
    const updatedDecoratorServiceData = Object.assign({}, bookData);
    const result = yield decoratorService_model_1.DecoratorService.findByIdAndUpdate(id, updatedDecoratorServiceData, {
        new: true,
    });
    return result;
});
const deleteDecoratorService = (id, addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield decoratorService_model_1.DecoratorService.findOne({ _id: id, addedBy: addedBy });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You Do not have Delete permission!');
    }
    const result = yield decoratorService_model_1.DecoratorService.findByIdAndDelete(id).populate('addedBy');
    return result;
});
exports.DecoratorServiceService = {
    createDecoratorService,
    getAllDecoratorServices,
    getSingleDecoratorService,
    updateDecoratorService,
    deleteDecoratorService,
};
