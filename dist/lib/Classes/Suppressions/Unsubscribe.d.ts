import { IUnsubscribe } from '../../Interfaces/Suppressions';
import { UnsubscribeData } from '../../Types/Suppressions';
import Suppression from './Suppression';
export default class Unsubscribe extends Suppression implements IUnsubscribe {
    address: string;
    tags: string[];
    created_at: Date;
    constructor(data: UnsubscribeData);
}
