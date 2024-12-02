/// <reference types="cypress" />

declare namespace Chai {
  interface Assertion {
    jsonSchema(schema: any): Assertion;
  }
}
