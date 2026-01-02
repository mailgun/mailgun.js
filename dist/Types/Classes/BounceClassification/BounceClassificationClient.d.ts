import Request from '../common/Request.js';
import { IBounceClassificationClient } from '../../Interfaces/index.js';
import { BounceClassificationQueryData, BounceClassificationResult } from '../../Types/index.js';
export default class BounceClassificationClient implements IBounceClassificationClient {
    request: Request;
    constructor(request: Request);
    private prepareDate;
    private parseQuery;
    private parseResponse;
    list(queryData: BounceClassificationQueryData): Promise<BounceClassificationResult>;
}
