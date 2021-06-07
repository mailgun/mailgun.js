import Options from './Options';
export default interface RequestOptions extends Options {
    headers: any;
    timeout: number;
}
