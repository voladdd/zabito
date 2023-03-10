import {
  QueryGetProfileToursDto,
  sortDateBy,
} from './dto/query-get-profile-tours.dto';
import { Tour, TourDocument } from './../tours/schemas/tour.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findByTgId(tgId: number): Promise<User | null> {
    const user = await this.userModel.findOne({ tgId });
    return user;
  }

  async findById(id: Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getProfile(id: Types.ObjectId) {
    return await this.userModel.findOne({ _id: id });
  }

  async getProfileTours(id: Types.ObjectId, query?: QueryGetProfileToursDto) {
    //define default sort values in case if they are empty
    const limit = 10;
    const page = query.page || 1;
    const sort = query.sort || sortDateBy.desc;

    return await this.tourModel
      .find(
        query.status
          ? {
              participants: id,
              status: query.status,
            }
          : {
              participants: id,
            },
      )
      .sort({ createdAt: sort })
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();
  }
}
