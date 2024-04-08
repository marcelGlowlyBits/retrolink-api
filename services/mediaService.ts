import {ClientSession, ObjectId, Model} from 'mongoose';

import {Media} from '../models';

enum MediaRefType {
  User = 'User'
}


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


export const mediaService = {
  getById: (mediaId: ObjectId) => Media.findById(mediaId),

  findOneByRef: ({
    refType,
    refId
  }: {
    refType: MediaRefType
    refId: ObjectId
  }) => Media.findOne({ refType, refId }),

  findManyByRef: ({
    refType,
    refId
  }: {
    refType: MediaRefType
    refId: ObjectId
  }) => Media.find({ refType, refId }),

  create: (
    {
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size
    }: CreateMediaPayload,
    session?: ClientSession
  ) =>
    new Media({
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size
    }).save({ session }),

  updateById: (
    mediaId: ObjectId,
    { refType, refId }: UpdateMediaPayload,
    session?: ClientSession
  ) => {
    const data = [{ _id: mediaId }, { refType, refId }]

    let params = null

    if (session) {
      params = [...data, { session }]
    } else {
      params = data
    }

    return Media.updateOne(...params)
  },

  deleteById: (mediaId: ObjectId, session?: ClientSession) =>
    Media.deleteOne({ _id: mediaId }, { session }),

  deleteManyByRef: (
    {
      refType,
      refId
    }: {
      refType: MediaRefType
      refId: ObjectId
    },
    session?: ClientSession
  ) => Media.deleteMany({ refType, refId }, { session })
}