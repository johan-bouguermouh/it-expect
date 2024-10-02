"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";
import { FieldReactFormMaker } from "./ReactFormMaker.interface";

interface UseFormGenReturn {
  form: UseFormReturn<any>; // Utilisation de UseFormReturn générique pour le typage du formulaire
  formSchema: ZodType<any>;
  dataFieldsDefaultValues: { [key: string]: any };
  zObject: { [key: string]: ZodType<any> };
}

export function useReactFormMaker(
  formfieldsAttributes: FieldReactFormMaker[]
): UseFormGenReturn {
  let zObject: { [key: string]: ZodType<any> } = {};
  let dataFieldsDefaultValues: { [key: string]: any } = {};

  // Fonction récursive pour traiter les fieldset et dividers
  function createField(element: FieldReactFormMaker) {
    if (element.fields) {
      const dataFields = element.fields;
      if (dataFields && dataFields.length > 0) {
        dataFields.forEach((field) => {
          if (field.isDivider) {
            createField(field);
          } else {
            if (field.zodObject !== undefined) {
              zObject[field.inputName] = field.zodObject;
            }
            if (field.defaultValues !== undefined) {
              dataFieldsDefaultValues[field.inputName] = field.defaultValues;
            }
          }
        });
      }
    }
  }

  // Parcours des fieldset et dividers pour créer les champs
  formfieldsAttributes.forEach((element) => {
    createField(element);
  });
  const formSchema = z.object(zObject);
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dataFieldsDefaultValues,
  });

  return { form, formSchema, dataFieldsDefaultValues, zObject };
}
