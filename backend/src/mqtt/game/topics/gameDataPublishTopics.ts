import {DataPublishTopic} from "../../global/publishing/dataPublishTopic.ts";
import {BasicTerm} from "../../util/basicTerm.ts";

export enum GameDataPublishTopics {
  BASE = `/${DataPublishTopic.BASE}/${BasicTerm.GAME}`,
  RECENT = `${GameDataPublishTopics.BASE}/${DataPublishTopic.RECENT}`,
  ID = `${GameDataPublishTopics.BASE}/${DataPublishTopic.ID}`,
  REQUESTED = `${GameDataPublishTopics.BASE}/${DataPublishTopic.REQUESTED}`,
}