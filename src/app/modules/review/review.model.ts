import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

export const ReviewSchema = new Schema<IReview, ReviewModel>(
  {
    decoratorService: {
      type: Schema.Types.ObjectId,
      ref: 'DecoratorService',
      required: true,
    },
    reviewBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
