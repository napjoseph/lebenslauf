export interface CharacterReferencesConfig {
  items: CharacterReferencesItem[];
}

export interface CharacterReferencesItem {
  title: string;
  meta?: CharacterReferencesItemMeta;
  role: string;
  company: CharacterReferencesItemOptionalLink;
  email?: CharacterReferencesItemOptionalLink;
  mobile?: CharacterReferencesItemOptionalLink;
}

export interface CharacterReferencesItemMeta {
  show?: boolean;
}

export interface CharacterReferencesItemOptionalLink {
  text: string;
  url?: string;
}
