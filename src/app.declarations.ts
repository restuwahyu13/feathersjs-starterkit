// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import { HookContext as FeathersHookContext } from '@feathersjs/feathers'
import { Application as FeathersApplication } from '@feathersjs/express'

import { TodosService } from '~/domains/todos/todos.service'

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {
  todos: TodosService
}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes>

// The context for hook functions - can be typed with a service class
export type HookContext<T = any> = FeathersHookContext<Application, T>
