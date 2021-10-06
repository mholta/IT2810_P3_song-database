export const getQueryStringFromFormSubmitEvent = (
  formData: FormData
): string => {
  return new URLSearchParams(formData as URLSearchParams).toString();
};
