/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { bookSearchableFields } from './decoratorService.constant';
import { IBook, IBookFilters } from './decoratorService.interface';
import { DecoratorService } from './decoratorService.model';
import { IUser } from '../user/user.interface';
import { Types } from 'mongoose';

const createBook = async (
  decoratorService: IBook,
  addedBy: IUser | Types.ObjectId
): Promise<IBook | null> => {
  decoratorService.addedBy = addedBy;
  const newBook = await DecoratorService.create(decoratorService);
  return newBook;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await DecoratorService.find(whereConditions)
    .populate('addedBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await DecoratorService.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await DecoratorService.findById(id).populate('addedBy');
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  addedBy: string
): Promise<IBook | null> => {
  const isExist = await DecoratorService.findOne({ _id: id, addedBy: addedBy });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You Do not have no Edit permission!'
    );
  }

  const { ...bookData } = payload;

  const updatedBookData: Partial<IBook> = { ...bookData };

  const result = await DecoratorService.findByIdAndUpdate(id, updatedBookData, {
    new: true,
  });
  return result;
};

const deleteBook = async (
  id: string,
  addedBy: string
): Promise<IBook | null> => {
  const isExist = await DecoratorService.findOne({ _id: id, addedBy: addedBy });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You Do not have Delete permission!'
    );
  }
  const result = await DecoratorService.findByIdAndDelete(id).populate(
    'addedBy'
  );
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
