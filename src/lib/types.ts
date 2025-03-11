import { Prisma } from "@prisma/client";

export type ModelConfig<FIELD extends string = string> = {
  field: FIELD;
  createUpdates: (
    deleted: boolean
  ) => ({ [key: string]: any } & { [key in FIELD]: any }) | Record<FIELD, null>;
  allowToOneUpdates?: boolean;
  allowCompoundUniqueIndexWhere?: boolean;
};

export type Config<FIELD extends string = string> = {
  models: Partial<Record<Prisma.ModelName, ModelConfig<FIELD> | boolean>>;
  defaultConfig?: ModelConfig<FIELD>;
};
