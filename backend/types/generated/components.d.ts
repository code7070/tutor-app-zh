import type { Schema, Struct } from '@strapi/strapi';

export interface ScheduleSessionDateTime extends Struct.ComponentSchema {
  collectionName: 'components_schedule_session_date_times';
  info: {
    description: '';
    displayName: 'session-date-time';
    icon: 'bulletList';
  };
  attributes: {
    date: Schema.Attribute.Date;
    time: Schema.Attribute.Component<'schedule.session-time', true>;
  };
}

export interface ScheduleSessionTime extends Struct.ComponentSchema {
  collectionName: 'components_schedule_session_times';
  info: {
    description: '';
    displayName: 'session-time';
    icon: 'bulletList';
  };
  attributes: {};
}

export interface TutorLanguageFields extends Struct.ComponentSchema {
  collectionName: 'components_tutor_language_fields';
  info: {
    description: '';
    displayName: 'Fields';
    icon: 'bulletList';
  };
  attributes: {
    language: Schema.Attribute.Enumeration<
      [
        'English',
        'Indonesia',
        'Chinese (Mandarin)',
        'France',
        'Japanese',
        'Spain',
        'Korean',
      ]
    >;
    proficiency: Schema.Attribute.Enumeration<
      ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'schedule.session-date-time': ScheduleSessionDateTime;
      'schedule.session-time': ScheduleSessionTime;
      'tutor-language.fields': TutorLanguageFields;
    }
  }
}
