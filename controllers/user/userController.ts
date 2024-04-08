import {Response} from 'express';
import {IContextRequest, IUserRequest} from '../../types/request';

module.exports = {
  me: async (
    { context: { user } }: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 404
      })
    }

    // const media = await mediaService.findOneByRef({
    //   refType: MediaRefType.User,
    //   refId: user.id
    // })

    // let image
    // if (media) {
    //   image = appUrl(await new Image(media).sharp({ width: 150, height: 150 }))
    // }

    return res.status(200).json({
      data: { ...user.toJSON()},
      message: 'User found',
      status: 200
    })
  },
}