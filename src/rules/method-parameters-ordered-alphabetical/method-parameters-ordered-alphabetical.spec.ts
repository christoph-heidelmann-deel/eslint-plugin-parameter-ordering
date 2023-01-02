import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "./method-parameters-ordered-alphabetical";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("method-parameters-ordered-alphabetical", rule, {
  valid: [
    {
      options: rule.defaultOptions,
      code: `
class A {
  test( a: string, b: string) {}
}`,
    },
  ],
  invalid: [
    {
      options: rule.defaultOptions,
      code: `
class A {
  test(c: string,
      a: string,
      b: string
  ) {}
}`,
      output: `
class A {
  test(a: string,
      b: string,
      c: string
  ) {}
}`,
      errors: [
        {
          messageId: "method-parameters-not-ordered-alphabetical",
        },
      ],
    },
    {
      options: rule.defaultOptions,
      code: `
class A {
  test(
              c: string,
              a: string,
              b: string
  ) {}
}`,
      output: `
class A {
  test(
              a: string,
              b: string,
              c: string
  ) {}
}`,
      errors: [
        {
          messageId: "method-parameters-not-ordered-alphabetical",
        },
      ],
    },
  ],
});
