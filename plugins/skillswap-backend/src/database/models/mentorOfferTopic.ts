import { Model, ModelObject } from 'objection';

export class MentorOfferTopicModel extends Model {
  static get tableName() {
    return 'mentor_offer_topics';
  }

  id: string;
  topic: string;
  // offers: MentorOfferModel[];

  static get relationMappings() {
    const MentorOfferModel = require('./mentorOffer');

    return {
      offers: {
        relation: Model.ManyToManyRelation,
        modelClass: MentorOfferModel,
        join: {
          from: 'mentor_offer_assigned_topics.topic_id',
          to: 'mentor_offer_assigned_topics.mentor_offer_id',
        },
      },
    };
  }
}

export type MentorOfferTopic = ModelObject<MentorOfferTopicModel>;
