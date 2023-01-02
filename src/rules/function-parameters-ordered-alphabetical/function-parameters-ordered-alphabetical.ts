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
  name: "function-parameters-ordered-alphabetical",
  meta: {
    docs: {
      description: "Enforce all method parameters to be ordered alphabetical",
      recommended: "error",
      requiresTypeChecking: false,
    },
    fixable: "code",
    messages: {
      "function-parameters-not-ordered-alphabetical":
        "Function parameters should be in alphabetical order:\n{{ correctOrder }}",
    },
    type: "suggestion",
    schema: {},
  },
  defaultOptions: [],
  create: function (
    context: Readonly<
      TSESLint.RuleContext<
        "function-parameters-not-ordered-alphabetical",
        Options
      >
    >
  ) {
    return {
      CallExpression: (node: TSESTree.CallExpression): void => {
        const nodeCalleeName =
          (node.callee as TSESTree.Identifier).name ??
          (
            (node.callee as TSESTree.MemberExpression)
              .property as TSESTree.Identifier
          ).name;
        if (
          node.arguments.length < 2 ||
          (context.options.length > 0 &&
            context.options[0].excludeFunctions &&
            context.options[0].excludeFunctions.includes(nodeCalleeName)) ||
          node.parent?.type === TSESTree.AST_NODE_TYPES.Decorator
        ) {
          return;
        }
        const sortedParams = sortParams(node.arguments, context.options);
        const paramNames: string[] = functionParamsToNameList(node.arguments);

        const sortedParamNames: string[] =
          functionParamsToNameList(sortedParams);

        const parameterOrderingIsCorrect: boolean = stringListsAreEqual(
          paramNames,
          sortedParamNames
        );

        if (!parameterOrderingIsCorrect) {
          context.report({
            node,
            messageId: "function-parameters-not-ordered-alphabetical",
            data: {
              correctOrder: sortedParamNames.join("\n"),
            },
            fix: (fixer: RuleFixer) =>
              replaceNodes(context, fixer, node.arguments, sortedParams),
          });
        }
      },
      FunctionExpression: (node: TSESTree.FunctionExpression): void => {
        if (
          node.params.length < 2 ||
          node.id === null ||
          (context.options.length > 0 &&
            context.options[0].excludeFunctions &&
            context.options[0].excludeFunctions.includes(node.id.name))
        ) {
          return;
        }
        const sortedParams = sortParams(node.params, context.options);
        const paramNames: string[] = functionParamsToNameList(node.params);

        const sortedParamNames: string[] =
          functionParamsToNameList(sortedParams);

        const parameterOrderingIsCorrect: boolean = stringListsAreEqual(
          paramNames,
          sortedParamNames
        );

        if (!parameterOrderingIsCorrect) {
          context.report({
            node,
            messageId: "function-parameters-not-ordered-alphabetical",
            data: {
              correctOrder: sortedParamNames.join("\n"),
            },
            fix: (fixer: RuleFixer) =>
              replaceNodes(context, fixer, node.params, sortedParams),
          });
        }
      },
      FunctionDeclaration: (node: TSESTree.FunctionDeclaration): void => {
        if (
          node.params.length < 2 ||
          node.id === null ||
          (context.options.length > 0 &&
            context.options[0].excludeFunctions &&
            context.options[0].excludeFunctions.includes(node.id.name))
        ) {
          return;
        }
        const sortedParams = sortParams(node.params, context.options);
        const paramNames: string[] = functionParamsToNameList(node.params);

        const sortedParamNames: string[] =
          functionParamsToNameList(sortedParams);

        const parameterOrderingIsCorrect: boolean = stringListsAreEqual(
          paramNames,
          sortedParamNames
        );

        if (!parameterOrderingIsCorrect) {
          context.report({
            node,
            messageId: "function-parameters-not-ordered-alphabetical",
            data: {
              correctOrder: sortedParamNames.join("\n"),
            },
            fix: (fixer: RuleFixer) =>
              replaceNodes(context, fixer, node.params, sortedParams),
          });
        }
      },
    };
  },
});

export default rule;
