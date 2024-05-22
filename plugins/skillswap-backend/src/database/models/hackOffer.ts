import { Model, ModelObject } from 'objection';

export enum HackOfferLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export class HackOfferModel extends Model {
  static get tableName() {
    return 'hack_offers';
  }

  id: string;
  author_ref: string;
  title: string;
  description: string;
  level: HackOfferLevel;
  // offers: HackOfferTopicModel[];

  static get relationMappings() {
    const HackOfferTopicModel = require('./hackOfferTopic');
    return {
      offers: {
        relation: Model.ManyToManyRelation,
        modelClass: HackOfferTopicModel,
        join: {
          from: 'hack_offer_assigned_topics.topic_id',
          to: 'hack_offer_assigned_topics.hack_offer_id',
        }
      }
    }
  }
}

export type HackOffer = ModelObject<HackOfferModel>;