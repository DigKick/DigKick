import {beforeEach, expect, mock, test} from "bun:test";
import {DkModelHandler, HandlerType,} from "../../../src/mqtt/abstract/dkModelHandler.ts";
import {Table} from "../../../src/models/table.ts";
import type {EventMapper} from "../../../src/mqtt/abstract/eventMapper.ts";

enum TestEvent {
  EVENT_1 = "EVENT_1",
  EVENT_2 = "EVENT_2",
  EVENT_3 = "EVENT_3",
}

class TestEventMapper implements EventMapper<TestEvent> {
  private readonly _testObj: TestClass;

  constructor(testObj: TestClass) {
    this._testObj = testObj;
  }

  map(event: TestEvent) {
    let triggeredEvents = [event];

    switch (event) {
      case TestEvent.EVENT_1:
        this._testObj.lastEvent = TestEvent.EVENT_1;
        break;
      case TestEvent.EVENT_2:
        this._testObj.lastEvent = TestEvent.EVENT_2;
        break;
      case TestEvent.EVENT_3:
        this._testObj.lastEvent = TestEvent.EVENT_3;
        break;
      default:
        this._testObj.lastEvent = "default";
        break;
    }

    return new Set(triggeredEvents);
  }
}

class TestClass {
  lastEvent: string;

  constructor() {
    this.lastEvent = "init";
  }
}

class TestHandler extends DkModelHandler<TestEvent, TestClass> {
  constructor(testObj: TestClass) {
    super(testObj, HandlerType.ABSTRACT, new Table("TEST"));
    this._mapper = new TestEventMapper(testObj);
  }
}

let emptyMockFunc = mock();
let testHandler: TestHandler = new TestHandler(new TestClass());
let testObjCb: TestClass = new TestClass();

const testCallback = (testObj: TestClass) => {
  testObjCb = testObj;
};

const subscribeObserverAndTriggerEvent = (event: TestEvent) => {
  testHandler.subscribe(event, testCallback);
  testHandler.triggerEvent(event);
};

const subscribeMockAndTriggerEvent = (event: TestEvent) => {
  testHandler.subscribe(event, emptyMockFunc);
  testHandler.triggerEvent(event);
};

beforeEach(() => {
  testHandler = new TestHandler(new TestClass());
  testObjCb = new TestClass();
  emptyMockFunc = mock();
});

test(`test trigger all events`, () => {
  Object.values(TestEvent).forEach((event: TestEvent) => {
    if (!event.includes(".")) {
      // sort out values
      return;
    }
    subscribeMockAndTriggerEvent(event);
    expect(emptyMockFunc.mock.calls.length).toBe(1);
    emptyMockFunc = mock();
  });
});

test(`test event 1 callback`, () => {
  subscribeObserverAndTriggerEvent(TestEvent.EVENT_1);

  expect(testObjCb.lastEvent).toEqual(TestEvent.EVENT_1);
});

test(`test event 2 callback`, () => {
  subscribeObserverAndTriggerEvent(TestEvent.EVENT_2);

  expect(testObjCb.lastEvent).toEqual(TestEvent.EVENT_2);
});

test(`test event 3 callback`, () => {
  subscribeObserverAndTriggerEvent(TestEvent.EVENT_3);

  expect(testObjCb.lastEvent).toEqual(TestEvent.EVENT_3);
});
