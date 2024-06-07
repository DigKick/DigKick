import {expect, test} from "bun:test";
import {Obj2StringParser} from "../../../src/mqtt/util/obj2stringParser.ts";

const testObj = {string: "hallo", number: 1, bool: true, float: 1.2, char: 'a'}
const testObjStr = '{"string":"hallo","number":1,"bool":true,"float":1.2,"char":"a"}'
const testArr = [structuredClone(testObj), structuredClone(testObj)]
const testArrStr = `[${testObjStr},${testObjStr}]`

test('parse object to str', () => {
  const parsedStr = Obj2StringParser.objectToString(testObj)

  expect(parsedStr).toEqual(testObjStr)
})

test('parse array to str', () => {
  const parsedStr = Obj2StringParser.objectToString(testArr)

  expect(parsedStr).toEqual(testArrStr)
})
