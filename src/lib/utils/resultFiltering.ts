import { ModelConfig } from "../types";

// Maybe this should return true for non-list relations only?
export function shouldFilterDeletedFromReadResult(
  params: { args: any },
  config: ModelConfig
): boolean {
  const deletedFieldValue = config.createValue(false);
  return (
    !params.args.where ||
    typeof params.args.where[config.field] === "undefined" ||
    params.args.where[config.field] === deletedFieldValue
  );
}

export function filterSoftDeletedResults(result: any, config: ModelConfig) {
  const deletedFieldValue = config.createValue(false);

  // filter out deleted records from array results
  if (result && Array.isArray(result)) {
    return result.filter(
      (item) =>
        item[config.field] === undefined ||
        item[config.field] === deletedFieldValue
    );
  }

  // if the result is deleted return null
  if (result && result[config.field] !== deletedFieldValue) {
    return null;
  }

  return result;
}
