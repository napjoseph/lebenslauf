export interface TagFilter {
  value: string;
  status: TagFilterStatus;
}

export enum TagFilterStatus {
  DEFAULT = "DEFAULT",
  ONLY_WITH = "ONLY_WITH",
  MUST_NOT_HAVE = "MUST_NOT_HAVE",
}
