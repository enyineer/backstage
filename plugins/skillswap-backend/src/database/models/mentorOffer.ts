import { Model, ModelObject } from 'objection';

export class MentorOfferModel extends Model {
  static get tableName() {
    return 'mentor_offers';
  }

  id: string;
  author_ref: string;
  title: string;
  description: string;
  // topics: MentorOfferTopicModel[];

  static get relationMappings() {
    const MentorOfferTopicModel = require('./mentorOfferTopic');
    
    return {
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: MentorOfferTopicModel,
        join: {
          from: 'mentor_offer_assigned_topics.mentor_offer_id',
          to: 'mentor_offer_assigned_topics.topic_id',
        },
      },
    };
  }
}

export type MentorOffer = ModelObject<MentorOfferModel>;
