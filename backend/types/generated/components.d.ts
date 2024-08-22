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
    description: '';
  };
  attributes: {
    message: Attribute.Text;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    approvalStatus: Attribute.Enumeration<['APPROVED', 'REJECTED', 'PENDING']> &
      Attribute.DefaultTo<'PENDING'>;
    author: Attribute.Component<'article-comments.article-comment-author'>;
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

export interface ComponentsCoordination extends Schema.Component {
  collectionName: 'components_components_coordinations';
  info: {
    displayName: 'coordination';
    description: '';
  };
  attributes: {
    latitude: Attribute.String;
    longitude: Attribute.String;
  };
}

export interface ButtonStandardButton extends Schema.Component {
  collectionName: 'components_button_standard_buttons';
  info: {
    displayName: 'standard-button';
  };
  attributes: {
    label: Attribute.String;
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

export interface BlogArticleId extends Schema.Component {
  collectionName: 'components_blog_article_ids';
  info: {
    displayName: 'article_Id';
  };
  attributes: {
    identifier: Attribute.String;
  };
}

export interface ArticleCommentsComment extends Schema.Component {
  collectionName: 'components_article_comments_comments';
  info: {
    displayName: 'comment';
    description: '';
  };
  attributes: {
    message: Attribute.Text;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    approvalStatus: Attribute.Enumeration<['APPROVED', 'REJECTED', 'PENDING']> &
      Attribute.DefaultTo<'PENDING'>;
    author: Attribute.Component<'article-comments.article-comment-author'>;
    replay_at: Attribute.DateTime;
  };
}

export interface ArticleCommentsArticleCommentAuthor extends Schema.Component {
  collectionName: 'components_article_comments_article_comment_authors';
  info: {
    displayName: 'article-comment-author';
  };
  attributes: {
    author_id: Attribute.String;
    email: Attribute.String;
    phone: Attribute.String;
    full_name: Attribute.String;
  };
}

export interface ArticleArticleVisit extends Schema.Component {
  collectionName: 'components_article_article_visits';
  info: {
    displayName: 'article-visit';
  };
  attributes: {
    ip_address: Attribute.String;
    city: Attribute.String;
    country: Attribute.String;
    time_zone: Attribute.String;
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
      'components.coordination': ComponentsCoordination;
      'button.standard-button': ButtonStandardButton;
      'button.action-btn': ButtonActionBtn;
      'blog.article-id': BlogArticleId;
      'article-comments.comment': ArticleCommentsComment;
      'article-comments.article-comment-author': ArticleCommentsArticleCommentAuthor;
      'article.article-visit': ArticleArticleVisit;
    }
  }
}
