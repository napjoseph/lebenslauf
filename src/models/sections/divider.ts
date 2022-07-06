export interface DividerLogoConfig {
  fill?: string;
  link?: string;
  linkTitle?: string;
}

export const DEFAULT_DIVIDER_LOGO_CONFIG: DividerLogoConfig = {
  fill: "#a8abaf",
};

export interface DividerConfig {
  logo: DividerLogoConfig;
}

export const DEFAULT_DIVIDER_CONFIG: DividerConfig = {
  logo: DEFAULT_DIVIDER_LOGO_CONFIG,
};
