import { TSESTree } from "@typescript-eslint/utils";

export type ParamType = TSESTree.Parameter | TSESTree.CallExpressionArgument;
export type Options = {
  highPriorityWords: Record<string, number>;
  excludeFunctions: string[];
}[];

export function getParameterName(param: ParamType): string {
  if (param.type === TSESTree.AST_NODE_TYPES.TSParameterProperty) {
    if (param.parameter.type === TSESTree.AST_NODE_TYPES.Identifier) {
      return param.parameter.name;
    }
  }

  return (param as any).name as string;
}

export function stringListsAreEqual(current: string[], expected: string[]) {
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== expected[i]) {
      return false;
    }
  }
  return true;
}

export function functionParamsToNameList(params: ParamType[]) {
  return params.map((param) => {
    return getParameterName(param);
  });
}

export function sortParams<T extends ParamType>(
  params: T[],
  options: Options
): ParamType[] {
  let sortedNodes: T[] = [...params];
  let sortedHighPriorityNodes: T[] = [];
  if (options.length > 0) {
    const nonHighPriorityNodes: T[] = [];
    const highPriorityNodes = sortedNodes.flatMap(
      (value, index): { value: T; priority: number }[] => {
        const paramName = getParameterName(value);
        for (let key of Object.keys(options[0].highPriorityWords)) {
          if (paramName.includes(key)) {
            nonHighPriorityNodes.splice(index, 1);
            return [
              {
                priority: options[0].highPriorityWords[key],
                value: value,
              },
            ];
          }
        }
        nonHighPriorityNodes.push(value);
        return [];
      }
    );

    sortedHighPriorityNodes = highPriorityNodes
      .sort((a, b) => {
        return a.priority - b.priority;
      })
      .map((value) => {
        return value.value;
      });

    sortedNodes = nonHighPriorityNodes;
  }

  sortedNodes.sort((a, b) => {
    return getParameterName(a).localeCompare(getParameterName(b));
  });

  sortedNodes = [...sortedHighPriorityNodes, ...sortedNodes];

  return sortedNodes;
}
