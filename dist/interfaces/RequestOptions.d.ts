import Options from './Options';
interface RequestOptions extends Options {
    headers: any;
    timeout: number;
}
export default RequestOptions;
