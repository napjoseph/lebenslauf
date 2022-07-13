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
  LANGUAGES = "languages",
  PERSONAL_DETAILS = "personal-details",
  SKILLS = "skills",
  WORK_EXPERIENCE = "work-experience",
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
    | { type: SectionType.LANGUAGES; value: LanguagesConfig }
    | { type: SectionType.PERSONAL_DETAILS; value: PersonalDetailsConfig }
    | { type: SectionType.SKILLS; value: SkillsConfig }
    | { type: SectionType.WORK_EXPERIENCE; value: WorkExperienceConfig };
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

export interface SkillsConfig {
  meta?: SkillsConfigMeta;
  items: SkillsItem[];
}

export interface SkillsConfigMeta {
  useProficiencyMap?: boolean;
  proficiencyMap?: SkillsConfigProficiencyMap;
  sortBy?: SkillsConfigSortBy;
  orderBy?: SkillsConfigOrderBy;
}

export interface SkillsConfigProficiencyMap {
  [key: string]: number | string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
}

export const DEFAULT_SKILLS_CONFIG_PROFICIENCY_MAP: SkillsConfigProficiencyMap =
  {
    "1": "Beginner",
    "2": "Beginner",
    "3": "Basic",
    "4": "Basic",
    "5": "Intermediate",
    "6": "Intermediate",
    "7": "Advanced",
    "8": "Advanced",
    "9": "Expert",
    "10": "Expert",
  };

export enum SkillsConfigSortBy {
  TITLE = "title",
  RATING = "rating",
  NONE = "none",
}

export enum SkillsConfigOrderBy {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export interface SkillsItem {
  title: string;
  meta?: SkillsItemMeta;
  items: SkillsItemChild[];
}

export interface SkillsItemMeta {
  show?: boolean;
}

export interface SkillsItemChild {
  title: string;
  meta?: SkillsItemChildMeta;
  rating: number;
}

export interface SkillsItemChildMeta {
  show?: boolean;
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
  meta: Meta;
  sections: Section[];
}
