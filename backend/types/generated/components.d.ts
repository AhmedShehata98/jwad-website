import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface LinkHeroDescoverLink extends Schema.Component {
  collectionName: 'components_link_hero_descover_links';
  info: {
    displayName: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    url: Attribute.Text;
    snapchat_event: Attribute.String;
    fb_event: Attribute.String;
    tiktok_event: Attribute.String;
  };
}

export interface LinkAdvancedLink extends Schema.Component {
  collectionName: 'components_link_advanced_links';
  info: {
    displayName: 'advanced-link';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
    icon: Attribute.Media<'images'>;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<true>;
    snapchat_event: Attribute.String;
    fb_event: Attribute.String;
    tiktok_event: Attribute.String;
  };
}

export interface LayoutMarketingConsultant extends Schema.Component {
  collectionName: 'components_layout_marketing_consultants';
  info: {
    displayName: 'marketing_consultant';
  };
  attributes: {
    heading: Attribute.Text;
    subheading: Attribute.Text;
    image: Attribute.Media<'images'>;
  };
}

export interface FormInput extends Schema.Component {
  collectionName: 'components_form_inputs';
  info: {
    displayName: 'input';
  };
  attributes: {
    label: Attribute.String;
    placeholder: Attribute.String;
    type: Attribute.String;
  };
}

export interface FooterFooterNavLinks extends Schema.Component {
  collectionName: 'components_footer_footer_nav_links';
  info: {
    displayName: 'footer_nav_links';
  };
  attributes: {
    heading: Attribute.String;
    links: Attribute.Component<'link.hero-descover-link', true>;
  };
}

export interface FooterAd extends Schema.Component {
  collectionName: 'components_footer_ads';
  info: {
    displayName: 'ad';
  };
  attributes: {
    heading: Attribute.String;
    icon: Attribute.Media<'images'>;
  };
}

export interface ContactUsContactUsContact extends Schema.Component {
  collectionName: 'components_contact_us_contact_us_contacts';
  info: {
    displayName: 'contact_us_contact';
  };
  attributes: {
    heading: Attribute.String;
    value: Attribute.String;
  };
}

export interface ButtonActionBtn extends Schema.Component {
  collectionName: 'components_button_action_btns';
  info: {
    displayName: 'action_btn';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    snapchat_event: Attribute.String;
    fb_event: Attribute.String;
    tiktok_event: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.seo': SharedSeo;
      'shared.meta-social': SharedMetaSocial;
      'link.hero-descover-link': LinkHeroDescoverLink;
      'link.advanced-link': LinkAdvancedLink;
      'layout.marketing-consultant': LayoutMarketingConsultant;
      'form.input': FormInput;
      'footer.footer-nav-links': FooterFooterNavLinks;
      'footer.ad': FooterAd;
      'contact-us.contact-us-contact': ContactUsContactUsContact;
      'button.action-btn': ButtonActionBtn;
    }
  }
}
