<script setup lang="ts">
import type { ButtonPassThroughOptions, ButtonProps } from 'primevue/button'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import { ptViewMerge } from './utils'

type SeverityType = 'primary-blue' | 'primary-green' | 'primary-red'

interface Props extends /* @vue-ignore */ ButtonProps {
  severity?: SeverityType
  hover?: boolean
  shadow?: boolean
  outline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'primary-blue',
  hover: false,
  shadow: false,
  outline: false
})

const theme = computed<ButtonPassThroughOptions>(() => {
  const baseClasses = `!border-black dark:!border-white !border-2 px-5 py-2 rounded-full inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200`

  const severityClasses = getSeverityClasses(props.severity, props.outline)
  const hoverClasses = props.hover ? getHoverClasses(props.severity, props.outline) : ''
  const shadowClasses = props.shadow ? 'dark:!shadow-white sahdow-atam hover:sahdow-atam' : ''

  return {
    root: `${baseClasses} ${severityClasses} ${hoverClasses} ${shadowClasses}`,
    loadingIcon: `animate-spin`,
    icon: `p-right:order-1 p-bottom:order-2`,
    label: `font-medium p-icon-only:invisible p-icon-only:w-0 
          p-small:text-sm p-large:text-[1.125rem]`,
    pcBadge: {
      root: `min-w-4 h-4 leading-4 rounded-full text-xs font-bold ${getBadgeClasses(props.severity)}`,
    },
  }
})

function getSeverityClasses(severity: SeverityType, outline: boolean): string {
  const colorMap = {
    'primary-blue': {
      solid: 'bg-blue-600 text-black dark:text-white border-blue-600 focus-visible:outline-blue-600',
      outline: 'font-bold bg-transparent text-blue-600 border-blue-600 border-1 focus-visible:outline-blue-600'
    },
    'primary-green': {
      solid: 'bg-green-600 text-black dark:text-white border-green-600 focus-visible:outline-green-600',
      outline: 'font-bold bg-transparent text-green-600 border-green-600 border-1 focus-visible:outline-green-600'
    },
    'primary-red': {
      solid: 'bg-red-600 text-black dark:text-white border-red-600 focus-visible:outline-red-600',
      outline: 'font-bold bg-transparent text-red-600 border-red-600 border-1 focus-visible:outline-red-600'
    }
  }

  const variant = outline ? 'outline' : 'solid'
  return colorMap[severity][variant]
}

function getHoverClasses(severity: SeverityType, outline: boolean): string {
  const hoverMap = {
    'primary-blue': {
      solid: 'enabled:hover:bg-blue-700 enabled:active:bg-blue-800 enabled:hover:border-blue-700 enabled:active:border-blue-800 shadow-atam-on-hover',
      outline: 'enabled:hover:bg-blue-50 enabled:active:bg-blue-100 enabled:hover:text-blue-700 enabled:active:text-blue-800 shadow-atam-on-hover '
    },
    'primary-green': {
      solid: 'enabled:hover:bg-green-700 enabled:active:bg-green-800 enabled:hover:border-green-700 enabled:active:border-green-800 shadow-atam-on-hover',
      outline: 'enabled:hover:bg-green-50 enabled:active:bg-green-100 enabled:hover:text-green-700 enabled:active:text-green-800 shadow-atam-on-hover'
    },
    'primary-red': {
      solid: 'enabled:hover:bg-red-700 enabled:active:bg-red-800 enabled:hover:border-red-700 enabled:active:border-red-800 shadow-atam-on-hover',
      outline: 'enabled:hover:bg-red-50 enabled:active:bg-red-100 enabled:hover:text-red-700 enabled:active:text-red-800 shadow-atam-on-hover'
    }
  }

  const variant = outline ? 'outline' : 'solid'
  return hoverMap[severity][variant]
}

function getBadgeClasses(severity: SeverityType): string {
  const badgeMap = {
    'primary-blue': 'bg-blue-100 text-blue-600',
    'primary-green': 'bg-green-100 text-green-600',
    'primary-red': 'bg-red-100 text-red-600'
  }
  return badgeMap[severity]
}
</script>

<template>
  <Button unstyled :pt="theme" :pt-options="{
    mergeProps: ptViewMerge,
  }">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Button>
</template>