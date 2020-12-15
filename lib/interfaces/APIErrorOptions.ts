export default interface APIErrorOptions {
  id: string;
  headers: { [key: string]: any };
  status: number | string;
  message: string;
  body: any;
}
