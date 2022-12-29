import { IComplaint } from '../../Interfaces/Suppressions';
import { ComplaintData } from '../../Types/Suppressions';
import Suppression from './Suppression';
export default class Complaint extends Suppression implements IComplaint {
    address: string;
    created_at: Date;
    constructor(data: ComplaintData);
}
