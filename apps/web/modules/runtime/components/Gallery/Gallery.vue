<template>
  <div class="relative max-h-[900px] flex flex-col w-full aspect-[4/3] gap-1">
    <SfScrollable
      class="w-full h-full snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      :active-index="activeIndex"
      wrapper-class="h-full group/scrollable"
      is-active-index-centered
      direction="vertical"
      :previous-disabled="activeIndex === 0"
      :next-disabled="activeIndex === images.length - 1"
      buttons-placement="none"
      @on-prev="activeIndex -= 1"
      @on-next="activeIndex += 1"
      @on-scroll="onScroll"
    >
      <template #previousButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          :disabled="activeIndex === 0"
          class="absolute hidden group-hover/scrollable:block disabled:!hidden !rounded-full !p-3 z-10 top-1/2 left-4 bg-white"
          variant="secondary"
          size="lg"
          square
        >
          <SfIconChevronLeft />
        </SfButton>
      </template>
      <div
        v-for="(image, index) in images"
        :key="`image-${index}`"
        class="relative flex justify-center basis-full snap-center snap-always shrink-0 grow"
      >
        <img
          class="object-cover w-auto h-full"
          :aria-label="image.cleanImageName"
          :aria-hidden="activeIndex !== index"
          :alt="image.cleanImageName"
          :src="image.urlMiddle"
          draggable="false"
        />
      </div>
      <template #nextButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          :disabled="activeIndex === images.length - 1"
          class="absolute hidden group-hover/scrollable:block disabled:!hidden !rounded-full !p-3 z-10 top-1/2 right-4 bg-white"
          variant="secondary"
          size="lg"
          square
        >
          <SfIconChevronRight />
        </SfButton>
      </template>
    </SfScrollable>
    <div class="flex-shrink-0 basis-auto">
      <div
        class="flex-row w-full flex gap-1 mt [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <button
          v-for="(image, index) in images"
          :key="`${index}-bullet`"
          :aria-current="activeIndex === index"
          :aria-label="image.cleanImageName"
          :class="[
            'w-full relative mt-1 border-b-4 transition-colors focus-visible:outline focus-visible:outline-offset-0 pointer-events-none',
            activeIndex === index ? 'border-primary-700' : 'border-gray-200',
          ]"
          @click="activeIndex = index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfScrollable } from '@storefront-ui/vue';
import { clamp, type SfScrollableOnScrollData } from '@storefront-ui/shared';
import { useTimeoutFn, useIntersectionObserver, unrefElement } from '@vueuse/core';
import type { ImagesData } from '@plentymarkets/shop-api';

const props = defineProps<{ images: ImagesData[] }>();

const { t } = useI18n();
const { isPending, start, stop } = useTimeoutFn(() => {}, 50);

const thumbsReference = ref<HTMLElement>();
const firstThumbReference = ref<HTMLButtonElement>();
const lastThumbReference = ref<HTMLButtonElement>();
const firstVisibleThumbnailIntersected = ref(true);
const lastVisibleThumbnailIntersected = ref(true);
const activeIndex = ref(0);

const registerThumbsWatch = (
  singleThumbReference: Ref<HTMLButtonElement | undefined>,
  thumbnailIntersected: Ref<boolean>,
) => {
  watch(
    thumbsReference,
    (reference) => {
      if (reference) {
        useIntersectionObserver(
          singleThumbReference,
          ([{ isIntersecting }]) => {
            thumbnailIntersected.value = isIntersecting;
          },
          {
            root: unrefElement(reference),
            rootMargin: '0px',
            threshold: 1,
          },
        );
      }
    },
    { immediate: true },
  );
};

registerThumbsWatch(firstThumbReference, firstVisibleThumbnailIntersected);
registerThumbsWatch(lastThumbReference, lastVisibleThumbnailIntersected);

const onChangeIndex = (index: number) => {
  // eslint-disable-next-line no-console
  console.log(activeIndex.value, index);
  stop();
  activeIndex.value = clamp(index, 0, props.images.length - 1);
  start();
};

const onScroll = ({ left, scrollWidth }: SfScrollableOnScrollData) => {
  // eslint-disable-next-line no-console
  console.log(left, scrollWidth);
  if (!isPending.value) onChangeIndex(Math.round(left / (scrollWidth / props.images.length)));
};

const assignReference = (element: Element | ComponentPublicInstance | null, index: number) => {
  if (!element) return;

  if (index === props.images.length - 1) {
    lastThumbReference.value = element as HTMLButtonElement;
    return;
  }

  if (index === 0) firstThumbReference.value = element as HTMLButtonElement;
};
</script>
