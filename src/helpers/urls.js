export const getMediaSourcePathFromUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname; // e.g. "/media/train/Covid/1.png"
  } catch {
    // fallback en caso de que no sea una URL válida
    return url;
  }
};
