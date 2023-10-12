/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { bookSearchableFields } from './decoratorService.constant';
import {
  IDecoratorService,
  IDecoratorServiceFilters,
} from './decoratorService.interface';
import { DecoratorService } from './decoratorService.model';
import { IUser } from '../user/user.interface';
import { Types } from 'mongoose';

const createDecoratorService = async (
  decoratorService: IDecoratorService,
  addedBy: IUser | Types.ObjectId
): Promise<IDecoratorService | null> => {
  decoratorService.addedBy = addedBy;
  const newDecoratorService = await DecoratorService.create(decoratorService);
  return newDecoratorService;
};

const getAllDecoratorServices = async (
  filters: IDecoratorServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDecoratorService[]>> => {
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

const getSingleDecoratorService = async (
  id: string
): Promise<IDecoratorService | null> => {
  const result = await DecoratorService.findById(id).populate('addedBy');
  return result;
};

const updateDecoratorService = async (
  id: string,
  payload: Partial<IDecoratorService>,
  addedBy: string
): Promise<IDecoratorService | null> => {
  const isExist = await DecoratorService.findOne({ _id: id, addedBy: addedBy });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You Do not have no Edit permission!'
    );
  }

  const { ...bookData } = payload;

  const updatedDecoratorServiceData: Partial<IDecoratorService> = {
    ...bookData,
  };

  const result = await DecoratorService.findByIdAndUpdate(
    id,
    updatedDecoratorServiceData,
    {
      new: true,
    }
  );
  return result;
};

const deleteDecoratorService = async (
  id: string,
  addedBy: string
): Promise<IDecoratorService | null> => {
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

export const DecoratorServiceService = {
  createDecoratorService,
  getAllDecoratorServices,
  getSingleDecoratorService,
  updateDecoratorService,
  deleteDecoratorService,
};
