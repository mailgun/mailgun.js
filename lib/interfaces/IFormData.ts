interface Headers {
    [key: string]: any;
}

interface AppendOptions {
    header?: string | Headers;
    knownLength?: number;
    filename?: string;
    filepath?: string;
    contentType?: string;
}

export default abstract class IFormData {
  // eslint-disable-next-line no-useless-constructor
  constructor() { // description of type. Should not be used for creating objects
  }

  abstract append(key: string, value: any, options?: AppendOptions | string): void
}
