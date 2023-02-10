import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour {
  @Prop()
  transport: string;

  @Prop({ required: true, max: 5 })
  maxPeopleCount: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);