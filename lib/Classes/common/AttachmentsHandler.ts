import { Readable } from 'stream';
import { CustomFile, CustomFileData } from '../../Types';
import APIError from './Error';
import { AttachmentInfo, StreamValue } from '../../Types/Common/Attachments';

class BlobFromStream {
  private _stream: Readable
  size: number

  constructor(stream: Readable, size: number) {
    this._stream = stream;
    this.size = size;
  }

  stream() {
    return this._stream;
  }

  get [Symbol.toStringTag]() {
    return 'Blob';
  }
}

class AttachmentsHandler {
  private getAttachmentOptions(item: {
    filename?: string;
    contentType? : string;
    knownLength?: number;
  }): AttachmentInfo {
    const {
      filename,
      contentType,
      knownLength,
    } = item;
    return {
      ...(filename ? { filename } : { filename: 'file' }),
      ...(contentType && { contentType }),
      ...(knownLength && { knownLength })
    };
  }

  private getFileInfo(file: File) { // browser compliant file
    const {
      name: filename,
      type: contentType,
      size: knownLength,
    } = file;
    return this.getAttachmentOptions({ filename, contentType, knownLength });
  }

  private getCustomFileInfo(file: CustomFile) { // custom created file
    const {
      filename,
      contentType,
      knownLength,
    } = file;
    return this.getAttachmentOptions({ filename, contentType, knownLength });
  }

  private getBufferInfo(buffer: Buffer) {
    const {
      byteLength: knownLength,
    } = buffer;
    return this.getAttachmentOptions({ filename: 'file', contentType: '', knownLength });
  }

  public isStream(data: unknown) : data is StreamValue {
    return typeof data === 'object' && typeof (data as StreamValue).pipe === 'function';
  }

  public isCustomFile(obj: unknown): obj is CustomFile {
    return typeof obj === 'object'
      && !!(obj as CustomFile).data;
  }

  public isBrowserFile(obj: unknown): obj is File {
    return typeof obj === 'object' && (!!(obj as File).name || (typeof Blob !== 'undefined' && obj instanceof Blob));
  }

  public isBuffer(data: unknown): data is Buffer {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(data);
  }

  public getAttachmentInfo(
    attachment: CustomFile | File | string | CustomFileData
  ): AttachmentInfo {
    const isBrowserFile = this.isBrowserFile(attachment);
    const isCustomFile = this.isCustomFile(attachment);
    const isString = typeof attachment === 'string';
    if (!isString) {
      if (isBrowserFile) {
        return this.getFileInfo(attachment as File);
      }
      if (typeof Buffer !== 'undefined' && Buffer.isBuffer(attachment)) {
        return this.getBufferInfo(attachment as Buffer);
      }
      if (isCustomFile) {
        return this.getCustomFileInfo(attachment as CustomFile);
      }
    }

    const options: AttachmentInfo = {
      filename: 'file',
      contentType: undefined,
      knownLength: undefined
    };
    return options;
  }

  public convertToFDexpectedShape(
    userProvidedValue: CustomFile | File | string | CustomFileData
  ) {
    const isStream = this.isStream(userProvidedValue);
    const isBrowserFile = this.isBrowserFile(userProvidedValue);
    const isCustomFile = this.isCustomFile(userProvidedValue);
    const isString = typeof userProvidedValue === 'string';
    let result;
    if (isStream || isString || isBrowserFile || this.isBuffer(userProvidedValue)) {
      result = userProvidedValue;
    } else if (isCustomFile) {
      result = userProvidedValue.data;
    } else {
      throw APIError.getUserDataError(
        `Unknown attachment type ${typeof userProvidedValue}`,
        `The "attachment" property expects either Buffer, Blob, or String.
          Also, It is possible to provide an object that has the property "data" with a value that is equal to one of the types counted before.
          Additionally, you may use an array to send more than one attachment.`
      );
    }
    return result;
  }

  public getBlobFromStream(stream: Readable, size: number): BlobFromStream {
    return new BlobFromStream(stream, size);
  }
}

export default AttachmentsHandler;
