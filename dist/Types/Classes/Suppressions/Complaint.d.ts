import { IComplaint } from '../../Interfaces/Suppressions/index.js';
import { ComplaintData } from '../../Types/Suppressions/index.js';
import Suppression from './Suppression.js';
export default class Complaint extends Suppression implements IComplaint {
    address: string;
    created_at: Date;
    constructor(data: ComplaintData);
}
