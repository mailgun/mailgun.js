import { IWhiteList } from '../../Interfaces/Suppressions/index.js';
import { WhiteListData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';
export default class WhiteList extends Suppression implements IWhiteList {
    value: string;
    reason: string;
    createdAt: Date;
    constructor(data: WhiteListData);
}
