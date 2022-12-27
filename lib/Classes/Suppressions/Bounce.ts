import { SuppressionModels } from '../../Enums';
import { IBounce } from '../../interfaces/Suppressions';
import { BounceData } from '../../Types/Suppressions';
import Suppression from './Suppression';

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
