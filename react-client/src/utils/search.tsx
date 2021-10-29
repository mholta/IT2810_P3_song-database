/**
 * Returns query parameters based on data from a form.
 */
export const getQueryStringFromFormSubmitEvent = (
  formData: FormData
): string => {
  return new URLSearchParams(formData as URLSearchParams).toString();
};
