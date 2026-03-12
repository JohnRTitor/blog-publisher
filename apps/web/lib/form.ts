import { createFormHook } from "@tanstack/react-form";
import { FormInputField } from "@/components/form/form-input-field";
import { FormPasswordField } from "@/components/form/form-password-field";
import { FormTextareaField } from "@/components/form/form-textarea-field";
import { LoadingButton } from "@workspace/ui/components/loading-button";

import { createFormHookContexts } from "@tanstack/react-form";
import { FormSelectField } from "@/components/form/form-select-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInputField,
    FormPasswordField,
    FormTextareaField,
    FormSelectField,
  },
  formComponents: {
    LoadingButton,
  },
});
