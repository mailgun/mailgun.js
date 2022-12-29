import { SuppressionModels } from '../../Enums';
import { IWhiteList } from '../../Interfaces/Suppressions';
import { WhiteListData } from '../../Types/Suppressions';
import Suppression from './Suppression';

export default class WhiteList extends Suppression implements IWhiteList {
    value: string;
    reason: string;
    createdAt: Date;

    constructor(data: WhiteListData) {
      super(SuppressionModels.WHITELISTS);
      this.value = data.value;
      this.reason = data.reason;
      this.createdAt = new Date(data.createdAt);
    }
}
