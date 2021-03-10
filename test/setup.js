// Set the year to 2021 globally so that these tests pass if they run in future years
var FakeTimers = require('@sinonjs/fake-timers');
FakeTimers.install({ now: new Date(2021, 2, 2) });

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  format: (date, format) => {
    const [year, month, day] = date
      .toISOString()
      .substr(0, 10)
      .split('-');
    return jest
      .requireActual('date-fns')
      .format(new Date(year, month - 1, day), format);
  },
}));
