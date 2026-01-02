import { BounceClassificationQueryData, BounceClassificationResult } from '../../Types/index.js';
export interface IBounceClassificationClient {
    list(data: BounceClassificationQueryData): Promise<BounceClassificationResult>;
}
