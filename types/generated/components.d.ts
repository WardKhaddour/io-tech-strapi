import type { Schema, Struct } from '@strapi/strapi';

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Reusable link';
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    url: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Reusable social link';
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<
      ['twitter', 'linkedin', 'facebook', 'instagram', 'youtube']
    >;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.link': SharedLink;
      'shared.social-link': SharedSocialLink;
    }
  }
}
