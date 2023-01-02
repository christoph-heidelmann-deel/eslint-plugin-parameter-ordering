import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    "https://github.com/heidelmann91/eslint-parameter-ordering/blob/main/README.md"
);
