import { IUnsubscribe, UnsubscribeData } from '../../interfaces/Suppressions';
import Suppression from './Suppression';
export default class Unsubscribe extends Suppression implements IUnsubscribe {
    address: string;
    tags: string[];
    created_at: Date;
    constructor(data: UnsubscribeData);
}
