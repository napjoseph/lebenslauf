export interface SkillsConfigMeta {
  defaults?: {
    maxRating?: number;
  };
}

export const DEFAULT_SKILLS_MAX_RATING = 10;

export const DEFAULT_SKILLS_CONFIG_META: SkillsConfigMeta = {
  defaults: {
    maxRating: DEFAULT_SKILLS_MAX_RATING,
  },
};

export interface SkillsConfig {
  meta?: SkillsConfigMeta;
  items: SkillsCategory[];
}

export const DEFAULT_SKILLS_CONFIG: SkillsConfig = {
  meta: DEFAULT_SKILLS_CONFIG_META,
  items: [],
};

export interface SkillsCategory {
  title: string;
  meta?: SkillsCategoryMeta;
  items: SkillsItem[];
}

export interface SkillsCategoryMeta {
  show?: boolean;
}

export const DEFAULT_SKILLS_CATEGORY_META: SkillsCategoryMeta = {
  show: true,
};

export interface SkillsItemMeta {
  show?: boolean;
}

export const DEFAULT_SKILLS_ITEM_META: SkillsItemMeta = {
  show: true,
};

export interface SkillsItem {
  title: string;
  rating: number;
  maxRating?: number;
  meta?: SkillsItemMeta;
}

export const DEFAULT_SKILLS_ITEM: SkillsItem = {
  title: "",
  rating: 0,
  maxRating: DEFAULT_SKILLS_MAX_RATING,
  meta: DEFAULT_SKILLS_ITEM_META,
};
