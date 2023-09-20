export type VisibilityHandler = {
  toggleVisibility: () => Promise<void>;
  isHidden: boolean;
  hide: () => Promise<void>;
  show: () => Promise<void>;
};

export type RemoveHandler = (removeElement?: boolean) => Promise<boolean>;
