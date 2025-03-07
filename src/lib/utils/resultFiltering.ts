import { ModelConfig } from "../types";
import {
  hasAnyConfigField,
  hasAnyConfigFieldNonDeletedValue,
} from "./hasAnyConfigField";

// Maybe this should return true for non-list relations only?
export function shouldFilterDeletedFromReadResult(
  params: { args: any },
  config: ModelConfig
): boolean {
  return (
    !params.args.where ||
    !hasAnyConfigField(params.args.where, config.fields) ||
    hasAnyConfigFieldNonDeletedValue(params.args.where, config)
  );
}

export function filterSoftDeletedResults(result: any, config: ModelConfig) {
  // filter out deleted records from array results
  if (result && Array.isArray(result)) {
    return result.filter(
      (item) =>
        !hasAnyConfigField(item, config.fields) ||
        hasAnyConfigFieldNonDeletedValue(item, config)
    );
  }

  // if the result is deleted return null
  if (result && !hasAnyConfigFieldNonDeletedValue(result, config)) {
    return null;
  }

  return result;
}
