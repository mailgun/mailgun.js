import { BounceData, IBounce } from '../../interfaces/Suppressions';
import Suppression from './Suppression';
export default class Bounce extends Suppression implements IBounce {
    address: string;
    code: number;
    error: string;
    created_at: Date;
    constructor(data: BounceData);
}
