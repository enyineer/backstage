import { Model, ModelObject } from 'objection';

export enum HackOfferMeetingAttendeeStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export class HackOfferMeetingAttendeeModel extends Model {
  static get tableName() {
    return 'hack_offer_meeting_attendees';
  }

  id: string;
  attendee_ref: string;
  status: HackOfferMeetingAttendeeStatus;
  // hack_offer_meeting: HackOfferMeetingModel;

  static get relationMappings() {
    const HackOfferMeetingModel = require('./hackOfferMeeting');
    return {
      hack_offer_meeting: {
        relation: Model.BelongsToOneRelation,
        modelClass: HackOfferMeetingModel,
        join: {
          from: 'hack_offer_meeting_attendees.hack_offer_meeting_id',
          to: 'hack_offer_meetings.id'
        }
      }
    }
  };
}

export type HackOfferMeetingAttendee = ModelObject<HackOfferMeetingAttendeeModel>;