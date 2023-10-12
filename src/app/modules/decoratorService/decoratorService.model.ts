import { Schema, model } from 'mongoose';
import {
  IDecoratorService,
  DecoratorServiceModel,
} from './decoratorService.interface';
import { category, location } from './decoratorService.constant';

export const DecoratorServiceSchema = new Schema<
  IDecoratorService,
  DecoratorServiceModel
>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: category,
    },
    location: {
      type: String,
      enum: location,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const DecoratorService = model<IDecoratorService, DecoratorServiceModel>(
  'DecoratorService',
  DecoratorServiceSchema
);
