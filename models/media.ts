import {Schema, model} from 'mongoose';
import { Model, ObjectId } from 'mongoose'

export interface IMedia {
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  orderColumn?: number
  refType?: string
  refId?: ObjectId
}

export type CreateMediaPayload = Omit<
  IMedia,
  'refId' | 'refType' | 'orderColumn'
>

export type UpdateMediaPayload = Pick<IMedia, 'refId' | 'refType'>

export type MediaModel = Model<IMedia>

const schema = new Schema<IMedia, MediaModel>(
  {
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    orderColumn: {
      type: Number,
      default: 0
    },
    refType: String,
    refId: { type: Schema.Types.ObjectId }
  },
  { timestamps: true }
)

export const Media = model<IMedia, MediaModel>('Media', schema)