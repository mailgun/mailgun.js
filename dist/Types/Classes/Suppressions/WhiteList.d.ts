import { IWhiteList } from '../../Interfaces/Suppressions';
import { WhiteListData } from '../../Types/Suppressions';
import Suppression from './Suppression';
export default class WhiteList extends Suppression implements IWhiteList {
    value: string;
    reason: string;
    createdAt: Date;
    constructor(data: WhiteListData);
}
