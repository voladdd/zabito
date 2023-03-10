import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, StatusDocument } from '../schemas/status.schema';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name)
    private statusModel: Model<StatusDocument>,
  ) {}

  async findAll(): Promise<Status[]> {
    return await this.statusModel.find();
  }
}
