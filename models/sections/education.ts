export interface EducationConfig {
  items: EducationItem[];
}

export interface EducationItem {
  title: string;
  dates: {
    start: string;
    end: string;
  };
  from: {
    name: string;
    address: string;
    url: string;
  };
}
