export const WISTIA_REGEX = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?wistia\.com\/(medias|embed)\/([a-zA-Z0-9]+)(\/?.*)?$/;
export const WISTIA_REGEX_GLOBAL = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?wistia\.com\/(medias|embed)\/([a-zA-Z0-9]+)(\/?.*)?$/g;

export const isValidWistiaUrl = (url: string) => {
  return url.match(WISTIA_REGEX);
};

export interface GetWistiaEmbedUrlOptions {
  url: string;
  controlsVisibility?: string;
  playerColor?: string;
}

export const getEmbedUrlFromWistiaUrl = (options: GetWistiaEmbedUrlOptions) => {
  const {
    url,
    controlsVisibility,
    playerColor,
  } = options;

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

  const params: string[] = [];

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
