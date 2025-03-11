import { ModelConfig } from "../types";

export function addDeletedToSelect<T extends { args?: any }>(
  params: T,
  config: ModelConfig
): T {
  if (params.args.select) {
    return {
      ...params,
      args: {
        ...params.args,
        select: {
          ...params.args.select,
          ...config.fields.reduce<{ [key: string]: boolean }>((acc, field) => {
            acc[field] = true;
            return acc;
          }, {}),
        },
      },
    };
  }

  return params;
}

export function stripDeletedFieldFromResults(
  results: any,
  config: ModelConfig
) {
  if (Array.isArray(results)) {
    results?.forEach((item: any) => {
      config.fields.forEach((field) => {
        delete item[field];
      });
    });
  } else if (results) {
    config.fields.forEach((field) => {
      delete results[field];
    });
  }

  return results;
}
