import { SuppressionModels } from '../../Enums/index.js';
import { IUnsubscribe } from '../../Interfaces/Suppressions/index.js';
import { UnsubscribeData } from '../../Types/Suppressions/index.js';

import Suppression from './Suppression.js';

export default class Unsubscribe extends Suppression implements IUnsubscribe {
    address: string;
    tags: string[];
    /* eslint-disable camelcase */
    created_at: Date;

    constructor(data: UnsubscribeData) {
      super(SuppressionModels.UNSUBSCRIBES);
      this.address = data.address;
      this.tags = data.tags;
      this.created_at = new Date(data.created_at);
    }
}
