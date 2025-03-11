import { Prisma } from "@prisma/client";

export type ModelConfig = {
  fields: string[];
  createUpdates: (
    deleted: boolean
  ) => Record<ModelConfig["fields"][number], any>;
  allowToOneUpdates?: boolean;
  allowCompoundUniqueIndexWhere?: boolean;
};

export type Config = {
  models: Partial<Record<Prisma.ModelName, ModelConfig | boolean>>;
  defaultConfig?: ModelConfig;
};
