'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@tiptap/core');

const WISTIA_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?wistia\.com\/(medias|embed)\/([a-zA-Z0-9]+)(\/?.*)?$/;
const WISTIA_REGEX_GLOBAL = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?wistia\.com\/(medias|embed)\/([a-zA-Z0-9]+)(\/?.*)?$/g;
const isValidWistiaUrl = (url) => {
    return url.match(WISTIA_REGEX);
};
const getEmbedUrlFromWistiaUrl = (options) => {
    const { url, controlsVisibility, playerColor, } = options;
    if (!isValidWistiaUrl(url)) {
        return null;
    }
    const videoIdRegex = /([a-zA-Z0-9-]+\.)?wistia\.com\/(medias|embed)\/([a-zA-Z0-9]+)/;
    const matches = videoIdRegex.exec(url);
    if (!matches || !matches[3]) {
        return null;
    }
    const videoId = matches[3];
    let outputUrl = `https://fast.wistia.com/embed/iframe/${videoId}`;
    const params = [];
    if (controlsVisibility) {
        params.push(`controlsVisibility=${controlsVisibility}`);
    }
    if (playerColor) {
        params.push(`playerColor=${playerColor}`);
    }
    if (params.length) {
        outputUrl += `?${params.join('&')}`;
    }
    return outputUrl;
};

const Wistia = core.Node.create({
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
            setWistiaVideo: (options) => ({ commands }) => {
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
            core.nodePasteRule({
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
                core.mergeAttributes(this.options.HTMLAttributes, {
                    src: embedUrl,
                    frameborder: '0',
                    width: this.options.width,
                    height: this.options.height,
                    allowfullscreen: true,
                    webkitallowfullscreen: true,
                    mozallowfullscreen: true,
                    style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
                }, HTMLAttributes),
            ],
        ];
    },
});

exports.Wistia = Wistia;
exports.default = Wistia;
//# sourceMappingURL=index.cjs.js.map
