import type { Image } from "~/types/image";

export const createHtmlTemplate = (image: Image, conversion: { width: string; src: string }) => {
  return `<img src="${conversion.src}" alt="${image.description} by ${image.author.name}" />`;
};

export const createMarkdownTemplate = (image: Image, conversion: { width: string; src: string }) => {
  return `![${image.description} by ${image.author.name}](${conversion.src})`;
};
