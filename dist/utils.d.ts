export declare const WISTIA_REGEX: RegExp;
export declare const WISTIA_REGEX_GLOBAL: RegExp;
export declare const isValidWistiaUrl: (url: string) => RegExpMatchArray;
export interface GetWistiaEmbedUrlOptions {
    url: string;
    controlsVisibility?: string;
    playerColor?: string;
}
export declare const getEmbedUrlFromWistiaUrl: (options: GetWistiaEmbedUrlOptions) => string;
