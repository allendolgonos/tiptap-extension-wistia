# @allendolgonos/tiptap-extension-wistia

## Introduction

This project is a tiptap extension for embedding Wistia videos in your content. It works with the Tiptap editor, which is a headless wrapper around ProseMirror – a toolkit for building rich text WYSIWYG editors.

## Official Documentation

For general Tiptap usage and setup, please refer to the [Tiptap website](https://tiptap.dev/).

## Installation

```bash
npm install @allendolgonos/tiptap-extension-wistia
```

## Usage

```typescript
import { Wistia } from '@allendolgonos/tiptap-extension-wistia';

const editor = new Editor({
  extensions: [Wistia],
});
```

### Configuration Options

The following options can be passed to `Wistia.configure` along with their default values:

- `addPasteHandler`: `true` – Enable or disable handling of pasted Wistia URLs.
- `controlsVisibility`: `'always'` – Set the visibility behavior of the player controls ('always', 'hover', 'never').
- `playerColor`: `'00adef'` – Set the player color (hex code without #).
- `HTMLAttributes`: `{}` – Set additional HTML attributes for the player.
- `inline`: `false` – Enable or disable inline video display.
- `width`: `640` – Set the width of the video player.
- `height`: `360` – Set the height of the video player.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
