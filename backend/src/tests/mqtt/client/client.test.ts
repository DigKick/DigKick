import { expect, test } from "bun:test";
import { BasicTerm } from "../../../mqtt/util/basicTerm";
import { TeamColor } from "../../../models/team";
import { DkMqttClient } from "../../../mqtt/client/client";

const dkMqttClient = DkMqttClient.getInstance();

const matchingTopicsWithoutWildcards: [string, string][] = [
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}`,
  ],
  [`${BasicTerm.TABLE}/register`, `${BasicTerm.TABLE}/register`],
];

const nonMatchingTopicsWithoutWildcards: [string, string][] = [
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}`,
    `${BasicTerm.TABLE}/${BasicTerm.TEAM}`,
  ],
  [`${BasicTerm.TABLE}/register`, `${BasicTerm.TABLE}/`],
];

const matchingTopicsWithPlusWildcards: [string, string][] = [
  [
    `${BasicTerm.TABLE}/+/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/+`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/+/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/+`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
];

const matchingTopicsWithHashtagWildcards: [string, string][] = [
  [
    `${BasicTerm.TABLE}/#/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/#`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
  [
    `${BasicTerm.TABLE}/#`,
    `${BasicTerm.TABLE}/test/${BasicTerm.TEAM}/${TeamColor.WHITE}/${BasicTerm.BUTTON}/0`,
  ],
];

test("test valid topic matcher - topics with out wildcards", () => {
  matchingTopicsWithoutWildcards.forEach((topicPair) => {
    expect(dkMqttClient.matchTopic(topicPair[0], topicPair[1])).toBeTrue();
  });
});

test("test invalid topic matcher - topics with out wildcards", () => {
  nonMatchingTopicsWithoutWildcards.forEach((topicPair) => {
    expect(dkMqttClient.matchTopic(topicPair[0], topicPair[1])).toBeFalse();
  });
});

test("test invalid topic matcher - topics with + wildcard", () => {
  matchingTopicsWithPlusWildcards.forEach((topicPair) => {
    expect(dkMqttClient.matchTopic(topicPair[0], topicPair[1])).toBeTrue();
  });
});

test("test invalid topic matcher - topics with # wildcard", () => {
  matchingTopicsWithHashtagWildcards.forEach((topicPair) => {
    expect(dkMqttClient.matchTopic(topicPair[0], topicPair[1])).toBeTrue();
  });
});
