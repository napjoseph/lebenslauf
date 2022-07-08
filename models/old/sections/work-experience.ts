export interface WorkExperienceConfig {
  items: WorkExperienceItem[];
}

export interface WorkExperienceItem {
  title: string;
  meta?: WorkExperienceItemMeta;
  url: string;
  address: string;
  image: WorkExperienceItemImage;
  roles: WorkExperienceRole[];
}

export interface WorkExperienceItemMeta {
  show?: boolean;
}

export interface WorkExperienceRole {
  title: string;
  canadaClassification?: string;
  startDate: string;
  endDate?: string; // If empty, it will use the current date.
  description: string;
}

export interface WorkExperienceItemImage {
  source?: "static" | "external";
  path: string;
  title: string;
}
