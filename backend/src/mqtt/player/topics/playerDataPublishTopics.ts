import { DataPublishTopic } from '../../global/publishing/dataPublishTopic.ts';
import { BasicTerm } from '../../util/basicTerm.ts';

export enum PlayerDataPublishTopics {
  BASE = `${DataPublishTopic.BASE}/${BasicTerm.PLAYER}`,
  RECENT = `${PlayerDataPublishTopics.BASE}/${DataPublishTopic.RECENT}`,
  REQUESTED = `${PlayerDataPublishTopics.BASE}/${DataPublishTopic.REQUEST}`,
  ALL = `${PlayerDataPublishTopics.BASE}/${DataPublishTopic.ALL}`,
}
