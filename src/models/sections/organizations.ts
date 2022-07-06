export interface OrganizationsConfig {
  items: OrganizationsItem[];
}

export interface OrganizationsItem {
  title: string;
  url: string;
  roles: OrganizationsItemRole[];
}

export interface OrganizationsItemRole {
  title: string;
  dates: {
    start: string;
    end: string;
  };
}
