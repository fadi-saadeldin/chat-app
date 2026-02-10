import moment from 'moment';

export const formatTime = (timestamp: string) => {
  const date = moment(timestamp);
  const now = moment();
  const diffInHours = now.diff(date, 'hours');

  if (diffInHours < 12) {
    return date.format('HH:mm');
  }

  return date.format('DD MMM YYYY HH:mm');
};

