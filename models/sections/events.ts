export interface EventsConfig {
  items: EventsItem[];
}

export interface EventsItem {
  title: string;
  dates: {
    start: string;
    end?: string;
  };
  address: string;
  role: string;
}
