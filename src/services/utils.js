export const setMaxRangeTitle = (title, range) =>
  title.length >= range ? title.substring(0, range) + '...' : title;
