export interface HeaderConfig {
  introText?: string;
  fullName: string;
  images?: HeaderImage[];
  links?: HeaderLinksItem[];
}

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  fullName: "",
};

export interface HeaderLinksItem {
  title: string;
  value: string;
  linkTo?: string;
  icon: string;
}

export interface HeaderImage {
  use: boolean;
  source?: "static" | "external";
  title?: string;
  path?: string;
}
