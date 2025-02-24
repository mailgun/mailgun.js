import { SuppressionModels } from '../../Enums/index.js';
import { IBounce } from '../../Interfaces/Suppressions/index.js';
import { BounceData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';

export default class Bounce extends Suppression implements IBounce {
    address: string;
    code: number;
    error: string;
    /* eslint-disable camelcase */
    created_at: Date;

    constructor(data: BounceData) {
      super(SuppressionModels.BOUNCES);
      this.address = data.address;
      this.code = +data.code;
      this.error = data.error;
      this.created_at = new Date(data.created_at);
    }
}
