import * as NodeFormData from 'form-data';
import { Readable } from 'stream';
import { FormDataInput, InputFormData, AttachmentInfo } from '../../Types/Common/index.js';
import APIError from './Error.js';

import {
  CustomFile,
  CustomFileData,
  FormDataInputValue,
  MessageAttachment,
  MimeMessage
} from '../../Types/index.js';
import AttachmentsHandler from './AttachmentsHandler.js';

class FormDataBuilder {
  private FormDataConstructor: InputFormData;
  private fileKeys: string[];
  private attachmentsHandler: AttachmentsHandler;

  constructor(FormDataConstructor: InputFormData) {
    this.FormDataConstructor = FormDataConstructor;
    this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
    this.attachmentsHandler = new AttachmentsHandler();
  }

  public createFormData(data: FormDataInput): NodeFormData | FormData {
    if (!data) {
      throw new Error('Please provide data object');
    }
    const formData: NodeFormData | FormData = Object.keys(data)
      .filter(function (key) { return data[key]; })
      .reduce((formDataAcc: NodeFormData | FormData, key) => {
        if (this.fileKeys.includes(key)) {
          const attachmentValue = data[key];
          if (this.isMessageAttachment(attachmentValue)) {
            this.addFilesToFD(key, attachmentValue, formDataAcc);
            return formDataAcc;
          }
          throw APIError.getUserDataError(
            `Unknown value ${data[key]} with type ${typeof data[key]} for property "${key}"`,
            `The key "${key}" should have type of Buffer, Stream, File, or String `
          );
        }

        if (key === 'message') { // mime message
          const messageValue = data[key];
          if (!messageValue || !this.isMIME(messageValue)) {
            throw APIError.getUserDataError(
              `Unknown data type for "${key}" property`,
              'The mime data should have type of Buffer, String or Blob'
            );
          }
          this.addMimeDataToFD(key, messageValue, formDataAcc);
          return formDataAcc;
        }

        this.addCommonPropertyToFD(key, data[key], formDataAcc);
        return formDataAcc;
      }, new this.FormDataConstructor());
    return formData;
  }

  private addMimeDataToFD(
    key: string,
    data: MimeMessage,
    formDataInstance: NodeFormData | FormData
  ): void {
    if (typeof data === 'string') { // if string only two parameters should be used.
      formDataInstance.append(key, data as string);
      return;
    }

    if (this.isFormDataPackage(formDataInstance)) { // form-data package is used
      const nodeFormData = formDataInstance as NodeFormData;
      nodeFormData.append(key, data, { filename: 'MimeMessage' });
      return;
    }

    if (typeof Blob !== undefined) { // either node > 18 or browser
      const browserFormData = formDataInstance as FormData; // Browser compliant FormData
      if (data instanceof Blob) {
        browserFormData.append(key, data, 'MimeMessage');
        return;
      }
      if (this.attachmentsHandler.isBuffer(data)) { // node environment
        const blobInstance = new Blob([data]);
        browserFormData.append(key, blobInstance, 'MimeMessage');
      }
    }
  }

  public isMIME(data: unknown) : data is MimeMessage {
    return typeof data === 'string'
      || (typeof Blob !== 'undefined' && data instanceof Blob)
      || this.attachmentsHandler.isBuffer(data)
      || (typeof ReadableStream !== 'undefined' && data instanceof ReadableStream);
  }

  private isFormDataPackage(obj: unknown): obj is NodeFormData {
    return typeof obj === 'object'
      && obj !== null
      && typeof (obj as NodeFormData).getHeaders === 'function';
  }

  private isMessageAttachment(value: unknown): value is MessageAttachment {
    return (
      this.attachmentsHandler.isCustomFile(value)
      || typeof value === 'string'
      || (typeof File !== 'undefined' && value instanceof File)
      || (typeof Blob !== 'undefined' && value instanceof Blob)
      || this.attachmentsHandler.isBuffer(value)
      || this.attachmentsHandler.isStream(value)
      || (
        Array.isArray(value) && value.every(
          (item) => this.attachmentsHandler.isCustomFile(item)
            || (typeof File !== 'undefined' && item instanceof File)
            || (typeof Blob !== 'undefined' && value instanceof Blob)
            || this.attachmentsHandler.isBuffer(item)
            || this.attachmentsHandler.isStream(item)
        )
      )

    );
  }

  private addFilesToFD(
    propertyName: typeof this.fileKeys[number],
    value: MessageAttachment,
    formDataInstance: NodeFormData | FormData
  ): void {
    const appendFileToFD = (
      originalKey: string,
      attachment: CustomFile | File | string| CustomFileData,
      formData: NodeFormData | FormData
    ): void => {
      const key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;
      const objData = this.attachmentsHandler.convertToFDexpectedShape(attachment);
      const options: AttachmentInfo = this.attachmentsHandler.getAttachmentInfo(attachment);

      if (this.isFormDataPackage(formData)) {
        const fd = formData as NodeFormData;
        const data = typeof objData === 'string' ? Buffer.from(objData) : objData;
        fd.append(key, data, options);
        return;
      }

      if (typeof Blob !== undefined) { // either node > 18 or browser
        const browserFormData = formDataInstance as FormData; // Browser compliant FormData

        if (typeof objData === 'string' || this.attachmentsHandler.isBuffer(objData)) {
          const blobInstance = new Blob([objData]);
          browserFormData.append(key, blobInstance, options.filename);
          return;
        }

        if (objData instanceof Blob) {
          browserFormData.append(key, objData, options.filename);
          return;
        }

        if (this.attachmentsHandler.isStream(objData)) {
          const blob = this.attachmentsHandler.getBlobFromStream(
            objData as unknown as Readable,
            options.knownLength as number
          );
          browserFormData.set(key, blob as unknown as File, options.filename);
        }
      }
    };

    if (Array.isArray(value)) {
      value.forEach(function (item) {
        appendFileToFD(propertyName, item, formDataInstance);
      });
    } else {
      appendFileToFD(propertyName, value, formDataInstance);
    }
  }

  private addCommonPropertyToFD(
    key: string,
    value: FormDataInputValue,
    formDataAcc: NodeFormData | FormData
  ): void {
    const addValueBasedOnFD = (fdKey: string, fdValue: FormDataInputValue): void => {
      if (this.isFormDataPackage(formDataAcc)) {
        if (typeof fdValue === 'object') {
          // eslint-disable-next-line no-console
          console.warn('The received value is an object. \n'
          + '"JSON.Stringify" will be used to avoid TypeError \n'
          + 'To remove this warning: \n'
          + 'Consider switching to built-in FormData or converting the value on your own.\n');
          return formDataAcc.append(fdKey, JSON.stringify(fdValue));
        }
        return formDataAcc.append(fdKey, fdValue);
      }
      if (typeof fdValue === 'string') {
        return formDataAcc.append(fdKey, fdValue);
      }
      if (typeof Blob !== undefined && fdValue instanceof Blob) {
        return formDataAcc.append(fdKey, fdValue);
      }
      throw APIError.getUserDataError(
        'Unknown value type for Form Data. String or Blob expected',
        'Browser compliant FormData allows only string or Blob values for properties that are not attachments.'
      );
    };

    if (Array.isArray(value)) {
      value.forEach(function (item: FormDataInputValue) {
        addValueBasedOnFD(key, item);
      });
    } else if (value != null) {
      addValueBasedOnFD(key, value);
    }
  }
}
export default FormDataBuilder;
