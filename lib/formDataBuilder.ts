import * as NodeFormData from 'form-data';
import { InputFormData } from './types/IFormData';

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

  private isNodeFormData(formDataInstance: NodeFormData | FormData)
  : formDataInstance is NodeFormData {
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
    if (Buffer.isBuffer(data) || typeof data === 'string') {
      const nodeFormData = formDataInstance as NodeFormData;
      const preparedData = typeof data === 'string' ? Buffer.from(data) : data;
      nodeFormData.append(key, preparedData, { filename: 'MimeMessage' });
    } else {
      const browserFormData = formDataInstance as FormData;
      browserFormData.append(key, data, 'MimeMessage');
    }
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
      if (this.isNodeFormData(formData)) {
        formData.append(key, objData, options);
        return;
      }
      formData.append(key, objData, options.filename);
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
