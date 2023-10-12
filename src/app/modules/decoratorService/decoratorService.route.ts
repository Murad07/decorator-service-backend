import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DecoratorServiceController } from './decoratorService.controller';
import { DecoratorServiceValidaion } from './decoratorService.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enmus/user';
const router = express.Router();

router.post(
  '/create-decoratorService',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(DecoratorServiceValidaion.createDecoratorServiceZodSchema),
  DecoratorServiceController.createDecoratorService
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.USER),
  DecoratorServiceController.getSingleDecoratorService
);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.USER),
  DecoratorServiceController.getAllDecoratorServices
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  DecoratorServiceController.deleteDecoratorService
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(DecoratorServiceValidaion.updateDecoratorServiceZodSchema),
  DecoratorServiceController.updateDecoratorService
);

export const DecoratorServiceRoutes = router;
