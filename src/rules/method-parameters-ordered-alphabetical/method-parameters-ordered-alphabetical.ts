import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { RuleFixer } from "@typescript-eslint/utils/dist/ts-eslint";
import {
  functionParamsToNameList,
  getParameterName,
  Options,
  sortParams,
  stringListsAreEqual,
} from "../../utils/parameters";
import { createRule } from "../../utils/create-rule";
import { replaceNodes } from "../../utils/rule-fixer";

const rule = createRule({
  name: "method-parameters-ordered-alphabetical",
  meta: {
    docs: {
      description: "Enforce all method parameters to be ordered alphabetical",
      recommended: "error",
      requiresTypeChecking: false,
    },
    fixable: "code",
    messages: {
      "method-parameters-not-ordered-alphabetical":
        "Method parameters should be in alphabetical order:\n{{ correctOrder }}",
    },
    type: "suggestion",
    schema: {},
  },
  defaultOptions: [],
  create: function (
    context: Readonly<
      TSESLint.RuleContext<
        "method-parameters-not-ordered-alphabetical",
        Options
      >
    >
  ) {
    return {
      "ClassBody > MethodDefinition": (
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

        const paramNames: string[] = functionParamsToNameList(
          node.value.params
        );

        const sortedParamNames: string[] =
          functionParamsToNameList(sortedParams);

        const parameterOrderingIsCorrect: boolean = stringListsAreEqual(
          paramNames,
          sortedParamNames
        );

        if (!parameterOrderingIsCorrect) {
          context.report({
            node,
            messageId: "method-parameters-not-ordered-alphabetical",
            data: {
              correctOrder: sortedParamNames.join("\n"),
            },
            fix: (fixer: RuleFixer) =>
              replaceNodes(context, fixer, node.value.params, sortedParams),
          });
        }
      },
    };
  },
});

export default rule;
