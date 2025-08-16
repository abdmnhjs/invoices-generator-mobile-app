"use client";

import * as React from "react";
import { View, Text } from "react-native";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "./label";
import { cn } from "~/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<typeof View>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View className={cn("gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error ? "text-red-500" : "text-[#1B512D]", className)}
      htmlFor={formItemId}
      {...props}
    >
      {children}
    </Label>
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof View>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <View
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { formDescriptionId } = useFormField();

  return (
    <Text
      id={formDescriptionId}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </Text>
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Text
      id={formMessageId}
      className={cn("text-sm text-red-500", className)}
      {...props}
    >
      {body}
    </Text>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
