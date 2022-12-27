import { ComplaintData, IComplaint } from '../../interfaces/Suppressions';
import Suppression from './Suppression';
export default class Complaint extends Suppression implements IComplaint {
    address: string;
    created_at: Date;
    constructor(data: ComplaintData);
}
