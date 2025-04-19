export interface Image {
    original: string;
    author: {
        name: string;
        link: string;
    };
    message: string;
    description: string;
    caption: string;
    width: number;
    height: number;
    color: string;
    src: string;
    conversions: {
        src: string;
        width: string;
    }[];
}

export interface ImageResponse {
    statusCode: number;
    body: {
        message: string;
    };
    data: Image | null;
}
