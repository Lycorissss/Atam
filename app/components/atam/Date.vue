<script setup>
import CalendarIcon from '@primevue/icons/calendar'
import ChevronDownIcon from '@primevue/icons/chevrondown'
import ChevronLeftIcon from '@primevue/icons/chevronleft'
import ChevronRightIcon from '@primevue/icons/chevronright'
import ChevronUpIcon from '@primevue/icons/chevronup'
import DatePicker from 'primevue/datepicker'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

const theme = ref({
  root: `inline-flex w-full max-w-full relative`,

  pcInputText: {
    root: `flex-auto w-full appearance-none outline-none
      p-has-dropdown:rounded-e-none p-has-e-icon:pe-10
      bg-white text-black placeholder:text-neutral-500
      dark:bg-black dark:text-white dark:placeholder:text-neutral-400
      border-2 border-black dark:border-white
      rounded-md
      enabled:hover:bg-[var(--lilac-300)] enabled:focus:bg-[var(--lilac-300)]
      dark:enabled:hover:bg-[var(--lilac-900)] dark:enabled:focus:bg-neutral-800
      disabled:bg-neutral-200 disabled:text-neutral-500
      dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500
      font-bold px-3 py-2
      p-invalid:border-red-600 p-invalid:placeholder:text-red-600
      dark:p-invalid:border-red-400 dark:p-invalid:placeholder:text-red-400
      transition-none shadow-[5px_5px_0_#000] dark:shadow-[5px_5px_0_#fff]`,
  },

  dropdown: `cursor-pointer flex items-center justify-center select-none
    w-9 h-9 rounded-md border-2 border-black
    dark:border-white
    bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
    dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600
    text-black dark:text-white font-bold
    transition-none shadow-[5px_5px_0_#000] dark:shadow-[5px_5px_0_#fff]`,

  inputIconContainer: `absolute top-1/2 end-3 -mt-2 text-neutral-500 dark:text-neutral-400`,

  panel: `w-auto p-3 rounded-md border-2 border-black dark:border-white
    bg-[var(--lilac-300)] dark:bg-[var(--lilac-900)]
    text-black dark:text-white font-bold
    shadow-[5px_5px_0_#000] dark:shadow-[5px_5px_0_#fff]`,

  header: `flex items-center  justify-between pb-2 font-bold border-b-2 border-black dark:border-white`,

  title: `flex items-center justify-between gap-2 font-bold`,

  selectMonth: `bg-[var(--cyan-300)] text-black border-2 border-black
    dark:bg-[var(--cyan-900)] dark:text-white dark:border-white
    rounded-md font-bold px-2 py-1
    hover:bg-neutral-100 dark:hover:bg-neutral-900
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white`,

  selectYear: `bg-[var(--cyan-300)] text-black border-2 border-black
    dark:bg-black dark:bg-[var(--cyan-900)] dark:border-white
    rounded-md font-bold px-2 py-1
    hover:bg-neutral-100 dark:hover:bg-neutral-900
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white`,

  dayView: `w-full`,
  tableHeader: `w-full`,
  tableBody: `w-full`,

  day: `w-10 h-10 text-black dark:text-white font-bold rounded-md border-2 border-transparent
    hover:bg-neutral-200 dark:hover:bg-neutral-800
    flex items-center justify-center
    p-selected:bg-black p-selected:text-white
    dark:p-selected:bg-white dark:p-selected:text-black
    p-today:border-black p-today:bg-[var(--cyan-300)]
    dark:p-today:border-white dark:p-today:bg-[var(--cyan-900)]
    p-disabled:opacity-50 p-disabled:pointer-events-none`,

  month: `w-1/3 inline-flex justify-center cursor-pointer p-1 border-2 border-transparent font-bold
    text-black dark:text-white
    hover:bg-neutral-100 dark:hover:bg-neutral-800
    p-selected:bg-[var(--cyan-500)] p-selected:text-white
    dark:p-selected:bg-[var(--cyan-900)] dark:p-selected:text-black`,

  year: `w-1/2 inline-flex justify-center cursor-pointer p-1 border-2 border-transparent font-bold
    text-black dark:text-white
    hover:bg-neutral-100 dark:hover:bg-neutral-800
    p-selected:bg-black p-selected:text-white
    dark:p-selected:bg-white dark:p-selected:text-black`,

  timePicker: `flex items-center justify-center border-t-2 border-black dark:border-white p-2 gap-2`,

  hour: `font-bold`,
  minute: `font-bold`,
  second: `font-bold`,
  ampm: `font-bold`,

  calendarContainer: `w-full`,

  buttonbar: `flex justify-between items-center pt-2 border-t-2 border-black dark:border-white`,

  transition: {
    enterFromClass: 'opacity-0 scale-y-75',
    enterActiveClass: 'transition duration-150 ease-out',
    leaveActiveClass: 'transition-opacity duration-100 ease-in',
    leaveToClass: 'opacity-0',
  },
})
</script>

<template>
  <DatePicker
    unstyled :pt="theme" :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template #prevbutton="{ actionCallback, keydownCallback }">
      <SecondaryButton variant="text" rounded @click="actionCallback" @keydown="keydownCallback">
        <template #icon>
          <ChevronLeftIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #nextbutton="{ actionCallback, keydownCallback }">
      <SecondaryButton variant="text" rounded @click="actionCallback" @keydown="keydownCallback">
        <template #icon>
          <ChevronRightIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #todaybutton="{ actionCallback, keydownCallback }">
      <SecondaryButton variant="text" label="Today" size="small" @click="actionCallback" @keydown="keydownCallback" />
    </template>
    <template #clearbutton="{ actionCallback, keydownCallback }">
      <SecondaryButton variant="text" label="Clear" size="small" @click="actionCallback" @keydown="keydownCallback" />
    </template>
    <template #dropdownicon>
      <ChevronDownIcon />
    </template>
    <template #inputicon>
      <CalendarIcon />
    </template>
    <template #hourincrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronUpIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #hourdecrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronDownIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #minuteincrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronUpIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #minutedecrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronDownIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #secondincrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronUpIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #seconddecrementbutton="{ callbacks }">
      <SecondaryButton variant="text" rounded v-on="callbacks">
        <template #icon>
          <ChevronDownIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #ampmincrementbutton="{ toggleCallback, keydownCallback }">
      <SecondaryButton variant="text" rounded @click="toggleCallback" @keydown="keydownCallback">
        <template #icon>
          <ChevronUpIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #ampmdecrementbutton="{ toggleCallback, keydownCallback }">
      <SecondaryButton variant="text" rounded @click="toggleCallback" @keydown="keydownCallback">
        <template #icon>
          <ChevronDownIcon />
        </template>
      </SecondaryButton>
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </DatePicker>
</template>
