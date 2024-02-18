import { TObject, Type, getValidator } from '@feathersjs/typebox'
import { validateData } from '@feathersjs/schema'

import { Injectable } from '~/helpers/di.helper'
import { addFormatsValidator } from '~/libs/ajv.lib'

@Injectable()
export class TodosValidator {
  private static todosCreateSchema: TObject = Type.Object(
    {
      title: Type.String(),
      content: Type.String()
    },
    { $id: 'create', additionalProperties: false }
  )

  todosCreateValidator(): any {
    return validateData(getValidator(TodosValidator.todosCreateSchema, addFormatsValidator))
  }
}
