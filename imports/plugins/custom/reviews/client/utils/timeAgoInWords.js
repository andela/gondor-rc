import distanceInWords from "date-fns/distance_in_words";

/**
 * Converts date to human readable form
 *
 * @param {Date} date Javascript date object
 *
 * @returns {String} time ago in words
 */
const timeAgoInWords = (date) => {
  const now = new Date();

  return distanceInWords(now, date, {
    includeSeconds: true,
    addSuffix: true
  });
};

export default timeAgoInWords;
