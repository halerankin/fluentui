import { ElementViewTemplate, html, repeat, ViewTemplate } from '@microsoft/fast-element';
import { CalendarDateInfo, CalendarOptions, calendarTemplate, MonthInfo, tagFor } from '@microsoft/fast-foundation';
import type { Calendar } from './calendar.js';

const ArrowUp16 = html.partial(`
<svg class="navicon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5 13.5C7.5 13.7761 7.72386 14 8 14C8.27614 14 8.5 13.7761 8.5 13.5V3.80298L12.1283 7.83448C12.3131 8.03974 12.6292 8.05638 12.8345 7.87165C13.0397 7.68692 13.0564 7.37077 12.8716 7.16552L8.37165 2.16552C8.27683 2.06016 8.14174 2 8 2C7.85826 2 7.72317 2.06016 7.62835 2.16552L3.12836 7.16552C2.94363 7.37077 2.96027 7.68692 3.16552 7.87165C3.37078 8.05638 3.68692 8.03974 3.87165 7.83448L7.5 3.80298V13.5Z" fill="currentColor" />
</svg>`);

const ArrowDown16 = html.partial(`
<svg class="navicon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.5 2.5C8.5 2.22386 8.27615 2 8 2C7.72386 2 7.5 2.22386 7.5 2.5V12.197L3.87165 8.16552C3.68692 7.96026 3.37078 7.94362 3.16552 8.12835C2.96027 8.31308 2.94363 8.62923 3.12836 8.83448L7.62836 13.8345C7.72318 13.9398 7.85826 14 8 14C8.14175 14 8.27683 13.9398 8.37165 13.8345L12.8717 8.83448C13.0564 8.62923 13.0397 8.31308 12.8345 8.12835C12.6292 7.94362 12.3131 7.96026 12.1284 8.16552L8.5 12.197V2.5Z" fill="currentColor" />
</svg>
`);

const decadePickerText = (decadeStart: number, decadeEnd: number) =>
  `Range of years, ${decadeStart} to ${decadeEnd} selected. Switch to year picker.`;
const yearPickerText = (year: number) => `Year picker, ${year} selected. Switch to decade picker.`;
const slottedLinkText: string = 'Go to today';

export function calendarTitleTemplate<T extends Calendar>(): ViewTemplate<T> {
  return html`
    <div
      class="title"
      part="title"
      aria-live="polite"
      aria-label="${(x: T) =>
        x.dateFormatter.getDate(`${x.month}-2-${x.year}`, {
          month: 'long',
          year: 'numeric',
        })}"
    >
      <span part="month">${(x: T) => x.dateFormatter.getMonth(x.month)}</span>
      <span part="year">${(x: T) => x.dateFormatter.getYear(x.year)}</span>
    </div>
  `;
}

/**
 * A secondary panel title template that includes the year (if month picker) or decade (if year picker)
 * @returns - A secondary panel title template
 * @public
 */
export function calendarSecondaryPanelTitleTemplate<T extends Calendar>(): ViewTemplate<T> {
  const yearPickerTitle = html`
    <span
      role="button"
      aria-live="polite"
      aria-label="${(x: T) =>
        decadePickerText(
          parseInt(x.dateFormatter.getYear(x.getYearPickerInfo().decadeStart)),
          parseInt(x.dateFormatter.getYear(x.getYearPickerInfo().decadeEnd)),
        )}"
    ></span>
    <span
      >${(x: T) => x.dateFormatter.getYear(x.getYearPickerInfo().decadeStart)}-${(x: T) =>
        x.dateFormatter.getYear(x.getYearPickerInfo().decadeEnd)}</span
    >
  `;

  const monthPickerTitle = html`
    <span
      role="button"
      aria-live="polite"
      aria-label="${(x: T) => yearPickerText(parseInt(x.dateFormatter.getYear(x.getMonthPickerInfo().year)))}"
    ></span>
    <span>${(x: T) => x.dateFormatter.getYear(x.getMonthPickerInfo().year)}</span>
  `;

  return html`
    <div
      class="secondary-panel-title"
      part="secondary-panel-title"
      tabindex="0"
      aria-label="${(x: T) =>
        x.yearPickerOpen
          ? decadePickerText(
              parseInt(x.dateFormatter.getYear(x.getYearPickerInfo().decadeStart)),
              parseInt(x.dateFormatter.getYear(x.getYearPickerInfo().decadeEnd)),
            )
          : yearPickerText(parseInt(x.dateFormatter.getYear(x.getMonthPickerInfo().year)))}"
      role="button"
      @click=${x => x.toggleYearPicker()}
      @keydown=${(x, c) => x.handleSecondaryPanelTitleKeydown(c.event as KeyboardEvent)}
    >
      ${x => (x.yearPickerOpen ? yearPickerTitle : monthPickerTitle)}
    </div>
  `;
}

/**
 * Calendar secondary panel cell template
 * @param context - Element definition context for getting the cell tag for secondary-panel-cell
 * @param todayMonth - a numeric representation for today's month
 * @param todayYear - a numeric representation for today's year
 * @returns - The secondary panel cell template for month picker or year picker
 * @public
 */
export function secondaryPanelCellTemplate(
  options: CalendarOptions,
  todayMonth: number,
  todayYear: number,
): ViewTemplate {
  const cellTag = html.partial(tagFor(options.dataGridCell));

  return html`
    ${(x, c) => {
      const parent = c.parentContext.parent;

      const dateInfo = parent.yearPickerOpen ? { year: x.detail, month: 1 } : { year: parent.year, month: x.detail };
      const checkType: string = parent.yearPickerOpen ? 'year' : 'month';
      const isDisabled: boolean = parent.isDateDisabled(dateInfo, checkType, parent.minDate, parent.maxDate);

      return html`
        <${cellTag}
          class="${parent.getSecondaryPanelCellClassNames(x.detail, todayMonth, todayYear, isDisabled)}"
          id="id-secondary-panel-cell-${x => x.detail}"
          part="secondary-panel-cell"
          tabindex="-1"
          role="gridcell"
          grid-column="${(x, c) => c.index + 1}"
          aria-label="${(x, c) => parent.getSecondaryPanelCellLabels(x.detail)}"
          aria-selected="${(x, c) => parent.getSecondaryPanelCellSelected(x.detail)}"
          @click="${(x, c) => parent.$emit('secondaryPanelCellSelected', x.detail)}"
          @keydown="${(x, c) => parent.handleSecondaryPanelKeydown(c.event as KeyboardEvent, x.detail)}"
          ?disabled="${isDisabled}"
          ?aria-disabled="${isDisabled}"
        >
        <div
          class="secondary-panel-cell"
          aria-labelledby="id-secondary-panel-cell-${x => x.detail}">
          ${x => x.text}
        </div>
        <slot name="${x => x.detail}"></slot>
      </${cellTag}>
  `;
    }}
  `;
}

/**
 * Calendar secondary panel row template
 * @param context - Element definition context for getting the cell tag for secondary-panel-row
 * @param todayMonth - a numeric representation for today's month
 * @param todayYear - a numeric representation for today's year
 * @returns - The secondary panel row template for month picker or year picker
 * @public
 */
export function secondaryPanelRowTemplate(
  options: CalendarOptions,
  todayMonth: number,
  todayYear: number,
): ViewTemplate {
  const rowTag = html.partial(tagFor(options.dataGridRow));
  return html`
      <${rowTag}
          class="secondary-panel-row"
          part="secondary-panel-row"
          role="row"
          role-type="default"
          grid-template-columns="1fr 1fr 1fr 1fr"
      >
      ${repeat(x => x, secondaryPanelCellTemplate(options, todayMonth, todayYear), {
        positioning: true,
      })}
      </${rowTag}>
  `;
}

/**
 * Interactive calendar secondary panel template using DataGrid
 * @param context - The templates context
 * @param todayMonth - a numeric representation for today's month
 * @param todayYear - a numeric representation for today's year
 * @returns - interactive calendar secondary panel template for month or year picker
 *
 * @internal
 */
export function interactiveSecondaryPanelGridTemplate<T extends Calendar>(
  options: CalendarOptions,
  todayMonth: number,
  todayYear: number,
): ViewTemplate<T> {
  const gridTag = html.partial(tagFor(options.dataGrid));

  return html<T>`
  <${gridTag} class="secondary-panel-grid interact" part="secondary-panel-grid" generate-header="none" role="grid">
      ${x =>
        x.yearPickerOpen
          ? html`${repeat(
              x => x.getDecadeText(x.getYearPickerInfo().decadeStart),
              secondaryPanelRowTemplate(options, todayMonth, todayYear),
            )}`
          : html`${repeat(x => x.getMonthText(), secondaryPanelRowTemplate(options, todayMonth, todayYear))}`}
  </${gridTag}>
  `;
}

/**
 * The template for the secondary panel.
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @returns - a template for the secondary panel
 * @public
 */
export function secondaryPanelTemplate<T extends Calendar>(options: CalendarOptions): ElementViewTemplate<T> {
  const today: Date = new Date();
  const todayMonth: number = today.getMonth() + 1;
  const todayYear: number = today.getFullYear();
  return html<T>` ${interactiveSecondaryPanelGridTemplate(options, todayMonth, todayYear)} `;
}

export function navButton<T extends Calendar>(
  direction: 'up' | 'down',
  label: string,
  onClick: () => void,
  context: T,
): ViewTemplate<T> {
  const icon = direction === 'up' ? ArrowUp16 : ArrowDown16;
  const partName = `navicon-${direction}`;

  return html<T>`
    <fluent-button
      size="small"
      appearance="subtle"
      icon-only
      part="${partName}"  // Corrected here
      role="navigation"
      aria-label="${label}"
      tabindex="0"
      @click="${onClick}"
    >${icon}</fluent-button>
  `;
}

export function calendarHeaderNav<T extends Calendar>(context: T): ViewTemplate<T> {
  return html<T>`
    <div class="navicon-container">
      ${navButton(
        'up',
        'Previous Month',
        () => context.handleSwitchMonth(context.getMonthInfo().previous.month, context.getMonthInfo().previous.year),
        context,
      )}
      ${navButton(
        'down',
        'Next Month',
        () => context.handleSwitchMonth(context.getMonthInfo().next.month, context.getMonthInfo().next.year),
        context,
      )}
    </div>
  `;
}

export function footerTemplate<T extends Calendar>(context: T): ViewTemplate<T> {
  return html`
    <div class="footer" part="footer">
      <div
        class="${context => (context.isToday() ? 'slotted-link inactive' : 'slotted-link')}"
        tabindecontext="0"
        @click="${(context, c) => context.goToToday()}"
        @keydown="${(context, c) => context.handleLinkKeydown(c.event as KeyboardEvent)}"
      >
        ${slottedLinkText}
      </div>
    </div>
  `;
}

/**
 * The template for the Calendar component.
 * @public
 */
export const template: ElementViewTemplate<Calendar> = html<Calendar>`
  <template>
    <div class="control" @keydown=${(x, c) => x.handleControlKeydown(c.event as KeyboardEvent)}>
      <div class="date-view">
        <div class="calendar-container">
          <div class="header">${calendarTitleTemplate} ${calendarHeaderNav}</div>
          <div class="calendar-body" part="calendar-body">
            ${calendarTemplate({
              dataGrid: 'fast-data-grid',
              dataGridRow: 'fast-data-grid-row',
              dataGridCell: 'fast-data-grid-cell',
            })}
          </div>
        </div>
        <div class="secondary-panel">
          <!-- TODO: control visibility via CSS class switched by monthPickerVisible value -->
          <div class="secondary-panel-container">
            <div class="header">
              ${calendarSecondaryPanelTitleTemplate}
              <div class="navicon-container">
                ${(x: Calendar) =>
                  navButton(
                    'up',
                    x.yearPickerOpen ? 'Previous Decade' : 'Previous Year',
                    () => x.handleSwitchSecondaryPanel('previous'),
                    x,
                  )}
                ${(x: Calendar) =>
                  navButton(
                    'down',
                    x.yearPickerOpen ? 'Next Decade' : 'Next Year',
                    () => x.handleSwitchSecondaryPanel('next'),
                    x,
                  )}
              </div>
            </div>
            <div class="secondary-panel-body">
              ${secondaryPanelTemplate({
                dataGrid: 'fast-data-grid',
                dataGridRow: 'fast-data-grid-row',
                dataGridCell: 'fast-data-grid-cell',
              })}
            </div>
          </div>
          ${footerTemplate}
        </div>
      </div>
    </div>
  </template>
`;
