import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { RuleFixer } from "@typescript-eslint/utils/dist/ts-eslint";
import { ParamType } from "./parameters";

export function replaceNodes<
  TMessageIds extends string,
  TOptions extends readonly unknown[],
  TParamType extends ParamType
>(
  context: TSESLint.RuleContext<TMessageIds, TOptions>,
  fixer: RuleFixer,
  originalNodes: TParamType[],
  replaceByNodes: TParamType[]
) {
  return replaceByNodes.map((replaceByNode, index) => {
    const replacedNode: TParamType = originalNodes[index];
    let resultText = context.getSourceCode().getText(replaceByNode);

    return fixer.replaceTextRange(
      [replacedNode.range[0], replacedNode.range[1]],
      resultText
    );
  });
}
