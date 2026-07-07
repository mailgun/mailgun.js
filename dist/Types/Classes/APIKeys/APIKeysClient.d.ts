import { IAPIKeysClient } from '../../Interfaces/index.js';
import { APIKeyData, APIKeyResultData, APIKeysQuery, APIKeysResult, MessageResponseWithStatus, RegeneratePublicKeyResult } from '../../Types/index.js';
import Request from '../common/Request.js';
export default class APIKeysClient implements IAPIKeysClient {
    request: Request;
    private path;
    constructor(request: Request);
    private parseItem;
    private prepareList;
    list(data: APIKeysQuery): Promise<APIKeysResult>;
    create(data: APIKeyData): Promise<APIKeyResultData>;
    destroy(keyId: string): Promise<MessageResponseWithStatus>;
    regeneratePublicKey(): Promise<RegeneratePublicKeyResult>;
}
