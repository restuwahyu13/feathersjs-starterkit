import { TObject, Type, getValidator } from '@feathersjs/typebox'
import { validateData } from '@feathersjs/schema'

import { Injectable } from '~/helpers/di.helper'
import { addFormatsValidator } from '~/libs/ajv.lib'
import { ETodosPriority } from './todos.enum'

@Injectable()
export class TodosValidator {
  private static todosCreateSchema: TObject = Type.Object(
    {
      title: Type.String(),
      priority: Type.Enum(ETodosPriority),
      content: Type.String()
    },
    { $id: 'create', additionalProperties: false }
  )

  todosCreateValidator(): any {
    return validateData(getValidator(TodosValidator.todosCreateSchema, addFormatsValidator))
  }
}
