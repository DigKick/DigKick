import { RequestPayloadType } from '../../../../src/mqtt/global/publishing/payloads/requestPayload.ts';
import { expect, test } from 'bun:test';
import { RequestPayloadParser } from '../../../../src/mqtt/global/publishing/payloads/requestPayloadParser.ts';

const unparsedByIdPayload = {
  type: RequestPayloadType.BY_ID,
  id: 1,
};

const unparsedByIdInvalidPayload = {
  type: RequestPayloadType.BY_ID,
  idNumber: 1,
};

const unparsedByTimeSpanPayload = {
  type: RequestPayloadType.BY_TIME,
  from: new Date(),
  to: new Date(),
};

const unparsedByTimeSpanInvalidPayload = {
  type: RequestPayloadType.BY_TIME,
  from: new Date(),
  to: new Date(),
  amount: 420,
};

const unparsedByRecentPayload = {
  type: RequestPayloadType.BY_RECENT,
  amount: 100,
};

const unparsedByRecentInvalidPayload = {
  type: RequestPayloadType.BY_RECENT,
  amount: 'test',
};

test('parse valid payload to by id', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByIdPayload),
  ).not.toThrow();
  const parsedPayload =
    RequestPayloadParser.parseRequestPayload(unparsedByIdPayload);
  expect(parsedPayload.type).toEqual(RequestPayloadType.BY_ID);
});

test('parse invalid payload to by id', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByIdInvalidPayload),
  ).toThrow();
});

test('parse valid payload to by time span', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByTimeSpanPayload),
  ).not.toThrow();
  const parsedPayload = RequestPayloadParser.parseRequestPayload(
    unparsedByTimeSpanPayload,
  );
  expect(parsedPayload.type).toEqual(RequestPayloadType.BY_TIME);
});

test('parse invalid payload to by time span', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByTimeSpanInvalidPayload),
  ).toThrow();
});

test('parse valid payload to by recent', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByRecentPayload),
  ).not.toThrow();
  const parsedPayload = RequestPayloadParser.parseRequestPayload(
    unparsedByRecentPayload,
  );
  expect(parsedPayload.type).toEqual(RequestPayloadType.BY_RECENT);
});

test('parse invalid payload by recent', () => {
  expect(() =>
    RequestPayloadParser.parseRequestPayload(unparsedByRecentInvalidPayload),
  ).toThrow();
});
