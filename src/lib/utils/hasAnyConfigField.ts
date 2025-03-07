import { ModelConfig } from "../types";

export const hasAnyConfigField = (
  obj: any,
  configFields: string[]
): boolean => {
  // Account for where and select fields
  return configFields.some((f) => obj?.[f] !== undefined || obj?.[f] === true);
};

export const hasAnyConfigFieldNonDeletedValue = (
  obj: any,
  config: ModelConfig
): boolean => {
  const nonDeletedFieldValue = config.createUpdates(false);
  return config.fields.some((f) => nonDeletedFieldValue[f] === obj?.[f]);
};
