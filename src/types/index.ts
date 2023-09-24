export type VisibilityHandler = {
  toggleVisibility: () => Promise<void>;
  isHidden: boolean;
  hide: () => Promise<void>;
  show: () => Promise<void>;
};

export type RemoveHandler = (removeElement?: boolean) => Promise<boolean>;

export interface CompatibleComponents {
  numberIncrementer: {
    isAlready: boolean;
    isApplicable: boolean;
  };
  modal: {
    isAlready: boolean;
    isApplicable: boolean;
  };
  cookieConsent: {
    isAlready: boolean;
    isApplicable: boolean;
  };
}
