import { Section } from "./section.ts";
import { DEFAULT_FOOTER_CONFIG, FooterConfig } from "./footer.ts";
import { OpenGraphData } from "./open-graph/open-graph-data.ts";
import { HeadData } from "./head.ts";

export interface Config {
  meta?: ConfigMeta;
  sections: Section[];
}

export interface ConfigMeta {
  openGraph?: OpenGraphData;
  head?: HeadData;
  footer?: FooterConfig;
}

export const DEFAULT_CONFIG_META: ConfigMeta = {
  footer: DEFAULT_FOOTER_CONFIG,
};

export const DEFAULT_CONFIG: Config = {
  meta: DEFAULT_CONFIG_META,
  sections: [],
};
