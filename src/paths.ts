export const Paths = {
  root: "/",
  app: "/app",
  appBackState: "/app/:isFromBack",
  newNumberIncrementerForm: "/new_number_incrementer_form/:elementId",
  numberIncrementerForm: "/number_incrementer_form/:elementId/:isNew",
  newModalForm: "/new_modal_form/:elementId",
  modalForm: "/modal_form/:elementId/:isNew",
  newCookieConsentForm: "/new_cookie_consent_form/:elementId",
  cookieConsentForm: "/cookie_consent_form/:elementId/:isNew",
  htmlToWebflow: "/html_to_webflow",
} as const;
