import { ElementViewTemplate, html, repeat, ViewTemplate, when } from '@microsoft/fast-element';
import {
  CalendarOptions,
  calendarTemplate,
  calendarTitleTemplate,
  FASTCalendar,
  interactiveCalendarGridTemplate,
  noninteractiveCalendarTemplate,
  tagFor,
} from '@microsoft/fast-foundation';
import type { Calendar } from './calendar.js';

const ArrowUp16 = html.partial(`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z" fill="currentColor" />
</svg>`);

const ArrowDown16 = html.partial(`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.5 2.5C8.5 2.22386 8.27615 2 8 2C7.72386 2 7.5 2.22386 7.5 2.5V12.197L3.87165 8.16552C3.68692 7.96026 3.37078 7.94362 3.16552 8.12835C2.96027 8.31308 2.94363 8.62923 3.12836 8.83448L7.62836 13.8345C7.72318 13.9398 7.85826 14 8 14C8.14175 14 8.27683 13.9398 8.37165 13.8345L12.8717 8.83448C13.0564 8.62923 13.0397 8.31308 12.8345 8.12835C12.6292 7.94362 12.3131 7.96026 12.1284 8.16552L8.5 12.197V2.5Z" fill="currentColor" />
</svg>
`);

/**
 * A month picker title template that includes the year
 * @returns - A month picker title template
 * @public
 */
export function calendarRightPanelTitleTemplate<T extends Calendar>(): ViewTemplate<T> {
  const yearPickerTitle = html`
    <span
      >${(x: T) => x.dateFormatter.getYear(x.yearPickerDecade)}-${(x: T) =>
        x.dateFormatter.getYear(x.yearPickerDecade + 11)}</span
    >
  `;

  const monthPickerTitle = html` <span>${(x: T) => x.dateFormatter.getYear(x.monthPickerYear)}</span> `;

  return html`
    <div class="right-panel-title" part="right-panel-title" @click=${x => x.toggleYearPicker()}>
      ${x => (x.yearPickerOpen ? yearPickerTitle : monthPickerTitle)}
    </div>
  `;
}

/**
 * Calendar weekday label template
 * @returns - The weekday labels template
 * @public
 */
export function rightPanelCellTemplate(options: CalendarOptions, todayMonth: number, todayYear: number): ViewTemplate {
  const cellTag = html.partial(tagFor(options.dataGridCell));
  return html`
      <${cellTag}
          class="${(x, c) => c.parentContext.parent.getRightCellClassNames(x.detail, todayMonth, todayYear)}"
          part="month-cell"
          tabindex="-1"
          role="gridcell"
          grid-column="${(x, c) => c.index + 1}"
          @click="${(x, c) => c.parentContext.parent.handleRightCellSelect(c.event, x.detail)}"
      >
        <div
        class="right-cell">
          ${x => x.text}
        </div>
        </slot></slot>
      </${cellTag}>
  `;
}

/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A template for a week of days
 * @public
 */
export function rightPanelRowTemplate(options: CalendarOptions, todayMonth: number, todayYear: number): ViewTemplate {
  const rowTag = html.partial(tagFor(options.dataGridRow));
  return html`
      <${rowTag}
          class="right-panel-row"
          part="right-panel-row"
          role="row"
          role-type="default"
          grid-template-columns="1fr 1fr 1fr 1fr"
      >
      ${repeat(x => x, rightPanelCellTemplate(options, todayMonth, todayYear), {
        positioning: true,
      })}
      </${rowTag}>
  `;
}

/**
 * Interactive template using DataGrid
 * @param context - The templates context
 * @param todayString - string representation of todays date
 * @returns - interactive calendar template
 *
 * @internal
 */
export function interactiveRightPanelGridTemplate<T extends Calendar>(
  options: CalendarOptions,
  todayMonth: number,
  todayYear: number,
): ViewTemplate<T> {
  const gridTag = html.partial(tagFor(options.dataGrid));

  return html<T>`
  <${gridTag} class="months interact" part="months" generate-header="none">
      ${x =>
        x.yearPickerOpen
          ? html`${repeat(
              x => x.getDecadeText(x.yearPickerDecade),
              rightPanelRowTemplate(options, todayMonth, todayYear),
            )}`
          : html`${repeat(x => x.getMonthText(), rightPanelRowTemplate(options, todayMonth, todayYear))}`}
  </${gridTag}>
  `;
}

/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param definition - Foundation element definition
 * @returns - a template for a calendar month
 * @public
 */
export function rightPanelTemplate<T extends Calendar>(options: CalendarOptions): ElementViewTemplate<T> {
  const today: Date = new Date();
  const todayMonth: number = today.getMonth() + 1;
  const todayYear: number = today.getFullYear();
  return html<T>` ${interactiveRightPanelGridTemplate(options, todayMonth, todayYear)} `;
}

/**
 * The template for the Calendar component.
 * @public
 */
export const template: ElementViewTemplate<Calendar> = html`
  <div class="control">
    <div class="date-view">
      <div class="header">
        ${calendarTitleTemplate()}
        <div class="navicon-container">
          <span
            class="navicon-up"
            part="navicon-up"
            @click="${(x, c) => x.switchMonth(x.getMonthInfo().previous.month, x.getMonthInfo().previous.year)}"
          >
            ${ArrowUp16}
          </span>
          <span
            class="navicon-down"
            part="navicon-down"
            @click="${(x, c) => x.switchMonth(x.getMonthInfo().next.month, x.getMonthInfo().next.year)}"
          >
            ${ArrowDown16}
          </span>
        </div>
      </div>
      ${calendarTemplate({
        dataGrid: 'fast-data-grid',
        dataGridRow: 'fast-data-grid-row',
        dataGridCell: 'fast-data-grid-cell',
      })}
      <div class="footer" part="footer">
        ${when(
          x => !x.hasAttribute('monthPickerVisible'),
          html` <div
            class=${x => x.getLinkClassNames(false)}
            @click="${(x, c) => x.handleGoToToday(c.event as MouseEvent)}"
          >
            Go to today
          </div>`,
        )}
      </div>
    </div>
    ${when(
      x => x.hasAttribute('monthPickerVisible'),
      html`<div class="right-panel">
        <div class="header">
          ${x => calendarRightPanelTitleTemplate()}
          <div class="navicon-container">
            <span
              class="navicon-up"
              part="navicon-up"
              @click="${(x, c) => (x.yearPickerOpen ? (x.yearPickerDecade -= 10) : (x.monthPickerYear -= 1))}"
            >
              ${ArrowUp16}
            </span>
            <span
              class="navicon-down"
              part="navicon-down"
              @click="${(x, c) => (x.yearPickerOpen ? (x.yearPickerDecade += 10) : (x.monthPickerYear += 1))}"
            >
              ${ArrowDown16}
            </span>
          </div>
        </div>
        ${rightPanelTemplate({
          dataGrid: 'fast-data-grid',
          dataGridRow: 'fast-data-grid-row',
          dataGridCell: 'fast-data-grid-cell',
        })}
        <div class="footer" part="footer">
          <div class="${x => x.getLinkClassNames(true)}" @click="${(x, c) => x.handleGoToToday(c.event as MouseEvent)}">
            Go to today
          </div>
        </div>
      </div>`,
    )}
  </div>
`;
