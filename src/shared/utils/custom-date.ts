import * as moment from 'moment';

export class CustomDate {
  moment: moment.Moment;

  constructor(
    date?: moment.MomentInput,
    format?: moment.MomentFormatSpecification,
  ) {
    this.moment = moment(date, format);
  }
}

export const customDateFactory = (
  date?: moment.MomentInput,
  format?: moment.MomentFormatSpecification,
) => new CustomDate(date, format).moment.toDate();
