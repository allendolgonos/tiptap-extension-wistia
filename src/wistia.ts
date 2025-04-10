import { mergeAttributes, Node, nodePasteRule } from '@tiptap/core';

import { getEmbedUrlFromWistiaUrl, isValidWistiaUrl, WISTIA_REGEX_GLOBAL } from './utils';

export interface WistiaOptions {
  addPasteHandler: boolean;
  controlsVisibility: string;
  playerColor: string;
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  width: number;
  height: number;
}

type SetWistiaVideoOptions = { src: string; width?: number; height?: number };

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    wistia: {
      setWistiaVideo: (options: SetWistiaVideoOptions) => ReturnType;
    };
  }
}

export const Wistia = Node.create<WistiaOptions>({
  name: 'wistia',

  addOptions() {
    return {
      addPasteHandler: true,
      controlsVisibility: 'always',
      playerColor: '00adef',
      HTMLAttributes: {},
      inline: false,
      width: 640,
      height: 360,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-wistia-video] iframe',
      },
    ];
  },

  addCommands() {
    return {
      setWistiaVideo:
        (options: SetWistiaVideoOptions) =>
        ({ commands }) => {
          if (!isValidWistiaUrl(options.src)) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    return [
      nodePasteRule({
        find: WISTIA_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromWistiaUrl({
      url: HTMLAttributes.src,
      controlsVisibility: this.options.controlsVisibility,
      playerColor: this.options.playerColor,
    });

    HTMLAttributes.src = embedUrl;

    return [
      'div',
      {
        'data-wistia-video': '',
        style: 'padding-bottom: 56.25%; position: relative; height: 0;',
      },
      [
        'iframe',
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            src: embedUrl,
            frameborder: '0',
            width: this.options.width,
            height: this.options.height,
            allowfullscreen: true,
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          },
          HTMLAttributes
        ),
      ],
    ];
  },
}); 