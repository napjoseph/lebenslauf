export interface MetaHeadData {
  title: string;
  description: string;
  author: string;
}

export interface MetaBodyData {
  pages: MetaBodyPageData[];
  sectionHeaders: MetaBodySectionHeadersData;
}

export interface MetaBodyPageData {
  containers: MetaBodyContainerData[];
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
  HEADER = "header",
  DIVIDER = "divider",
  EDUCATION = "education",
  LANGUAGES = "languages",
  PERSONAL_DETAILS = "personal-details",
  SKILLS = "skills",
  WORK_EXPERIENCE = "work-experience",
  CERTIFICATIONS = "certifications",
  PROJECTS = "projects",
}

export interface SectionMeta {
  title?: string;
  footer?: string;
  page?: number;
  container?: string;
  show?: boolean;
  marginBottom?: number;
}

export interface Section {
  meta?: SectionMeta;
  content:
    | { type: SectionType.HEADER; value: HeaderConfig }
    | { type: SectionType.DIVIDER; value: DividerConfig }
    | { type: SectionType.EDUCATION; value: EducationConfig }
    | { type: SectionType.LANGUAGES; value: LanguagesConfig }
    | { type: SectionType.PERSONAL_DETAILS; value: PersonalDetailsConfig }
    | { type: SectionType.SKILLS; value: SkillsConfig }
    | { type: SectionType.WORK_EXPERIENCE; value: WorkExperienceConfig }
    | { type: SectionType.CERTIFICATIONS; value: CertificationsConfig }
    | { type: SectionType.PROJECTS; value: ProjectsConfig };
}

export type CertificationsSubHeaderTypes =
  | "credentialType"
  | "credentialId"
  | "offeredBy"
  | "issuingOrganization"
  | "issuedDate"
  | "gradeAchieved";

export interface CertificationsIssuingOrganizationMapping {
  key: string;
  displayName: string;
  url?: string;
}

export interface CertificationsOfferedByMapping {
  key: string;
  displayName: string;
  url?: string;
}

export interface CertificationsCredentialTypeMapping {
  key: string;
  displayName: string;
}

export interface CertificationsMeta {
  subHeaderItems?: CertificationsSubHeaderTypes[];
  issuingOrganizationMapping?: CertificationsIssuingOrganizationMapping[];
  offeredByMapping?: CertificationsOfferedByMapping[];
  credentialTypeMapping?: CertificationsCredentialTypeMapping[];
}

export const DEFAULT_CERTIFICATIONS_META: CertificationsMeta = {
  subHeaderItems: [
    "credentialType",
    "credentialId",
    "offeredBy",
    "issuingOrganization",
    "issuedDate",
    "gradeAchieved",
  ],
  offeredByMapping: [],
  issuingOrganizationMapping: [],
  credentialTypeMapping: [],
};

export interface CertificationsConfig {
  meta?: CertificationsMeta;
  items: CertificationsItem[];
}

export interface CertificationsItem {
  title: string;
  meta?: CertificationsItemMeta;
  credentialType?: string;
  credentialId?: string;
  credentialUrl?: string;
  offeredBy?: string;
  issuingOrganization?: string;
  verificationUrl?: string;
  issuedDate?: string;
  gradeAchieved?: string;
  children?: CertificationsItem[];
}

export interface CertificationsItemMeta {
  show?: boolean;
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

export interface HeaderConfig {
  title: string;
  subtitle: string;
}

export interface DividerConfig {
  title: string;
  url: string;
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
  useYears?: boolean;
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
  YEARS = "years",
  NONE = "none",
}

export enum SkillsConfigOrderBy {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export interface SkillsItem {
  title: string;
  url: string;
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
  totalMonths: number;
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
  description: string;
  value: string;
  icon: string;
  url: string;
}

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
}

export interface ProjectsItemMeta {
  show?: boolean;
}

export interface Config {
  meta: Meta;
  sections: Section[];
}

export const DEFAULT_CONTAINER_ID = "default";

export const DEFAULT_META_BODY_CONTAINER_DATA: MetaBodyContainerData = {
  id: DEFAULT_CONTAINER_ID,
  width: 12,
};

export const DEFAULT_META_BODY_PAGE_DATA: MetaBodyPageData = {
  containers: [DEFAULT_META_BODY_CONTAINER_DATA],
};
