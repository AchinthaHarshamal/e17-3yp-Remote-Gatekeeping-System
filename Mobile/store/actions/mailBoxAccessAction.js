export const MAIL_BOX_ACCESS = "MAIL_BOX_ACCESS";

export const updateMailBoxAccess = (maiBoxAccess) => {
  return {
    type: MAIL_BOX_ACCESS,
    access: maiBoxAccess,
  };
};
