import { IUnsubscribe } from '../../Interfaces/Suppressions/index.js';
import { UnsubscribeData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';
export default class Unsubscribe extends Suppression implements IUnsubscribe {
    address: string;
    tags: string[];
    created_at: Date;
    constructor(data: UnsubscribeData);
}
