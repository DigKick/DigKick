import { DataPublishTopic } from '../../global/publishing/dataPublishTopic.ts';
import { BasicTerm } from '../../util/basicTerm.ts';

export enum GameDataPublishTopics {
  BASE = `${DataPublishTopic.BASE}/${BasicTerm.GAME}`,
  RECENT = `${GameDataPublishTopics.BASE}/${DataPublishTopic.RECENT}`,
  REQUESTED = `${GameDataPublishTopics.BASE}/${DataPublishTopic.REQUEST}`,
}
