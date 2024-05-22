import { Router } from 'express';
import { HackOfferModel } from '../database/models/hackOffer';
import { HttpAuthService, LoggerService, UserInfoService } from '@backstage/backend-plugin-api';

export const getHackOffersRouter = (props: {
  httpAuth: HttpAuthService;
  userInfo: UserInfoService;
  logger: LoggerService;
}) => {
  const { httpAuth, userInfo, logger } = props;

  const router = Router();

  router.post('/hack-offers', async (req, res) => {
    const credentials = await httpAuth.credentials(req);
    const user = await userInfo.getUserInfo(credentials);

    const hackOffer = await HackOfferModel.query()
      .insert({
        author_ref: user.userEntityRef,
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
      });

    logger.info(`Created Hack Offer ${req.body.title} with id ${hackOffer.id}`);

    res.status(201).json(hackOffer);
  });

  router.get('/hack-offers/:id', async (req, res) => {
    const hackOffer = await HackOfferModel.query()
      .select('*')
      .where('id', req.params.id)
      .first();

    if (!hackOffer) {
      res.status(404).json({ message: 'Hack Offer not found' });
      return;
    }

    res.json(hackOffer);
  });

  router.put('/hack-offers/:id', async (req, res) => {
    const credentials = await httpAuth.credentials(req);
    const user = await userInfo.getUserInfo(credentials);

    const hackOffer = await HackOfferModel.query()
      .update({
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
      })
      .where('id', req.params.id)
      .andWhere('author_ref', user.userEntityRef);
  
    if (!hackOffer) {
      res.status(404).json({ message: 'Hack Offer not found' });
      return;
    }

    logger.info(`Updated Hack Offer ${req.body.title} with id ${req.params.id}`);
  
    res.json(hackOffer);
  });
  
  router.delete('/hack-offers/:id', async (req, res) => {
    const credentials = await httpAuth.credentials(req);
    const user = await userInfo.getUserInfo(credentials);

    const hackOffer = await HackOfferModel.query()
      .delete()
      .where('id', req.params.id)
      .andWhere('author_ref', user.userEntityRef);
  
    if (!hackOffer) {
      res.status(404).json({ message: 'Hack Offer not found' });
      return;
    }

    logger.info(`Deleted Hack Offer with id ${req.params.id}`);
  
    res.json({ message: 'Hack Offer deleted' });
  });  

  return router;
}
