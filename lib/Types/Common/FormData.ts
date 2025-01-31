import * as NodeFormData from 'form-data';
import { FormDataInputValue } from '../Messages';

export type FormDataOptions = {
  [key: string]: NodeFormData;
}

export type InputFormData =
  {
    new(form?: HTMLFormElement | undefined, submitter?: HTMLElement | null | undefined): FormData;
  } |
  {
    new(options?: FormDataOptions): NodeFormData
  }

export type FormDataInput = {
  [key: string]: FormDataInputValue;
};

export type FormDataBuilderConfig = {
  useFetch?: boolean
}
