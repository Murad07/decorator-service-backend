import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IDecoratorService = {
  title: string;
  category: 'Sound' | 'Light' | 'Interior' | 'Studio' | 'Others';
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';
  addedBy: Types.ObjectId | IUser; // reference _id
  serviceImage?: string;
};

export type DecoratorServiceModel = Model<
  IDecoratorService,
  Record<string, unknown>
>;

export type IDecoratorServiceFilters = {
  searchTerm?: string;
  title?: string;
  category?: string;
  location?: string;
};
