import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorBrandBackground,
  colorBrandBackground2,
  colorBrandBackgroundInvertedHover,
  colorBrandBackgroundInvertedPressed,
  colorBrandBackgroundInvertedSelected,
  colorBrandStroke1,
  colorBrandStroke2,
  colorCompoundBrandBackground,
  colorNeutralBackground1,
  colorNeutralBackground4,
  colorNeutralForeground1,
  colorNeutralForeground1Static,
  colorNeutralForeground2,
  colorNeutralForeground2Selected,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralForegroundStaticInverted,
  colorTransparentBackground,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontWeightBold,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline')}
  :host .control {
    display: flex;
  }
  :host .date-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${spacingHorizontalM};
    width: 248px;
    height: 285px;
    outline: solid black;
    color: ${colorNeutralForeground1};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
    border-radius: ${borderRadiusMedium};
  }
  :host .right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${spacingHorizontalM};
    outline: solid lightblue;
    border-radius: ${borderRadiusMedium};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
  }
  :host .right-cell-outer:not(.right-panel-today):hover {
    background: ${colorBrandBackgroundInvertedHover};
    color: ${colorNeutralForeground1Static};
  }
  :host .day:not(.today):active {
    background: ${colorBrandBackgroundInvertedSelected};
    color: ${colorNeutralForeground1Static};
  }
  :host .title,
  .right-panel-title {
    position: inline;
    padding: ${spacingHorizontalM};
    font: ${fontWeightBold} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
    color: ${colorNeutralForeground1};
  }
  :host .right-panel-title {
    cursor: pointer;
  }
  :host .right-panel-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: none;
    justify-items: center;
    padding: 2px 0px;
  }
  :host .right-cell-outer,
  .right-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    white-space: normal;
    height: 44px;
    width: 44px;
    border-radius: ${borderRadiusMedium};
  }
  :host .week-days,
  .week {
    color: ${colorNeutralForeground3};
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-left: var(--cell-border, none);
    border-bottom: none;
    padding: 0;
  }
  :host .interact .week {
    grid-gap: calc(var(--design-unit) * 1px);
    margin-top: calc(var(--design-unit) * 1px);
  }
  :host .day,
  .week-day {
    border-bottom: var(--cell-border);
    border-right: var(--cell-border);
    padding: var(--cell-padding);
    border-radius: 4px;
  }
  :host .week-day {
    text-align: center;
    border-radius: 0;
    border-top: var(--cell-border);
    color: ${colorNeutralForeground3};
  }
  :host .day {
    box-sizing: border-box;
    vertical-align: top;
    outline-offset: -1px;
    line-height: 32px;
    white-space: normal;
    width: 32px;
  }
  :host .interact .day,
  .right-cell {
    background: var(--neutral-fill-rest);
    cursor: pointer;
  }
  :host .day.inactive {
    color: ${colorNeutralForegroundDisabled};
    background: ${colorTransparentBackground};
  }
  :host .day.disabled {
    background: var(--disabled-day-background);
    color: var(--disabled-day-color);
    cursor: var(--disabled-cursor);
    opacity: var(--disabled-day-opacity);
    outline: var(--disabled-day-outline);
  }
  :host .day.selected {
    color: ${colorNeutralForeground1Static};
    background: ${colorBrandBackgroundInvertedSelected};
  }
  :host .date {
    text-align: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  :host .interact .today,
  .today {
    color: ${colorNeutralForegroundStaticInverted};
    background: ${colorBrandBackground};
    border-radius: 16px;
  }
  :host .today.inactive .date {
    background: transparent;
    color: inherit;
    width: auto;
  }
  :host .navicon-container {
    display: flex;
  }
  :host .navicon-up,
  .navicon-down {
    padding: ${spacingVerticalXS};
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin: auto 0;
  }
  :host .header {
    width: 248px;
    height: 41px;
    display: flex;
    justify-content: space-between;
  }
  :host .slotted-link {
    visibility: hidden;
  }
  :host([show-slotted-link]) .slotted-link {
    height: 20px;
    cursor: pointer;
    margin: ${spacingVerticalM} 0;
    margin-right: 8px;
    visibility: visible;
  }
  :host([show-slotted-link]) .slotted-link.inactive {
    color: ${colorNeutralForegroundDisabled};
    pointer-events: none;
    visibility: visible;
  }
  :host .footer {
    display: flex;
    justify-content: flex-end;
  }
  :host .right-panel-today {
    color: ${colorNeutralForeground2Selected};
    background: ${colorBrandBackgroundInvertedSelected};
  }
`;
