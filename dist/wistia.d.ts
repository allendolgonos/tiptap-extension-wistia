import { Node } from '@tiptap/core';
export interface WistiaOptions {
    addPasteHandler: boolean;
    controlsVisibility: string;
    playerColor: string;
    HTMLAttributes: Record<string, any>;
    inline: boolean;
    width: number;
    height: number;
}
type SetWistiaVideoOptions = {
    src: string;
    width?: number;
    height?: number;
};
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        wistia: {
            setWistiaVideo: (options: SetWistiaVideoOptions) => ReturnType;
        };
    }
}
export declare const Wistia: Node<WistiaOptions, any>;
export {};
