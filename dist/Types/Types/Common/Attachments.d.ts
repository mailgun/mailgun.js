export type NodePipeFunction = (destination: WritableStream, options?: {
    end?: boolean;
}) => void;
export type BrowserPipeFunction = (destination: WritableStream) => void;
export type StreamValue = {
    pipe: NodePipeFunction | BrowserPipeFunction;
};
export type AttachmentInfo = {
    filename?: string;
    contentType?: string;
    knownLength?: number;
};
