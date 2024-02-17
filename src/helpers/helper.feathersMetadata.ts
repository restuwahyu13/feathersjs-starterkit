import { Application } from '@feathersjs/express'
import { Injectable, Container } from '~/helpers/helper.di'

@Injectable()
export class FeathersMetadata {
  metadata: Application = Container.resolve<Application>('FeathersMetadata')
}
