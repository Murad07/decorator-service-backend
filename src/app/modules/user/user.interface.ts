/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

export type IUser = {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
};
