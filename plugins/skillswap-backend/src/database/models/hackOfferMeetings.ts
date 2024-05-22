import { Model, ModelObject } from 'objection';
import { HackOfferModel } from './hackOffer';

export class HackOfferMeetingModel extends Model {
  static get tableName() {
    return 'hack_offer_meetings';
  }

  id: string;
  start_date: Date;
  end_date: Date;
  location: string;
  hack_offer: HackOfferModel;

  static relationMappings = {
    hack_offer: {
      relation: Model.BelongsToOneRelation,
      modelClass: HackOfferModel,
      join: {
        from: 'hack_offer_meetings.hack_offer_id',
        to: 'hack_offers.id'
      }
    }
  };
}

export type HackOfferMeeting = ModelObject<HackOfferMeetingModel>;
