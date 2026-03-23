interface IBlobUrlRequest {
    fileName: string;
    contentType: string;
    fileSize: number;
}

export class BlobUrlRequest implements IBlobUrlRequest {
    fileName: string;
    contentType: string;
    fileSize: number;
}