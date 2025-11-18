<template>
  <div class="flex flex-col" data-testid="product-card">
    <div class="relative overflow-hidden">
      <SfLink
        :tag="NuxtLink"
        rel="preload"
        :to="productPath"
        :class="{ 'size-48': isFromSlider }"
        as="image"
        class="flex items-center justify-center bg-[#f7f7f7]"
      >
        <NuxtImg
          :src="lastImage?.url || imageUrl"
          :alt="imageAlt"
          :title="imageTitle ? imageTitle : null"
          :loading="lazy && !priority ? 'lazy' : 'eager'"
          :fetchpriority="priority ? 'high' : 'auto'"
          :preload="priority || false"
          :width="getWidth()"
          :height="getHeight()"
          class="object-contain aspect-square w-full"
          data-testid="image-slot"
        />
      </SfLink>

      <slot name="wishlistButton">
        <WishlistButton
          square
          class="absolute bottom-0 right-0 mr-2 mb-2 ring-inset ring-neutral-200 !rounded-full"
          :product="product"
        />
      </slot>
    </div>
    <div class="pt-5 typography-text-sm flex flex-col flex-auto">
      <div class="flex items-center">
        <div class="mr-[3px] leading-none">
          <SfRating class="!text-black" size="xs" :half-increment="true" :value="rating ?? 0" :max="5" />
        </div>
        <div class="leading-none">
          <SfCounter size="xs">{{ ratingCount }}</SfCounter>
        </div>
      </div>
      <SfLink :tag="NuxtLink" :to="productPath" class="no-underline mt-[10px] md:mt-[15px] !text-[14px]" variant="secondary" data-testid="productcard-name">
        {{ name }}
      </SfLink>
      <div class="flex flex-col-reverse items-start md:flex-row md:items-center pt-1">
        <span class="block font-bold typography-text-sm" data-testid="product-card-vertical-price">
          <span v-if="!productGetters.canBeAddedToCartFromCategoryPage(product)" class="mr-1">
            {{ t('account.ordersAndReturns.orderDetails.priceFrom') }}
          </span>
          <span>{{ format(price) }}</span>
        </span>
      </div>
      <div v-if="colorValue > 0" class="mt-auto">
        <span class="inline-block border border-black border-solid text-xs mt-[15px] py-1 px-2">in {{ colorValue }} Farben verfügbar</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import { SfLink, SfRating, SfCounter } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';
import { defaults } from '~/composables';

const localePath = useLocalePath();
const { format } = usePriceFormatter();
const { t } = useI18n();
const {
  product,
  name,
  imageUrl,
  imageAlt = '',
  imageTitle,
  imageWidth,
  imageHeight,
  rating,
  ratingCount,
  priority,
  lazy = true,
  isFromSlider = false,
} = defineProps<ProductCardProps>();

const { price } = useProductPrice(product);

const variationId = computed(() => productGetters.getVariationId(product));
const lastImage = computed( () => {
  const gallery = productGetters.getGallery(product);

  return gallery.length ? gallery[gallery.length - 1] : null;
});

const colorValue = computed(() => {
  const property = productGetters.getPropertyById(17, product);

  return property?.values instanceof Array ? property?.values.length : 0;
});

const productPath = computed(() => {
  const basePath = `/${productGetters.getUrlPath(product)}_${productGetters.getItemId(product)}`;
  const shouldAppendVariation = variationId.value && productGetters.getSalableVariationCount(product) === 1;

  return localePath(shouldAppendVariation ? `${basePath}_${variationId.value}` : basePath);
});

const getWidth = () => {
  if (imageWidth && imageWidth > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageWidth;
  }
  return '';
};
const getHeight = () => {
  if (imageHeight && imageHeight > 0 && imageUrl.includes(defaults.IMAGE_LINK_SUFIX)) {
    return imageHeight;
  }
  return '';
};

const NuxtLink = resolveComponent('NuxtLink');
</script>
