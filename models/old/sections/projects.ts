import { SectionType } from "./section-types.ts";

export interface ProjectsConfig {
  items: ProjectsItem[];
}

export interface ProjectsItem {
  title: string;
  meta?: ProjectsItemMeta;
  linkTo?: string;
  dates: {
    start: string;
    end?: string;
  };
  tags: string[];
  roles: string[];
  relatedTo: ProjectsItemRelationship[];
}

export interface ProjectsItemMeta {
  show?: boolean;
}

export interface ProjectsItemRelationship {
  type: SectionType;
  key: string;
}
