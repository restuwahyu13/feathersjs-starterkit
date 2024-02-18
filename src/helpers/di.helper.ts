import { Application } from '@feathersjs/express'
import { HookContext } from '@feathersjs/feathers'
import { autoInjectable, inject, injectAll, injectWithTransform, registry, container, delay } from 'tsyringe'
export { Router } from 'express'

export type Handler = (app: Application) => void
export type HandlerContext = (ctx: HookContext) => HookContext
export const Injectable = autoInjectable
export const Service = autoInjectable
export const Model = autoInjectable
export const Middleware = autoInjectable
export const Inject = inject
export const InjectAll = injectAll
export const InjectTransform = injectWithTransform
export const Module = registry
export const Delay = delay
export const Container = container
