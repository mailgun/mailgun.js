export type DKIMRotationData = {
  'rotation_enabled': boolean| string;
  'rotation_interval'?: string;
}

type DKIMRecord = {
  name: string;
  type: string;
  identifier: string;
  value: string;
  comment: string;
};

type DKIMDomain = {
  id: string;
  'account_id': string;
  sid: string;
  name: string;
  state: string;
  'active_selector': string;
  'rotation_enabled': string;
  'rotation_interval': string;
  records: DKIMRecord[];
};

export type DKIMUpdateRotationResult = {
  domain: DKIMDomain;
}

export type DKIMRotateImmediatelyResult = {
  message: string;
};
