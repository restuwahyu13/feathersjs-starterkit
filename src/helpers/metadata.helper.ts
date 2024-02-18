import { Application } from '@feathersjs/express'
import { Injectable, Container } from '~/helpers/di.helper'

@Injectable()
export class Metadata {
  feathers: Application = Container.resolve<Application>('FeathersMetadata')
}
