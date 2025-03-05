/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import { CustomFile, CustomFileData } from '../../Types/index.js';
import { AttachmentInfo, StreamValue } from '../../Types/Common/Attachments.js';
declare class BlobFromStream {
    private _stream;
    size: number;
    constructor(stream: Readable, size: number);
    stream(): Readable;
    get [Symbol.toStringTag](): string;
}
declare class AttachmentsHandler {
    private getAttachmentOptions;
    private getFileInfo;
    private getCustomFileInfo;
    private getBufferInfo;
    isStream(data: unknown): data is StreamValue;
    isCustomFile(obj: unknown): obj is CustomFile;
    isBrowserFile(obj: unknown): obj is File;
    isBuffer(data: unknown): data is Buffer;
    getAttachmentInfo(attachment: CustomFile | File | string | CustomFileData): AttachmentInfo;
    convertToFDexpectedShape(userProvidedValue: CustomFile | File | string | CustomFileData): string | Blob | Buffer | NodeJS.ReadableStream | (CustomFile & StreamValue);
    getBlobFromStream(stream: Readable, size: number): BlobFromStream;
}
export default AttachmentsHandler;
