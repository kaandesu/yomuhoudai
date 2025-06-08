import { h } from "vue";

import {
  PauseIcon,
  RocketIcon,
  TimerIcon,
  CheckIcon,
  TrashIcon,
} from "@radix-icons/vue";

export const statuses = [
  {
    value: "on-hold",
    label: "On Hold",
    icon: h(PauseIcon),
  },
  {
    value: "plan-to-read",
    label: "Planned",
    icon: h(RocketIcon),
  },
  {
    value: "ongoing",
    label: "On Going",
    icon: h(TimerIcon),
  },
  {
    value: "completed",
    label: "Completed",
    icon: h(CheckIcon),
  },
  {
    value: "dropped",
    label: "Dropped",
    icon: h(TrashIcon),
  },
];
