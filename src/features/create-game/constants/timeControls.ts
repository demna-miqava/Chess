import { TIME_CONTROL_ICONS } from "@/constants/timeControlIcons";
import { formatTimeControl } from "@/utils/timeControl";

/**
 * Time control configurations for game setup.
 * Labels are generated dynamically using formatTimeControl utility.
 */
export const PLAY_TIME_CONTROLS = [
  {
    label: "bullet",
    icon: TIME_CONTROL_ICONS.bullet,
    options: [
      { time: 60, increment: 0 },
      { time: 60, increment: 1 },
      { time: 120, increment: 1 },
    ],
  },
  {
    label: "blitz",
    icon: TIME_CONTROL_ICONS.blitz,
    options: [
      { time: 180, increment: 0 },
      { time: 180, increment: 2 },
      { time: 300, increment: 0 },
    ],
  },
  {
    label: "rapid",
    icon: TIME_CONTROL_ICONS.rapid,
    options: [
      { time: 600, increment: 0 },
      { time: 900, increment: 10 },
      { time: 1800, increment: 0 },
    ],
  },
].map((control) => ({
  ...control,
  options: control.options.map((option) => ({
    ...option,
    label: formatTimeControl(
      option.time,
      option.increment > 0 ? option.increment : undefined,
      "|"
    ),
  })),
}));
