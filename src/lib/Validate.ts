import Ajv, { JSONSchemaType } from 'ajv';

const _aliasItemDefSchema = {
  $id: '/aliasItemDef',
  definitions: {
    id: {
      type: 'number',
      nullable: false,
    },
    name: {
      type: 'string',
      nullable: false,
    },
    value: {
      type: 'string',
      nullable: false,
    },
  },
};

const _aliasItemDataSchema: JSONSchemaType<AliasData> = {
  type: 'array',
  minItems: 0,
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: { $ref: '/aliasItemDef#/definitions/id' },
      name: { $ref: '/aliasItemDef#/definitions/name' },
      value: { $ref: '/aliasItemDef#/definitions/value' },
    },
    required: ['id', 'name', 'value'],
  },
};

const validateAliasData = (data: AliasData): boolean => {
  const ajv = new Ajv();

  const validate = ajv
    .addSchema(_aliasItemDefSchema)
    .compile(_aliasItemDataSchema);
  return validate(data) ? true : false;
};

const isIdInAliasData = (data: AliasData, id: Id): boolean => {
  return data.some((dat: AliasItem) => {
    return dat.id === id;
  });
};

export { validateAliasData, isIdInAliasData };
