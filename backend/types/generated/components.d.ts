import type { Schema, Struct } from '@strapi/strapi';

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
      'tutor-language.fields': TutorLanguageFields;
    }
  }
}
