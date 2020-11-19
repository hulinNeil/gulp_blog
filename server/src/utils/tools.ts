import moment from 'moment';

/**
 * get current Date Time 2020-05-24 16:18:11
 */
export const getCurDateTime = (): string => {
  return moment().utc().format('YYYY-MM-DD hh:mm:ss');
};
