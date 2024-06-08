export enum DataPublishTopic {
  BASE = 'api',
  RECENT = 'recent',
  ID = 'id',
  REQUEST = 'request',

  REQUEST_TOPIC = `${DataPublishTopic.BASE}/+/${DataPublishTopic.REQUEST}`,
}