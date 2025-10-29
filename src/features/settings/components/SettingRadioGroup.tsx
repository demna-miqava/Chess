import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type SettingRadioGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description: string;
  options: Option[];
  id?: string;
};

export const SettingRadioGroup = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  id,
}: SettingRadioGroupProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-4 py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor={id || String(name)}>{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="pl-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${id || String(name)}-${option.value}`}
                />
                <Label
                  htmlFor={`${id || String(name)}-${option.value}`}
                  className="cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  );
};
