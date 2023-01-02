import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { RuleFixer } from "@typescript-eslint/utils/dist/ts-eslint";
import {
  functionParamsToNameList,
  Options,
  sortParams,
  stringListsAreEqual,
} from "../../utils/parameters";
import { createRule } from "../../utils/create-rule";
import { replaceNodes } from "../../utils/rule-fixer";

const rule = createRule({
  name: "constructor-parameters-ordered-alphabetical",
  meta: {
    docs: {
      description:
        "Enforce all constructor parameters to be ordered alphabetical",
      recommended: "error",
      requiresTypeChecking: false,
    },
    fixable: "code",
    messages: {
      "constructor-parameters-not-ordered-alphabetical":
        "Constructor parameters should be in alphabetical order:\n{{ correctOrder }}",
    },
    type: "suggestion",
    schema: {},
  },
  defaultOptions: [],
  create: (
    context: Readonly<
      TSESLint.RuleContext<
        "constructor-parameters-not-ordered-alphabetical",
        Options
      >
    >
  ) => ({
    "ClassBody > MethodDefinition[kind='constructor']": (
      node: TSESTree.MethodDefinition
    ): void => {
      if (
        node.value.params.length < 2 ||
        node.value.id === null ||
        (context.options.length > 0 &&
          context.options[0].excludeFunctions &&
          context.options[0].excludeFunctions.includes(node.value.id.name))
      ) {
        return;
      }

      const sortedParams = sortParams(node.value.params, context.options);

      const paramNames: string[] = functionParamsToNameList(node.value.params);

      const sortedParamNames: string[] = functionParamsToNameList(sortedParams);

      const parameterOrderingIsCorrect: boolean = stringListsAreEqual(
        paramNames,
        sortedParamNames
      );

      if (!parameterOrderingIsCorrect) {
        context.report({
          node,
          messageId: "constructor-parameters-not-ordered-alphabetical",
          data: {
            correctOrder: sortedParamNames.join("\n"),
          },
          fix: (fixer: RuleFixer) =>
            replaceNodes(context, fixer, node.value.params, sortedParams),
        });
      }
    },
  }),
});

export default rule;
