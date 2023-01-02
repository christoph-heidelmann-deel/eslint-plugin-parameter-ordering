import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "./function-parameters-ordered-alphabetical";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("function-parameters-ordered-alphabetical", rule, {
  valid: [
    {
      options: rule.defaultOptions,
      code: `
  function test( a: string, b: string) {}`,
    },
  ],
  invalid: [
    {
      options: rule.defaultOptions,
      code: `
  function test(c: string,
      a: string,
      b: string
  ) {}`,
      output: `
  function test(a: string,
      b: string,
      c: string
  ) {}`,
      errors: [
        {
          messageId: "function-parameters-not-ordered-alphabetical",
        },
      ],
    },
    {
      options: rule.defaultOptions,
      code: `
  function test(
              c: string,
              a: string,
              b: string
  ) {}`,
      output: `
  function test(
              a: string,
              b: string,
              c: string
  ) {}`,
      errors: [
        {
          messageId: "function-parameters-not-ordered-alphabetical",
        },
      ],
    },
  ],
});
