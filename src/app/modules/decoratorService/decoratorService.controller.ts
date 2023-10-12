import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './decoratorService.constant';
import { IDecoratorService } from './decoratorService.interface';
import { DecoratorServiceService } from './decoratorService.service';
import { RequestHandler } from 'express-serve-static-core';

const createDecoratorService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;
    const result = await DecoratorServiceService.createDecoratorService(
      bookData,
      req?.user?._id
    );

    sendResponse<IDecoratorService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'DecoratorService created successfully!',
      data: result,
    });
  }
);

const getAllDecoratorServices = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await DecoratorServiceService.getAllDecoratorServices(
      filters,
      paginationOptions
    );

    sendResponse<IDecoratorService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'DecoratorService retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleDecoratorService = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await DecoratorServiceService.getSingleDecoratorService(id);

    sendResponse<IDecoratorService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'DecoratorService retrieved successfully !',
      data: result,
    });
  }
);

const updateDecoratorService = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await DecoratorServiceService.updateDecoratorService(
      id,
      updatedData,
      req?.user?._id
    );

    sendResponse<IDecoratorService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'DecoratorService updated successfully !',
      data: result,
    });
  }
);

const deleteDecoratorService = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await DecoratorServiceService.deleteDecoratorService(
      id,
      req?.user?._id
    );

    sendResponse<IDecoratorService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'DecoratorService deleted successfully !',
      data: result,
    });
  }
);

export const DecoratorServiceController = {
  createDecoratorService,
  getAllDecoratorServices,
  getSingleDecoratorService,
  updateDecoratorService,
  deleteDecoratorService,
};
