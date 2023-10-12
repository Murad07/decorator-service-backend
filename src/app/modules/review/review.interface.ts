import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IDecoratorService } from '../decoratorService/decoratorService.interface';

export type IReview = {
  decoratorService: Types.ObjectId | IDecoratorService; // reference _id
  reviewBy: Types.ObjectId | IUser; // reference _id
  reviewText: string;
  rating: number;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
