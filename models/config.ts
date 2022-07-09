export interface MetaHeadData {
  title: string;
  description: string;
  author: string;
}

export interface MetaBodyData {
  header: MetaBodyHeaderData;
  containers: MetaBodyContainerData[];
  sectionHeaders: MetaBodySectionHeadersData;
}

export interface MetaBodyHeaderData {
  title: string;
  subtitle: string;
}

export interface MetaBodyContainerData {
  id: string;
  width: number;
}

export interface MetaBodySectionHeadersData {
  uppercase: boolean;
}

export interface Meta {
  head?: MetaHeadData;
  body?: MetaBodyData;
}

export enum SectionType {
  EDUCATION = "education",
  PERSONAL_DETAILS = "personal-details",
  WORK_EXPERIENCE = "work-experience",
  LANGUAGES = "languages",
}

export interface SectionMeta {
  title?: string;
  container?: string;
  show?: boolean;
}

export interface Section {
  meta?: SectionMeta;
  content:
    | { type: SectionType.EDUCATION; value: EducationConfig }
    | { type: SectionType.PERSONAL_DETAILS; value: PersonalDetailsConfig }
    | { type: SectionType.WORK_EXPERIENCE; value: WorkExperienceConfig }
    | { type: SectionType.LANGUAGES; value: LanguagesConfig };
}

export interface WorkExperienceConfig {
  items: WorkExperienceItem[];
}

export interface WorkExperienceItem {
  title: string;
  meta?: WorkExperienceItemMeta;
  dates: {
    startDate: string;
    endDate: string;
  };
  company: {
    title: string;
    url: string;
    address: string;
  };
  description: string;
}

export interface WorkExperienceItemMeta {
  show?: boolean;
}

export interface EducationConfig {
  items: EducationItem[];
}

export interface EducationItem {
  title: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  from: {
    name: string;
    address: string;
    url: string;
  };
}

export interface LanguagesConfig {
  items: LanguagesItem[];
}

export interface LanguagesItem {
  title: string;
  description: string;
}

export interface PersonalDetailsConfig {
  items: PersonalDetailsItem[];
}

export interface PersonalDetailsItem {
  title: string;
  value: string;
  icon: string;
  url: string;
}

export interface Config {
  meta?: Meta;
  sections: Section[];
}
