import { Model, ModelObject } from 'objection';

export class HackOfferTopicModel extends Model {
  static get tableName() {
    return 'hack_offer_topics';
  }

  id: string;
  topic: string;
  // offers: HackOfferModel[];

  static get relationMappings() {
    const HackOfferModel = require('./hackOffer');

    return {
      offers: {
        relation: Model.ManyToManyRelation,
        modelClass: HackOfferModel,
        join: {
          from: 'hack_offer_assigned_topics.hack_offer_id',
          to: 'hack_offer_assigned_topics.topic_id',
        }
      }
    }
  }
}

export type HackOfferTopic = ModelObject<HackOfferTopicModel>;
