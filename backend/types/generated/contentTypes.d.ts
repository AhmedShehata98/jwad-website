import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsComment extends Schema.CollectionType {
  collectionName: 'comments_comment';
  info: {
    tableName: 'plugin-comments-comments';
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: 'Comment content type';
    kind: 'collectionType';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text & Attribute.Required;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockReason: Attribute.String;
    authorUser: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    authorId: Attribute.String;
    authorName: Attribute.String;
    authorEmail: Attribute.Email;
    authorAvatar: Attribute.String;
    isAdminComment: Attribute.Boolean;
    removed: Attribute.Boolean;
    approvalStatus: Attribute.String;
    related: Attribute.String;
    reports: Attribute.Relation<
      'plugin::comments.comment',
      'oneToMany',
      'plugin::comments.comment-report'
    >;
    threadOf: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::comments.comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsCommentReport extends Schema.CollectionType {
  collectionName: 'comments_comment-report';
  info: {
    tableName: 'plugin-comments-reports';
    singularName: 'comment-report';
    pluralName: 'comment-reports';
    displayName: 'Reports';
    description: 'Reports content type';
    kind: 'collectionType';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text;
    reason: Attribute.Enumeration<['BAD_LANGUAGE', 'DISCRIMINATION', 'OTHER']> &
      Attribute.Required &
      Attribute.DefaultTo<'OTHER'>;
    resolved: Attribute.Boolean & Attribute.DefaultTo<false>;
    related: Attribute.Relation<
      'plugin::comments.comment-report',
      'manyToOne',
      'plugin::comments.comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: Attribute.Text;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppMetaAppMeta extends Schema.SingleType {
  collectionName: 'app_metas';
  info: {
    singularName: 'app-meta';
    pluralName: 'app-metas';
    displayName: 'app_meta';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    social_media_meta: Attribute.Component<'shared.meta-social', true>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-meta.app-meta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-meta.app-meta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'articles';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text;
    content: Attribute.Blocks;
    thumbnail: Attribute.Media<'images'>;
    article_category: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'api::article-category.article-category'
    >;
    publisher: Attribute.Relation<
      'api::article.article',
      'manyToOne',
      'api::publisher.publisher'
    >;
    description: Attribute.Text;
    tags: Attribute.Component<'article.tags', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleCategoryArticleCategory
  extends Schema.CollectionType {
  collectionName: 'article_categories';
  info: {
    singularName: 'article-category';
    pluralName: 'article-categories';
    displayName: 'article_category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    normalized_name: Attribute.String;
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article-category.article-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article-category.article-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleCommentArticleComment extends Schema.CollectionType {
  collectionName: 'article_comments';
  info: {
    singularName: 'article-comment';
    pluralName: 'article-comments';
    displayName: 'article_comments';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comments: Attribute.JSON &
      Attribute.CustomField<'plugin::comments.comments'>;
    message: Attribute.Text & Attribute.Required;
    article_id: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<-1>;
    thread_of: Attribute.String;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    approvalStatus: Attribute.Enumeration<['APPROVED', 'REJECTED', 'PENDING']> &
      Attribute.DefaultTo<'PENDING'>;
    author: Attribute.Component<'article-comments.article-comment-author'>;
    replay: Attribute.Component<'article-comments.comment'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article-comment.article-comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article-comment.article-comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleViewArticleView extends Schema.CollectionType {
  collectionName: 'article_views';
  info: {
    singularName: 'article-view';
    pluralName: 'article-views';
    displayName: 'article-views';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    article: Attribute.Relation<
      'api::article-view.article-view',
      'oneToOne',
      'api::article.article'
    >;
    visits: Attribute.Component<'article.article-visit', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article-view.article-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article-view.article-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.SingleType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    chipText: Attribute.String;
    heading: Attribute.Text;
    pagination_btn: Attribute.DynamicZone<['button.standard-button']>;
    description: Attribute.Text;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBlogMetaBlogMeta extends Schema.SingleType {
  collectionName: 'blog_metadata';
  info: {
    singularName: 'blog-meta';
    pluralName: 'blog-metadata';
    displayName: 'blog_metadata';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    seo: Attribute.Component<'shared.seo'>;
    meta_social: Attribute.Component<'shared.meta-social'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-meta.blog-meta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-meta.blog-meta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogViewBlogView extends Schema.CollectionType {
  collectionName: 'blog_views';
  info: {
    singularName: 'blog-view';
    pluralName: 'blog-views';
    displayName: 'blog_views';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    guest_ip: Attribute.String & Attribute.Required & Attribute.Unique;
    country: Attribute.String;
    city: Attribute.String;
    time_zone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-view.blog-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-view.blog-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsultantContentListConsultantContentList
  extends Schema.CollectionType {
  collectionName: 'consultant_content_lists';
  info: {
    singularName: 'consultant-content-list';
    pluralName: 'consultant-content-lists';
    displayName: 'consultant_content_list';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.Text;
    extras: Attribute.Text;
    consultant_filter: Attribute.Relation<
      'api::consultant-content-list.consultant-content-list',
      'oneToOne',
      'api::consultant-filter.consultant-filter'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consultant-content-list.consultant-content-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consultant-content-list.consultant-content-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConsultantFilterConsultantFilter
  extends Schema.CollectionType {
  collectionName: 'consultant_filters';
  info: {
    singularName: 'consultant-filter';
    pluralName: 'consultant-filters';
    displayName: 'consultant_filter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    normalized: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::consultant-filter.consultant-filter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::consultant-filter.consultant-filter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactUsContactUs extends Schema.SingleType {
  collectionName: 'contact_uses';
  info: {
    singularName: 'contact-us';
    pluralName: 'contact-uses';
    displayName: 'contact_us';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    send: Attribute.DynamicZone<['button.action-btn']>;
    contact_list_heading: Attribute.String;
    form_heading: Attribute.String;
    section_id: Attribute.String;
    contact_list: Attribute.Component<'contact-us.contact-us-contact', true>;
    social_media: Attribute.Component<'link.advanced-link', true>;
    contact_form: Attribute.Component<'components.input', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact-us.contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFacebookPixelConfigFacebookPixelConfig
  extends Schema.SingleType {
  collectionName: 'facebook_pixel_configs';
  info: {
    singularName: 'facebook-pixel-config';
    pluralName: 'facebook-pixel-configs';
    displayName: 'facebook_pixel_config';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pixel_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::facebook-pixel-config.facebook-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::facebook-pixel-config.facebook-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    logo: Attribute.Media<'images'>;
    subheading: Attribute.Text;
    secondHeading: Attribute.String;
    thirdHeading: Attribute.String;
    forthHeading: Attribute.String;
    ad: Attribute.Component<'footer.ad'>;
    navigation_links: Attribute.Component<'footer.footer-nav-links', true>;
    social_media: Attribute.Component<'link.advanced-link', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFrequentlyQuestionFrequentlyQuestion
  extends Schema.SingleType {
  collectionName: 'frequently_questions';
  info: {
    singularName: 'frequently-question';
    pluralName: 'frequently-questions';
    displayName: 'frequently_question';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::frequently-question.frequently-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::frequently-question.frequently-question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFrequentlyQuestionListFrequentlyQuestionList
  extends Schema.CollectionType {
  collectionName: 'frequently_question_lists';
  info: {
    singularName: 'frequently-question-list';
    pluralName: 'frequently-question-lists';
    displayName: 'frequently_question_list';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.Text;
    answer: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::frequently-question-list.frequently-question-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::frequently-question-list.frequently-question-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Schema.SingleType {
  collectionName: 'headers';
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    logo: Attribute.Media<'images'>;
    cta_btn: Attribute.DynamicZone<['link.advanced-link']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderbarHeaderbar extends Schema.CollectionType {
  collectionName: 'headerbars';
  info: {
    singularName: 'headerbar';
    pluralName: 'headerbars';
    displayName: 'navlinks';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    navlink: Attribute.String;
    href: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::headerbar.headerbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::headerbar.headerbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeroMarketingServiceHeroMarketingService
  extends Schema.SingleType {
  collectionName: 'hero_marketing_services';
  info: {
    singularName: 'hero-marketing-service';
    pluralName: 'hero-marketing-services';
    displayName: 'marketing_services';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.String;
    link: Attribute.DynamicZone<['link.hero-descover-link']>;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hero-marketing-service.hero-marketing-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hero-marketing-service.hero-marketing-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeroSectionHeroSection extends Schema.SingleType {
  collectionName: 'hero_sections';
  info: {
    singularName: 'hero-section';
    pluralName: 'hero-sections';
    displayName: 'hero_section';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    image: Attribute.Media<'images'>;
    discovery_link: Attribute.DynamicZone<
      ['link.hero-descover-link', 'button.action-btn']
    >;
    section_id: Attribute.String;
    video: Attribute.Media<'videos'>;
    video_title: Attribute.String;
    sales_image: Attribute.Media<'images'>;
    our_team_image: Attribute.Media<'images'>;
    heading_pattern_image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hero-section.hero-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hero-section.hero-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeroServiceHeroService extends Schema.CollectionType {
  collectionName: 'hero_services';
  info: {
    singularName: 'hero-service';
    pluralName: 'hero-services';
    displayName: 'hero_service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.String;
    icon: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hero-service.hero-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hero-service.hero-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeroStatisticHeroStatistic extends Schema.CollectionType {
  collectionName: 'hero_statistics';
  info: {
    singularName: 'hero-statistic';
    pluralName: 'hero-statistics';
    displayName: 'hero_statistic';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.String;
    color: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hero-statistic.hero-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hero-statistic.hero-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLogoLogo extends Schema.SingleType {
  collectionName: 'logos';
  info: {
    singularName: 'logo';
    pluralName: 'logos';
    displayName: 'logo';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    logo: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::logo.logo', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::logo.logo', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMarketingConsultantMarketingConsultant
  extends Schema.SingleType {
  collectionName: 'marketing_consultants';
  info: {
    singularName: 'marketing-consultant';
    pluralName: 'marketing-consultants';
    displayName: 'marketing_consultant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subheading: Attribute.String;
    blocks: Attribute.DynamicZone<['layout.marketing-consultant']>;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::marketing-consultant.marketing-consultant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::marketing-consultant.marketing-consultant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMarketingConsultantGoalMarketingConsultantGoal
  extends Schema.CollectionType {
  collectionName: 'marketing_consultant_goals';
  info: {
    singularName: 'marketing-consultant-goal';
    pluralName: 'marketing-consultant-goals';
    displayName: 'marketing_consultant_goal';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    option: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::marketing-consultant-goal.marketing-consultant-goal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::marketing-consultant-goal.marketing-consultant-goal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.SingleType {
  collectionName: 'partners';
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: 'partner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnersListPartnersList extends Schema.CollectionType {
  collectionName: 'partners_lists';
  info: {
    singularName: 'partners-list';
    pluralName: 'partners-lists';
    displayName: 'partners_list';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partners-list.partners-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partners-list.partners-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPortfolioPortfolio extends Schema.SingleType {
  collectionName: 'portfolios';
  info: {
    singularName: 'portfolio';
    pluralName: 'portfolios';
    displayName: 'portfolio';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    button: Attribute.DynamicZone<['button.action-btn']>;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPortfolioCategoriePortfolioCategorie
  extends Schema.CollectionType {
  collectionName: 'portfolio_categories';
  info: {
    singularName: 'portfolio-categorie';
    pluralName: 'portfolio-categories';
    displayName: 'portfolio_category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    normalize: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::portfolio-categorie.portfolio-categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::portfolio-categorie.portfolio-categorie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPortfolioListPortfolioList extends Schema.CollectionType {
  collectionName: 'portfolio_lists';
  info: {
    singularName: 'portfolio-list';
    pluralName: 'portfolio-lists';
    displayName: 'portfolio_list';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.DynamicZone<['link.hero-descover-link']>;
    image: Attribute.Media<'images', true>;
    video: Attribute.Media<'videos'>;
    category: Attribute.String;
    video_thumbnail: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::portfolio-list.portfolio-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::portfolio-list.portfolio-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPublisherPublisher extends Schema.CollectionType {
  collectionName: 'publishers';
  info: {
    singularName: 'publisher';
    pluralName: 'publishers';
    displayName: 'publisher';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    articles: Attribute.Relation<
      'api::publisher.publisher',
      'oneToMany',
      'api::article.article'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::publisher.publisher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::publisher.publisher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSnapchatPixelConfigSnapchatPixelConfig
  extends Schema.SingleType {
  collectionName: 'snapchat_pixel_configs';
  info: {
    singularName: 'snapchat-pixel-config';
    pluralName: 'snapchat-pixel-configs';
    displayName: 'snapchat_pixel_config';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pixel_id: Attribute.String;
    user_email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::snapchat-pixel-config.snapchat-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::snapchat-pixel-config.snapchat-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    username: Attribute.String;
    rating: Attribute.Integer &
      Attribute.SetMinMax<
        {
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<5>;
    title: Attribute.String;
    review: Attribute.Text;
    userImage: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonialSectionTestimonialSection
  extends Schema.SingleType {
  collectionName: 'testimonial_sections';
  info: {
    singularName: 'testimonial-section';
    pluralName: 'testimonial-sections';
    displayName: 'testimonial_section';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subheading: Attribute.Text;
    section_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial-section.testimonial-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial-section.testimonial-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTiktokPixelConfigTiktokPixelConfig
  extends Schema.SingleType {
  collectionName: 'tiktok_pixel_configs';
  info: {
    singularName: 'tiktok-pixel-config';
    pluralName: 'tiktok-pixel-configs';
    displayName: 'tiktok_pixel_config';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pixel_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tiktok-pixel-config.tiktok-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tiktok-pixel-config.tiktok-pixel-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUpperbarUpperbar extends Schema.SingleType {
  collectionName: 'upperbars';
  info: {
    singularName: 'upperbar';
    pluralName: 'upperbars';
    displayName: 'upperbar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_phone: Attribute.String;
    working_days: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::upperbar.upperbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::upperbar.upperbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUpperbarSocialUpperbarSocial extends Schema.CollectionType {
  collectionName: 'upperbar_socials';
  info: {
    singularName: 'upperbar-social';
    pluralName: 'upperbar-socials';
    displayName: 'upperbar_social';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
    icon: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::upperbar-social.upperbar-social',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::upperbar-social.upperbar-social',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiYourDreamProjectYourDreamProject extends Schema.SingleType {
  collectionName: 'your_dream_projects';
  info: {
    singularName: 'your-dream-project';
    pluralName: 'your-dream-projects';
    displayName: 'Your_dream_project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    link: Attribute.DynamicZone<['link.hero-descover-link']>;
    image: Attribute.Media<'images'>;
    section_id: Attribute.String;
    pattern_image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::your-dream-project.your-dream-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::your-dream-project.your-dream-project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::comments.comment': PluginCommentsComment;
      'plugin::comments.comment-report': PluginCommentsCommentReport;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::app-meta.app-meta': ApiAppMetaAppMeta;
      'api::article.article': ApiArticleArticle;
      'api::article-category.article-category': ApiArticleCategoryArticleCategory;
      'api::article-comment.article-comment': ApiArticleCommentArticleComment;
      'api::article-view.article-view': ApiArticleViewArticleView;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-meta.blog-meta': ApiBlogMetaBlogMeta;
      'api::blog-view.blog-view': ApiBlogViewBlogView;
      'api::consultant-content-list.consultant-content-list': ApiConsultantContentListConsultantContentList;
      'api::consultant-filter.consultant-filter': ApiConsultantFilterConsultantFilter;
      'api::contact-us.contact-us': ApiContactUsContactUs;
      'api::facebook-pixel-config.facebook-pixel-config': ApiFacebookPixelConfigFacebookPixelConfig;
      'api::footer.footer': ApiFooterFooter;
      'api::frequently-question.frequently-question': ApiFrequentlyQuestionFrequentlyQuestion;
      'api::frequently-question-list.frequently-question-list': ApiFrequentlyQuestionListFrequentlyQuestionList;
      'api::header.header': ApiHeaderHeader;
      'api::headerbar.headerbar': ApiHeaderbarHeaderbar;
      'api::hero-marketing-service.hero-marketing-service': ApiHeroMarketingServiceHeroMarketingService;
      'api::hero-section.hero-section': ApiHeroSectionHeroSection;
      'api::hero-service.hero-service': ApiHeroServiceHeroService;
      'api::hero-statistic.hero-statistic': ApiHeroStatisticHeroStatistic;
      'api::logo.logo': ApiLogoLogo;
      'api::marketing-consultant.marketing-consultant': ApiMarketingConsultantMarketingConsultant;
      'api::marketing-consultant-goal.marketing-consultant-goal': ApiMarketingConsultantGoalMarketingConsultantGoal;
      'api::partner.partner': ApiPartnerPartner;
      'api::partners-list.partners-list': ApiPartnersListPartnersList;
      'api::portfolio.portfolio': ApiPortfolioPortfolio;
      'api::portfolio-categorie.portfolio-categorie': ApiPortfolioCategoriePortfolioCategorie;
      'api::portfolio-list.portfolio-list': ApiPortfolioListPortfolioList;
      'api::publisher.publisher': ApiPublisherPublisher;
      'api::snapchat-pixel-config.snapchat-pixel-config': ApiSnapchatPixelConfigSnapchatPixelConfig;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::testimonial-section.testimonial-section': ApiTestimonialSectionTestimonialSection;
      'api::tiktok-pixel-config.tiktok-pixel-config': ApiTiktokPixelConfigTiktokPixelConfig;
      'api::upperbar.upperbar': ApiUpperbarUpperbar;
      'api::upperbar-social.upperbar-social': ApiUpperbarSocialUpperbarSocial;
      'api::your-dream-project.your-dream-project': ApiYourDreamProjectYourDreamProject;
    }
  }
}
