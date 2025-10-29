import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type SettingSwitchProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description: string;
  id?: string;
};

export const SettingSwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  id,
}: SettingSwitchProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center justify-between py-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor={id || String(name)}>{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Switch
            id={id || String(name)}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </div>
      )}
    />
  );
};
