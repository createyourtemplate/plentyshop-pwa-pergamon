<template>
  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <SfDrawer
      v-show="isOpen"
      :model-value="true"
      :disable-click-away="true"
      :disable-esc="true"
      class="w-full rounded shadow-none md:translate-x-0 z-[100] md:relative md:!block -translate-x-full shrink-0 bg-white overflow-y-auto md:overflow-y-visible"
      data-testid="category-sidebar"
    >
      <div class="flex flex-col h-full md:h-auto md:block">
        <div class="p-4 flex justify-between items-center md:hidden">
          <span class="font-bold text-lg">{{ t('listSettings') }}</span>
          <UiButton variant="primary" class="!rounded-none !p-1" size="sm" :aria-label="t('closeListSettings')" @click="$emit('close')">
            <template #prefix>
              <SfIconClose size="sm" class=" text-white" />
            </template>
          </UiButton>
        </div>
        <slot class="overflow-y-auto md:overflow-y-visible py-4 md:p-0" />
        <div class="md:mt-2 flex flex-wrap justify-between border-t border-t-neutral-200 md:border-0 gap-3 mt-auto">
          <UiButton class="md:hidden whitespace-nowrap !rounded-none flex flex-1 !h-auto" variant="primary" @click="$emit('close')">
            {{ t('showProducts') }}
          </UiButton>
        </div>
      </div>
    </SfDrawer>
  </transition>
</template>

<script setup lang="ts">
import { SfDrawer, SfIconClose } from '@storefront-ui/vue';
import type { CategorySidebarEmits, CategorySidebarProps } from '~/components/CategorySidebar/types';

const { t } = useI18n();

defineProps<CategorySidebarProps>();
defineEmits<CategorySidebarEmits>();
</script>
