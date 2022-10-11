## API Report File for "@fluentui/react-combobox"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="react" />

import type { ComponentProps } from '@fluentui/react-utilities';
import type { ComponentState } from '@fluentui/react-utilities';
import { FC } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import { Provider } from 'react';
import { ProviderProps } from 'react';
import * as React_2 from 'react';
import type { Slot } from '@fluentui/react-utilities';
import { SlotClassNames } from '@fluentui/react-utilities';

// @public
export const Combobox: ForwardRefComponent<ComboboxProps>;

// @public (undocumented)
export const comboboxClassNames: SlotClassNames<ComboboxSlots>;

// @public
export type ComboboxContextValue = Pick<ComboboxState, 'activeOption' | 'appearance' | 'focusVisible' | 'open' | 'registerOption' | 'selectedOptions' | 'selectOption' | 'setActiveOption' | 'setOpen' | 'size'>;

// @public (undocumented)
export type ComboboxContextValues = ComboboxBaseContextValues;

// @public (undocumented)
export type ComboboxOpenChangeData = ComboboxBaseOpenChangeData;

// @public (undocumented)
export type ComboboxOpenEvents = ComboboxBaseOpenEvents;

// @public
export type ComboboxProps = Omit<ComponentProps<Partial<ComboboxSlots>, 'input'>, 'children' | 'size'> & ComboboxBaseProps & {
    freeform?: boolean;
    children?: React_2.ReactNode;
};

// @public (undocumented)
export const ComboboxProvider: Provider<ComboboxContextValue> & FC<ProviderProps<ComboboxContextValue>>;

// @public (undocumented)
export type ComboboxSlots = {
    root: NonNullable<Slot<'div'>>;
    expandIcon: Slot<'span'>;
    input: NonNullable<Slot<'input'>>;
    listbox?: Slot<typeof Listbox>;
};

// @public
export type ComboboxState = ComponentState<ComboboxSlots> & ComboboxBaseState;

// @public
export const Dropdown: ForwardRefComponent<DropdownProps>;

// @public (undocumented)
export const dropdownClassNames: SlotClassNames<DropdownSlots>;

// @public (undocumented)
export type DropdownContextValues = ComboboxBaseContextValues;

// @public (undocumented)
export type DropdownOpenChangeData = ComboboxBaseOpenChangeData;

// @public (undocumented)
export type DropdownOpenEvents = ComboboxBaseOpenEvents;

// @public
export type DropdownProps = ComponentProps<Partial<DropdownSlots>, 'button'> & ComboboxBaseProps;

// @public (undocumented)
export type DropdownSlots = {
    root: NonNullable<Slot<'div'>>;
    expandIcon: Slot<'span'>;
    button: NonNullable<Slot<'button'>>;
    listbox?: Slot<typeof Listbox>;
};

// @public
export type DropdownState = ComponentState<DropdownSlots> & ComboboxBaseState & {
    placeholderVisible: boolean;
};

// @public
export const Listbox: ForwardRefComponent<ListboxProps>;

// @public (undocumented)
export const listboxClassNames: SlotClassNames<ListboxSlots>;

// @public
export type ListboxContextValue = Pick<ListboxState, 'activeOption' | 'focusVisible' | 'multiselect' | 'registerOption' | 'selectedOptions' | 'selectOption' | 'setActiveOption'>;

// @public (undocumented)
export type ListboxContextValues = {
    listbox: ListboxContextValue;
};

// @public
export type ListboxProps = ComponentProps<ListboxSlots> & SelectionProps;

// @public (undocumented)
export const ListboxProvider: Provider<ListboxContextValue> & FC<ProviderProps<ListboxContextValue>>;

// @public (undocumented)
export type ListboxSlots = {
    root: Slot<'div'>;
};

// @public
export type ListboxState = ComponentState<ListboxSlots> & OptionCollectionState & SelectionState & {
    activeOption?: OptionValue;
    focusVisible: boolean;
    selectOption(event: SelectionEvents, option: OptionValue): void;
    setActiveOption(option?: OptionValue): void;
};

// @public
const Option_2: ForwardRefComponent<OptionProps>;
export { Option_2 as Option }

// @public (undocumented)
export const optionClassNames: SlotClassNames<OptionSlots>;

// @public
export const OptionGroup: ForwardRefComponent<OptionGroupProps>;

// @public (undocumented)
export const optionGroupClassNames: SlotClassNames<OptionGroupSlots>;

// @public
export type OptionGroupProps = ComponentProps<Partial<OptionGroupSlots>>;

// @public (undocumented)
export type OptionGroupSlots = {
    root: NonNullable<Slot<'div'>>;
    label?: Slot<'span'>;
};

// @public
export type OptionGroupState = ComponentState<OptionGroupSlots>;

// @public
export type OptionProps = ComponentProps<Partial<OptionSlots>> & {
    disabled?: boolean;
    value?: string;
};

// @public (undocumented)
export type OptionSlots = {
    root: NonNullable<Slot<'div'>>;
    checkIcon: Slot<'span'>;
};

// @public
export type OptionState = ComponentState<OptionSlots> & Pick<OptionProps, 'disabled'> & {
    active: boolean;
    focusVisible: boolean;
    multiselect?: boolean;
    selected: boolean;
};

// @public
export const renderCombobox_unstable: (state: ComboboxState, contextValues: ComboboxContextValues) => JSX.Element;

// @public
export const renderDropdown_unstable: (state: DropdownState, contextValues: DropdownContextValues) => JSX.Element;

// @public
export const renderListbox_unstable: (state: ListboxState, contextValues: ListboxContextValues) => JSX.Element;

// @public
export const renderOption_unstable: (state: OptionState) => JSX.Element;

// @public
export const renderOptionGroup_unstable: (state: OptionGroupState) => JSX.Element;

// @public
export const useCombobox_unstable: (props: ComboboxProps, ref: React_2.Ref<HTMLInputElement>) => ComboboxState;

// @public (undocumented)
export function useComboboxContextValues(state: ComboboxBaseState): ComboboxBaseContextValues;

// @public
export const useComboboxStyles_unstable: (state: ComboboxState) => ComboboxState;

// @public
export const useDropdown_unstable: (props: DropdownProps, ref: React_2.Ref<HTMLButtonElement>) => DropdownState;

// @public
export const useDropdownStyles_unstable: (state: DropdownState) => DropdownState;

// @public
export const useListbox_unstable: (props: ListboxProps, ref: React_2.Ref<HTMLElement>) => ListboxState;

// @public (undocumented)
export function useListboxContextValues(state: ListboxState): ListboxContextValues;

// @public
export const useListboxStyles_unstable: (state: ListboxState) => ListboxState;

// @public
export const useOption_unstable: (props: OptionProps, ref: React_2.Ref<HTMLElement>) => OptionState;

// @public
export const useOptionGroup_unstable: (props: OptionGroupProps, ref: React_2.Ref<HTMLElement>) => OptionGroupState;

// @public
export const useOptionGroupStyles_unstable: (state: OptionGroupState) => OptionGroupState;

// @public
export const useOptionStyles_unstable: (state: OptionState) => OptionState;

// (No @packageDocumentation comment for this package)

```