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
      border-2 border-black rounded-md
      enabled:hover:bg-neutral-100 enabled:focus:bg-neutral-200
      disabled:bg-neutral-200 disabled:text-neutral-500
      font-bold px-3 py-2
      p-invalid:border-red-600 p-invalid:placeholder:text-red-600
      transition-none shadow-[5px_5px_0_#000]`,
  },

  dropdown: `cursor-pointer flex items-center justify-center select-none
  w-9 h-9 rounded-md border-2 border-black
  bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
  text-black font-bold
  transition-none shadow-[5px_5px_0_#000]`,

  inputIconContainer: `absolute top-1/2 end-3 -mt-2 text-neutral-500`,

  panel: `w-auto p-3 rounded-md border-2 border-black
      bg-white text-black font-bold
      shadow-[5px_5px_0_#000]`,

  header: `flex items-center justify-between pb-2 font-bold border-b-2 border-black`,

  title: `flex items-center justify-between gap-2 font-bold`,

  selectMonth: `bg-white text-black border-2 border-black rounded-md font-bold px-2 py-1
      hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`,

  selectYear: `bg-white text-black border-2 border-black rounded-md font-bold px-2 py-1
      hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`,

  dayView: `w-[100%]`,
  tableHeader: `w-full`,
  tableBody: `w-full`,

  day: `w-10 h-10 text-black font-bold rounded-md border-2 border-transparent
  hover:bg-neutral-200 flex items-center justify-center
  p-selected:bg-black p-selected:text-white
  p-today:border-black p-today:bg-lilac-300
  p-disabled:opacity-50 p-disabled:pointer-events-none`,

  month: `w-1/3 inline-flex justify-center cursor-pointer p-1 border-2 border-transparent font-bold
      hover:bg-neutral-100 p-selected:bg-black p-selected:text-white`,

  year: `w-1/2 inline-flex justify-center cursor-pointer p-1 border-2 border-transparent font-bold
      hover:bg-neutral-100 p-selected:bg-black p-selected:text-white`,

  timePicker: `flex items-center justify-center border-t-2 border-black p-2 gap-2`,

  hour: `font-bold`,
  minute: `font-bold`,
  second: `font-bold`,
  ampm: `font-bold`,

  calendarContainer: `w-full`,

  buttonbar: `flex justify-between items-center pt-2 border-t-2 border-black`,

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
