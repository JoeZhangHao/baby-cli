import EventEmitter from 'events';
import { logger } from '@baby-cli/shared';

export default class BaseClass extends EventEmitter {
  static commandInstallFlag: boolean;
  constructor() {
    super();
    this.on('error', (e) => {
      logger.error('onError', e);
      process.exit(1);
    });
  }
}
