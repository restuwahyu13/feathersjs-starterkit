import { FormatsPluginOptions, addFormats } from '@feathersjs/schema'
import Ajv from 'ajv'

import { logger } from '~/libs/winston.lib'

const formats: FormatsPluginOptions = [
  'date',
  'time',
  'date-time',
  'duration',
  'uri',
  'uri-reference',
  'uri-template',
  'url',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'regex',
  'uuid',
  'json-pointer',
  'json-pointer-uri-fragment',
  'relative-json-pointer',
  'byte',
  'int32',
  'int64',
  'float',
  'double',
  'password',
  'binary'
]

export const addFormatsValidator = addFormats(
  new Ajv({ strict: true, strictSchema: true, logger: logger, parseDate: true, validateSchema: true }),
  formats
)
