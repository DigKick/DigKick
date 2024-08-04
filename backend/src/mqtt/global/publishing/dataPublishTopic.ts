export enum DataPublishTopic {
  BASE = 'api',
  ALL = 'all',
  RECENT = 'recent',
  ID = 'id',
  REQUEST = 'request',

  REQUEST_TOPIC = `/${DataPublishTopic.BASE}/+/${DataPublishTopic.REQUEST}`,
}
