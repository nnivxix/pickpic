export interface Photo {
  "@context": string;
  "@type": string;
  creator: Creator;
  author: Author;
  creditText: string;
  copyrightNotice: string;
  license: string;
  acquireLicensePage: string;
  contentUrl: string;
  thumbnail: Thumbnail;
  datePublished: string;
  description: string;
  name: string;
  width: string;
  height: string;
  isAccessibleForFree: boolean;
  isFamilyFriendly: boolean;
  caption: string;
  representativeOfPage: boolean;
}

export interface Creator {
  "@type": string;
  name: string;
}

export interface Author {
  "@type": string;
  name: string;
}

export interface Thumbnail {
  "@type": string;
  url: string;
}
