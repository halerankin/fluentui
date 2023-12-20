import { html, Updates } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { fontFamilyBase, fontSizeBase300, fontWeightRegular, lineHeightBase300 } from '../theme/design-tokens.js';
import type { Calendar as FluentCalendar } from './calendar.js';
import './define.js';

type CalendarStoryArgs = Args & FluentCalendar;
type CalendarStoryMeta = Meta<CalendarStoryArgs>;

function logSelectedDates() {
  Updates.enqueue(() => {
    const calendar = document.querySelector('.fluent-calendar');
    const selectedDatesContainer = document.querySelector('.selected-dates-container');

    selectedDatesContainer &&
      calendar?.addEventListener('selectedDatesChanged', () => {
        const selectedDatesString = calendar.getAttribute('selected-dates');

        if (selectedDatesString === '') {
          selectedDatesContainer.innerHTML = 'Selected Date: Not Set';
        } else {
          selectedDatesContainer.innerHTML = `Selected Date: ${selectedDatesString}`;
        }
      });
  });
}

export default {
  title: 'Components/Calendar',
  args: {
    logSelectedDates,
    showSlottedLink: true,
    highlightCurrentMonth: false,
    monthPickerVisible: true,
    highlightSelectedMonth: false,
    minDate: '2023-05-02',
    maxDate: '2025-05-03',
  },
  argTypes: {
    logSelectedDates: {
      control: '',
      table: {
        type: {
          summary: 'Used only for the storybook to display the selected dates',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    showSlottedLink: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Show "Go to today" link at the link slot',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    highlightCurrentMonth: {
      control: 'boolean',
      table: {
        type: {
          summary: 'The month picker highlights the current month',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    monthPickerVisible: {
      control: 'boolean',
      table: {
        type: {
          summary: 'The month-picker is visible',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    highlightSelectedMonth: {
      control: 'boolean',
      table: {
        type: {
          summary: 'The month picker highlights the selected month',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    minDate: {
      control: 'text',
      table: {
        type: {
          summary: 'Sets the minimum allowed date of the component',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
    maxDate: {
      control: 'text',
      table: {
        type: {
          summary: 'Sets the maximum allowed date of the component',
        },
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as CalendarStoryMeta;

const storyTemplate = html<CalendarStoryArgs>`
  <script>
    ${x => x.logSelectedDates()};
  </script>
  <style>
    .presentation {
      font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
      margin-bottom: 10px;
    }
  </style>
  <div class="presentation selected-dates-container">Selected Date: Not Set</div>
  <div class="presentation date-boundary-container">
    Date Boundaries (yyyy-mm-dd): ${x => (x.minDate && x.maxDate ? `Min: ${x.minDate}, Max: ${x.maxDate}` : 'Not Set')}
  </div>
  <fluent-calendar
    class="fluent-calendar"
    ?show-slotted-link=${x => x.showSlottedLink}
    ?highlightCurrentMonth=${x => x.highlightCurrentMonth}
    ?monthPickerVisible=${x => x.monthPickerVisible}
    ?highlightSelectedMonth=${x => x.highlightSelectedMonth}
    min-date=${x => x.minDate}
    max-date=${x => x.maxDate}
  >
  </fluent-calendar>
`;

export const Calendar = renderComponent(storyTemplate).bind({});
