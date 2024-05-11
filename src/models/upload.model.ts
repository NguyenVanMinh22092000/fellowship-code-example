export type UploadFileDto = {
    name?: string;
    src?: string;
};

export type UploadFileCommand = {
    type: string;
    kind: string;
    file: any;
};
