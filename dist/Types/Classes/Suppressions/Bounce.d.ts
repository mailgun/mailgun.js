import { IBounce } from '../../Interfaces/Suppressions/index.js';
import { BounceData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';
export default class Bounce extends Suppression implements IBounce {
    address: string;
    code: number;
    error: string;
    created_at: Date;
    constructor(data: BounceData);
}
