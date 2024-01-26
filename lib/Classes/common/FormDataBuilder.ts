import * as NodeFormData from 'form-data';
import { APIErrorOptions, InputFormData } from '../../Types/Common';
import APIError from './Error';

class FormDataBuilder {
  private FormDataConstructor: InputFormData;
  constructor(FormDataConstructor: InputFormData) {
    this.FormDataConstructor = FormDataConstructor;
  }

  public createFormData(data: any): NodeFormData | FormData {
    if (!data) {
      throw new Error('Please provide data object');
    }
    const formData: NodeFormData | FormData = Object.keys(data)
      .filter(function (key) { return data[key]; })
      .reduce((formDataAcc: NodeFormData | FormData, key) => {
        const fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
        if (fileKeys.includes(key)) {
          this.addFilesToFD(key, data[key], formDataAcc);
          return formDataAcc;
        }

        if (key === 'message') { // mime message
          this.addMimeDataToFD(key, data[key], formDataAcc);
          return formDataAcc;
        }

        this.addCommonPropertyToFD(key, data[key], formDataAcc);
        return formDataAcc;
      }, new this.FormDataConstructor());
    return formData;
  }

  private isFormDataPackage(formDataInstance: NodeFormData | FormData)
  : boolean {
    return (<NodeFormData>formDataInstance).getHeaders !== undefined;
  }

  private getAttachmentOptions(item: {
    filename?: string;
    contentType? : string;
    knownLength?: number;
  }): {
    filename?: string,
    contentType?: string,
    knownLength?: number
  } {
    if (typeof item !== 'object' || this.isStream(item)) return {};
    const {
      filename,
      contentType,
      knownLength
    } = item;
    return {
      ...(filename ? { filename } : { filename: 'file' }),
      ...(contentType && { contentType }),
      ...(knownLength && { knownLength })
    };
  }

  private addMimeDataToFD(
    key: string,
    data: Buffer | Blob | string,
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
      if (typeof Buffer !== 'undefined') { // node environment
        if (Buffer.isBuffer(data)) {
          const blobInstance = new Blob([data]);
          browserFormData.append(key, blobInstance, 'MimeMessage');
          return;
        }
      }
    }

    throw new APIError({
      status: 400,
      statusText: `Unknown data type for ${key} property`,
      body: 'The mime data should have type of Buffer, String or Blob'
    } as APIErrorOptions);
  }

  private addFilesToFD(
    propertyName: string,
    value: any,
    formDataInstance: NodeFormData | FormData
  ): void {
    const appendFileToFD = (
      originalKey: string,
      obj: any,
      formData: NodeFormData | FormData
    ): void => {
      const key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;
      const isStreamData = this.isStream(obj);
      const objData = isStreamData ? obj : obj.data;
      // getAttachmentOptions should be called with obj parameter to prevent loosing filename
      const options = this.getAttachmentOptions(obj);

      if (this.isFormDataPackage(formData)) {
        const fd = formData as NodeFormData;
        const data = typeof objData === 'string' ? Buffer.from(objData) : objData;
        fd.append(key, data, options);
        return;
      }

      if (typeof Blob !== undefined) { // either node > 18 or browser
        const browserFormData = formDataInstance as FormData; // Browser compliant FormData
        if (typeof objData === 'string') {
          const blobInstance = new Blob([objData]);
          browserFormData.append(key, blobInstance, options.filename);
          return;
        }
        if (objData instanceof Blob) {
          browserFormData.append(key, objData, options.filename);
          return;
        }
        if (typeof Buffer !== 'undefined') { // node environment
          if (Buffer.isBuffer(objData)) {
            const blobInstance = new Blob([objData]);
            browserFormData.append(key, blobInstance, options.filename);
          }
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

  private isStream(data: any) {
    return typeof data === 'object' && typeof data.pipe === 'function';
  }

  private addCommonPropertyToFD(
    key: string,
    value: any,
    formDataAcc: NodeFormData | FormData
  ): void {
    if (Array.isArray(value)) {
      value.forEach(function (item: any) {
        formDataAcc.append(key, item);
      });
    } else if (value != null) {
      formDataAcc.append(key, value);
    }
  }
}
export default FormDataBuilder;
