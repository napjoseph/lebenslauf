export interface FooterConfig {
  links?: FooterLink[];
}

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  links: [],
};

export interface FooterLink {
  title: string;
  url: string;
  icon: string;
}
