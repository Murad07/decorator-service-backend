import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './decoratorService.controller';
import { BookValidaion } from './decoratorService.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enmus/user';
const router = express.Router();

router.post(
  '/create-decoratorService',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookValidaion.createBookZodSchema),
  BookController.createBook
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.USER),
  BookController.getSingleBook
);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.USER),
  BookController.getAllBooks
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  BookController.deleteBook
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BookValidaion.updateBookZodSchema),
  BookController.updateBook
);

export const BookRoutes = router;
