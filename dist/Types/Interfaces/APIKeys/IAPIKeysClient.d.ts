import { APIKeyData, APIKeyResultData, APIKeysQuery, APIKeysResult, MessageResponseWithStatus, RegeneratePublicKeyResult } from '../../Types/index.js';
export interface IAPIKeysClient {
    list(data: APIKeysQuery): Promise<APIKeysResult>;
    create(data: APIKeyData): Promise<APIKeyResultData>;
    destroy(keyId: string): Promise<MessageResponseWithStatus>;
    regeneratePublicKey(): Promise<RegeneratePublicKeyResult>;
}
