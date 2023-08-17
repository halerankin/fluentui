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
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingVerticalM,
  spacingVerticalNone,
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
    width: 248px;
    color: ${colorNeutralForeground1};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
    border-radius: ${borderRadiusMedium};
  }
  :host .calendar-body {
    margin: ${spacingVerticalS} ${spacingHorizontalM} ${spacingHorizontalM};
    min-height: 192px;
  }
  :host .calendar-container {
    min-height: 224px;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalNone};
  }
  :host .secondary-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 215px;
    width: 248px;
    border-radius: ${borderRadiusMedium};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
  }
  :host .secondary-panel-body {
    height: 168px;
    padding: ${spacingVerticalS} ${spacingHorizontalM} ${spacingVerticalM};
    box-sizing: border-box;
  }
  :host .secondary-panel-container {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalNone};
  }
  :host .title,
  .secondary-panel-title {
    position: inline;
    padding: ${spacingVerticalXS} ${spacingHorizontalS};
    font: ${fontWeightBold} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusMedium};
  }
  :host .secondary-panel-title:hover {
    background-color: ${colorBrandBackgroundInvertedHover};
  }
  :host .secondary-panel-title {
    cursor: pointer;
  }
  :host .secondary-panel-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: none;
    justify-items: center;
    padding: 2px 0px;
  }
  :host .secondary-panel-cell-outer,
  .secondary-panel-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 44px;
    width: 44px;
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
  }
  :host .secondary-panel-today {
    color: ${colorNeutralForeground2Selected};
    background: ${colorBrandBackgroundInvertedSelected};
  }
  :host .secondary-panel-cell-outer:not(.secondary-panel-today):not(.secondary-panel-selected):hover {
    background: ${colorBrandBackgroundInvertedHover};
    color: ${colorNeutralForeground1Static};
  }
  :host .secondary-panel-cell-outer:not(.secondary-panel-today):active {
    background: ${colorBrandBackgroundInvertedSelected};
    color: ${colorNeutralForeground1Static};
  }
  :host .secondary-panel-selected {
    color: ${colorNeutralForeground1Static};
    background: ${colorBrandBackgroundInvertedSelected};
  }
  :host .day {
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 32px;
    width: 32px;
    position: relative;
    border-radius: ${borderRadiusMedium};
  }
  :host .interact .today:not(.inactive) {
    color: ${colorNeutralForegroundStaticInverted};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
  }
  :host .interact .today:not(.inactive)::after {
    z-index: -1;
    content: '';
    position: absolute;
    display: block;
    background-color: ${colorBrandBackground};
    height: 28px;
    width: 28px;
    border-radius: 100%;
  }
  :host .interact .today:not(.inactive):not(.selected):hover::before {
    z-index: -2;
    content: '';
    position: absolute;
    display: block;
    height: 28px;
    width: 28px;
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground1Static};
    background-color: ${colorBrandBackgroundInvertedHover};
  }
  :host .interact .today:not(.inactive):not(.selected):active::before {
    background: ${colorBrandBackgroundInvertedSelected};
    color: ${colorNeutralForeground1Static};
  }
  :host .interact .today:not(.inactive).selected::before {
    z-index: -2;
    content: '';
    position: absolute;
    display: block;
    height: 28px;
    width: 28px;
    border-radius: ${borderRadiusMedium};
    background: ${colorBrandBackgroundInvertedSelected};
    color: ${colorNeutralForeground1Static};
  }
  :host .day:not(.today):not(.selected):hover::after {
    z-index: -1;
    content: '';
    position: absolute;
    display: block;
    height: 28px;
    width: 28px;
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground1Static};
    background-color: ${colorBrandBackgroundInvertedHover};
  }
  :host .day:not(.today):active::after {
    z-index: -1;
    content: '';
    position: absolute;
    display: block;
    height: 28px;
    width: 28px;
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground1Static};
    background: ${colorBrandBackgroundInvertedSelected};
  }
  :host .day:not(.today).selected::after {
    z-index: -1;
    content: '';
    position: absolute;
    display: block;
    height: 28px;
    width: 28px;
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground1Static};
    background: ${colorBrandBackgroundInvertedSelected};
  }
  :host .week-days,
  .week {
    color: ${colorNeutralForeground3};
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: none;
    padding: ${spacingVerticalNone} ${spacingHorizontalNone};
    height: 32px;
  }
  :host .week-day {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    border-radius: 0;
    color: ${colorNeutralForeground3};
  }
  :host .interact .day,
  .secondary-panel-cell {
    cursor: pointer;
  }
  :host .day.inactive {
    color: ${colorNeutralForegroundDisabled};
    background: ${colorTransparentBackground};
  }
  :host .date {
    text-align: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  :host .navicon-container {
    display: flex;
    column-gap: ${spacingHorizontalNone};
  }
  :host .navicon-up,
  .navicon-down {
    padding: ${spacingVerticalXS};
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
  }
  :host .header {
    width: 248px;
    height: 41px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    column-gap: ${spacingHorizontalNone};
    padding: ${spacingHorizontalS} ${spacingHorizontalM};
  }
  :host .slotted-link {
    visibility: hidden;
  }
  :host([show-slotted-link]) .slotted-link {
    height: 20px;
    cursor: pointer;
    margin-inline-end: ${spacingVerticalS};
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
    padding: 0 ${spacingHorizontalM} ${spacingHorizontalM};
  }
`;
