export const formatDate = (dateString: any) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().split("T")[0];
};
