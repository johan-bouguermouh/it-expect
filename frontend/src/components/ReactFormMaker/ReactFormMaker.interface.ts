import { ClassValue } from "clsx";
import { FormEvent } from "react";
import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export interface FieldReactFormMaker {
  inputName: string;
  label?: string;
  placeholder?: string;
  inputType:
    | "text"
    | "password"
    | "select"
    | "textarea"
    | "date"
    | "radio"
    | "checkbox"
    | "switch"
    | "file"
    | "number"
    | "custom";
  zodObject?: ZodType<any>;
  defaultValues?: any;
  options?: string[];
  className?: string;
  disabled?: boolean;
  fields?: FieldReactFormMaker[];
  isDivider?: boolean;
  legend?: string;
  legendClassName?: string;
  description?: string;
  isSecure?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSelect?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  children?: React.ReactNode;
  jsxElement?: React.ReactNode;
}

export interface DividerReactFormMaker {
  isDivider: true;
  className: string;
  isHide?: boolean;
  fields: (FieldReactFormMaker | DividerReactFormMaker)[];
}

export interface ReactFormMakerFieldset {
  fieldset: string;
  legend?: string;
  className?: string;
  legendClassName?: string;
  fields: (FieldReactFormMaker | DividerReactFormMaker)[];
  isHide?: boolean;
}

export interface ReactFormMakerParams {
  formfields: ReactFormMakerFieldset[];
  className?: string;
  footerClassName?: string;
  btnTextSubmit?: string;
  btnSubmitClassName?: string;
  onSubmit: (data: FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  setZodObject: (zObject: { [key: string]: ZodType<any> }) => void;
}

export interface FieldParams {
  zFields: any;
  fieldProps: FieldReactFormMaker;
  indexField: number;
  id?: string;
  className?: ClassValue[] | String | undefined;
}
