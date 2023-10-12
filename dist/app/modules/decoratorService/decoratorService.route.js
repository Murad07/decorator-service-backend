"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const decoratorService_controller_1 = require("./decoratorService.controller");
const decoratorService_validation_1 = require("./decoratorService.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enmus/user");
const router = express_1.default.Router();
router.post('/create-decoratorService', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(decoratorService_validation_1.DecoratorServiceValidaion.createDecoratorServiceZodSchema), decoratorService_controller_1.DecoratorServiceController.createDecoratorService);
router.get('/:id', 
// auth(ENUM_USER_ROLE.USER),
decoratorService_controller_1.DecoratorServiceController.getSingleDecoratorService);
router.get('/', 
// auth(ENUM_USER_ROLE.USER),
decoratorService_controller_1.DecoratorServiceController.getAllDecoratorServices);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), decoratorService_controller_1.DecoratorServiceController.deleteDecoratorService);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(decoratorService_validation_1.DecoratorServiceValidaion.updateDecoratorServiceZodSchema), decoratorService_controller_1.DecoratorServiceController.updateDecoratorService);
exports.DecoratorServiceRoutes = router;
