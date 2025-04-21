import type { Image } from "~/types/image";

export const createHtmlTemplate = (image: Image) => {
  return `<img width="${image.width}" height="${image.height}" src="${
    image.conversions.at(0)?.src
  }" alt="${image.description} by ${image.author.name}" />`;
};

export const createMarkdownTemplate = (image: Image) => {
  return `![${image.description} by ${image.author.name}](${
    image.conversions.at(0)?.src
  })`;
};
