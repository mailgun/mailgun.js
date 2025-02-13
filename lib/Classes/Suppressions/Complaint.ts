import { SuppressionModels } from '../../Enums/index.js';
import { IComplaint } from '../../Interfaces/Suppressions/index.js';
import { ComplaintData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';

export default class Complaint extends Suppression implements IComplaint {
    address: string;
    /* eslint-disable camelcase */
    created_at: Date;
    constructor(data: ComplaintData) {
      super(SuppressionModels.COMPLAINTS);
      this.address = data.address;
      this.created_at = new Date(data.created_at);
    }
}
