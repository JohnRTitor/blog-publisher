"use client";

import { useFieldContext } from "@/lib/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";

import { cn } from "@workspace/ui/lib/utils";

type Option = {
  label: string;
  value: string;
};

type FormSelectFieldProps = {
  label?: React.ReactNode;
  description?: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  options: Option[];
  groupLabel?: string;
};

export function FormSelectField({
  label,
  description,
  className,
  labelClassName,
  placeholder = "Select option",
  options,
  groupLabel,
}: FormSelectFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field className={cn(className)} data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={field.name} className={cn(labelClassName)}>
          {label}
        </FieldLabel>
      )}

      <Select
        value={field.state.value}
        onValueChange={(value) => value && field.handleChange(value)}
      >
        <SelectTrigger id={field.name} aria-invalid={isInvalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}

            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {!isInvalid && description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
