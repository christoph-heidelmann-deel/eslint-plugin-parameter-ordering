import constructorParametersOrderedAlphabetical from "./constructor-parameters-ordered-alphabetical/constructor-parameters-ordered-alphabetical";
import methodParametersOrderedAlphabetical from "./method-parameters-ordered-alphabetical/method-parameters-ordered-alphabetical";
import functionParametersOrderedAlphabetical from "./function-parameters-ordered-alphabetical/function-parameters-ordered-alphabetical";

const allRules = {
  "constructor-parameters-ordered-alphabetical":
    constructorParametersOrderedAlphabetical,
  "function-parameters-ordered-alphabetical":
    functionParametersOrderedAlphabetical,
  "method-parameters-ordered-alphabetical": methodParametersOrderedAlphabetical,
};

export default allRules;
