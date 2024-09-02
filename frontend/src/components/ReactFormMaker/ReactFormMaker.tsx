"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { Slottable } from "@radix-ui/react-slot";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { cn } from "../../lib/utils";
import { useReactFormMaker } from "./useReactFormMaker";
import {
  FieldParams,
  FieldReactFormMaker,
  ReactFormMakerParams,
} from "./ReactFormMaker.interface";

const InputPasswordVisibility = React.forwardRef(
  (
    { zFields, fieldProps, indexField, className, id }: FieldParams,
    ref: React.Ref<any>
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputValue = zFields.value !== undefined ? zFields.value : "";

    return (
      <div className={fieldProps.className ?? "flex items-center"}>
        <Input
          ref={ref}
          id={id ?? fieldProps.inputName}
          className="rounded-[var(--radius)_0px_0px_var(--radius)]"
          key={indexField}
          type={showPassword ? "text" : "password"}
          placeholder={fieldProps.placeholder}
          {...zFields}
          value={inputValue}
        />
        <Button
          className="rounded-[0px_var(--radius)_var(--radius)_0px]"
          variant="outline"
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </Button>
      </div>
    );
  }
);
InputPasswordVisibility.displayName = "InputPasswordVisibility";

const DatePickerSimple = React.forwardRef(
  ({ zFields, fieldProps, indexField }: FieldParams, ref: React.Ref<any>) => {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <Popover>
        <PopoverTrigger asChild className={cn(fieldProps.className)}>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date ? format(date, "PPP") : <span>{fieldProps.placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div>
            <Calendar
              // forwardedRef={zFields.ref}
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                zFields.onChange(date);
              }}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
DatePickerSimple.displayName = "DatePickerSimple";

const SelectSimple = React.forwardRef(
  ({ zFields, fieldProps, indexField }: FieldParams, ref: React.Ref<any>) => {
    return (
      <Select
        key={indexField}
        className={fieldProps.className}
        disabled={fieldProps.disabled}
        onValueChange={(value: string) => {
          zFields.onChange(value);
        }}
        {...zFields}
      >
        <SelectTrigger ref={ref}>
          <SelectValue placeholder={fieldProps.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{fieldProps.label}</SelectLabel>
            {fieldProps.options?.map((option, index) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
SelectSimple.displayName = "SelectSimple";

function CheckboxWithText({ zFields, fieldProps, indexField }: FieldParams) {
  return (
    <div className="flex space-x-2 items-top">
      <Checkbox
        key={indexField}
        ref={zFields.ref}
        className={cn(fieldProps.className)}
        defaultChecked={zFields.value}
        id={fieldProps.inputName}
        {...zFields}
        onCheckedChange={(checked: boolean) => {
          zFields.onChange(checked);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={fieldProps.inputName}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {fieldProps.label}
        </label>
      </div>
    </div>
  );
}

// Main Component
export default function ReactFormMaker({
  formfields,
  className,
  footerClassName = "flex justify-end gap-4",
  onSubmit,
  children,
  setZodObject,
  btnTextSubmit,
  btnSubmitClassName,
}: ReactFormMakerParams) {
  const { form, zObject } = useReactFormMaker(formfields as any);

  React.useEffect(() => {
    setZodObject(zObject);
  }, [form]);

  const InputComponent = useCallback(
    ({ zFields, fieldProps, indexField }: FieldParams) => {
      const { value, onChange, ...restZfields } = zFields;

      switch (fieldProps.inputType) {
        case "text":
          return (
            <Input
              id={fieldProps.inputName}
              className={fieldProps.className}
              disabled={fieldProps.disabled}
              ref={zFields.ref}
              key={indexField}
              placeholder={fieldProps.placeholder}
              {...zFields}
            />
          );
        case "password":
          return (
            <InputPasswordVisibility
              //className={fieldProps.className}
              //disabled={fieldProps.disabled}
              //id={fieldProps.inputName}
              key={indexField}
              zFields={zFields}
              fieldProps={fieldProps}
              indexField={indexField}
            />
          );
        case "select":
          return (
            <SelectSimple
              ref={zFields.ref}
              zFields={zFields}
              fieldProps={fieldProps}
              indexField={indexField}
              {...zFields}
              // onValueChange={(value) => {
              //   zFields.onChange(value);
              // }}
            />
          );
        case "textarea":
          return (
            <Textarea
              className={fieldProps.className}
              disabled={fieldProps.disabled}
              key={indexField}
              placeholder={fieldProps.placeholder}
              {...zFields}
            />
          );
        case "date":
          return (
            <DatePickerSimple
              // className={fieldProps.className}
              // disabled={fieldProps.disabled}
              zFields={zFields}
              fieldProps={fieldProps}
              indexField={indexField}
            />
          );
        case "radio":
          return (
            <RadioGroup
              className={fieldProps.className}
              disabled={fieldProps.disabled}
              key={indexField}
              {...zFields}
              onValueChange={zFields.onChange}
            >
              {fieldProps.options?.map((option, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem key={option} value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          );
        case "checkbox":
          return (
            <CheckboxWithText
              // className={cn(fieldProps.className)}
              // disabled={fieldProps.disabled}
              zFields={zFields}
              fieldProps={fieldProps}
              indexField={indexField}
            />
          );
        case "switch":
          return (
            <Switch
              key={indexField}
              disabled={fieldProps.disabled}
              className={cn(fieldProps.className)}
              {...zFields}
              checked={zFields.value}
              onCheckedChange={(checked: boolean) => {
                zFields.onChange(checked);
              }}
            />
          );
        case "file":
          return (
            <Input
              className={fieldProps.className}
              disabled={fieldProps.disabled}
              key={indexField}
              type="file"
              placeholder={fieldProps.placeholder}
              {...restZfields}
              accept="image/*, application/pdf"
              onChange={(event) =>
                onChange(event.target.files && event.target.files[0])
              }
            />
          );
        case "number":
          return (
            <Input
              className={fieldProps.className}
              disabled={fieldProps.disabled}
              key={indexField}
              type="number"
              placeholder={fieldProps.placeholder}
              {...zFields}
            />
          );
        case "custom":
          return React.cloneElement(fieldProps.children as React.ReactElement, {
            zFields,
            fieldProps,
            indexField,
          });
        default:
          return (
            <p
              key={indexField}
            >{`Type d'input non reconnu : ${fieldProps.inputType}`}</p>
          );
      }
    },
    []
  );

  const FormFieldsMap = useCallback(
    (dataField: FieldReactFormMaker[]) => {
      interface ElementField extends FieldReactFormMaker {
        fields?: any;
        field?: any;
        isDivider?: boolean;
        isHide?: boolean;
        className?: string;
        children?: React.ReactNode;
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
      }
      return dataField?.map((elementField: ElementField, index) => {
        if (elementField.isDivider) {
          return (
            <div
              key={index}
              className={`${elementField.className} ${
                elementField.isHide ? "hidden" : ""
              }
              `}
            >
              {elementField.field && FormFieldsMap(elementField.fields)}
              <Slottable>
                {
                  // Si le champ est de type custom, on clone l'élément JSX et on lui passe les props
                  elementField.children &&
                    React.cloneElement(
                      elementField.children as React.ReactElement,
                      {}
                    )
                }
              </Slottable>
              {/* {FormFieldsMap(elementField.fields as FieldProps[])} */}
            </div>
          );
        } else {
          return (
            <FormField
              key={index}
              control={form.control}
              name={elementField.inputName}
              render={({ field }) => (
                <FormItem
                  key={index}
                  onBlur={(e: any) => {
                    if (elementField.onBlur) {
                      e.controlField = field;
                      e.form = form;
                      elementField.onBlur(e);
                    }
                  }}
                  onSelect={(e: any) => {
                    if (elementField.onSelect) {
                      e.controlField = field;
                      e.form = form;
                      elementField.onSelect(e);
                    }
                  }}
                  onChange={(e: any) => {
                    if (elementField.onChange) {
                      e.controlField = field;
                      e.form = form;
                      elementField.onChange(e);
                    }
                  }}
                >
                  {elementField.label && !elementField.isSecure && (
                    <FormLabel htmlFor={elementField.inputName}>
                      {elementField.label}
                    </FormLabel>
                  )}
                  <FormControl>
                    <InputComponent
                      // className={elementField.className}
                      zFields={field}
                      fieldProps={elementField}
                      indexField={index}
                    />
                  </FormControl>
                  {elementField.description && !elementField.isSecure && (
                    <FormDescription>
                      {elementField.description}toto
                    </FormDescription>
                  )}
                  <FormMessage />
                  {elementField.children && (
                    <Slottable>
                      {React.cloneElement(
                        elementField.children as React.ReactElement,
                        {
                          formField: field,
                          configField: elementField,
                          index,
                        }
                      )}
                      titi
                    </Slottable>
                  )}
                </FormItem>
              )}
            />
          );
        }
      });
    },
    [form, InputComponent]
  );

  return (
    <Form
      {...form}
      // className={cn(className)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {formfields.map((element, index) => {
          if (element.fields) {
            return (
              <fieldset
                key={index}
                // ${element.isHide ? "hidden" : ""}
                className={`${element.className} 
                  `}
              >
                {element.legend && (
                  <legend className={element?.legendClassName}>
                    {element.legend}
                  </legend>
                )}
                {FormFieldsMap(element.fields as FieldReactFormMaker[])}
              </fieldset>
            );
          }
          return null;
        })}
        <footer className={footerClassName}>
          <Slottable>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const newProps = { ...child.props };
                Object.keys(newProps).forEach((propName) => {
                  if (typeof newProps[propName] === "function") {
                    const originalEventHandler = newProps[propName];
                    newProps[propName] = (event: any) => {
                      event.form = form;
                      originalEventHandler(event);
                    };
                  }
                });
                return React.cloneElement(child, newProps);
              }
              return child;
            })}
          </Slottable>
          <Button type="submit" className={btnSubmitClassName}>
            {btnTextSubmit}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
