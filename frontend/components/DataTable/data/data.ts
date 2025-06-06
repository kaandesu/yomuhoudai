import { h } from "vue";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  PauseIcon,
  RocketIcon,
  TimerIcon,
  CheckIcon,
  TrashIcon,
} from "@radix-icons/vue";
export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

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
export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: h(ArrowDownIcon),
  },
  {
    value: "medium",
    label: "Medium",
    icon: h(ArrowRightIcon),
  },
  {
    value: "high",
    label: "High",
    icon: h(ArrowUpIcon),
  },
];
