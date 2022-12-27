import { SuppressionModels } from '../../Enums';
import { IComplaint } from '../../interfaces/Suppressions';
import { ComplaintData } from '../../Types/Suppressions';
import Suppression from './Suppression';

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
