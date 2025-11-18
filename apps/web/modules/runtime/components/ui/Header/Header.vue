<template>
  <MegaMenu :categories="categoryTree">
    <template #prefix>
      <UiButton
        variant="tertiary"
        class="relative text-white h-full !p-3 hover:text-white active:text-white hover:bg-header-400 active:bg-header-400 md:hidden"
        square
        :aria-label="t('openSearchModalButtonLabel')"
        @click="searchModalOpen"
      >
        <NuxtImg :src="searchIcon" width="15" height="15" alt="search icon" />
      </UiButton>
    </template>
    <template v-if="viewport.isGreaterOrEquals('md')" #suffix>
      <nav class="hidden mx-4 md:flex md:flex-row md:flex-nowrap md:pr-6">
        <UiButton
          variant="tertiary"
          class="relative hover:bg-header-400 active:bg-header-400 rounded-md mr-4"
          square
          :aria-label="t('openSearchModalButtonLabel')"
          @click="searchModalOpen"
        >
          <NuxtImg :src="searchIcon" width="15" height="15" alt="search icon" />
        </UiButton>
        <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
          <template #trigger>
            <UiButton
              variant="tertiary"
              class="relative hover:bg-header-400 active:bg-header-400 rounded-md mr-4"
              :style="{ color: iconColor }"
              :class="{ 'bg-primary-700': isAccountDropdownOpen }"
              data-testid="account-dropdown-button"
              @click="accountDropdownToggle()"
            >
              <template #prefix>
                <NuxtImg :src="userIcon" width="17" height="15" alt="user icon" />
              </template>
              {{ user.user?.firstName }}
            </UiButton>
          </template>
          <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
            <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
              <template v-if="label === t('account.logout')">
                <UiDivider class="my-2" />
                <SfListItem tag="button" class="text-left" data-testid="account-dropdown-logout-item" @click="logOut()">
                  {{ label }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-neutral-200': route.path === link }"
                data-testid="account-dropdown-list-item"
              >
                {{ label }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>
        <UiButton
          v-else
          :style="{ color: iconColor }"
          class="group relative hover:!bg-header-400 active:!bg-header-400 mr-4 rounded-md"
          variant="tertiary"
          :aria-label="t('auth.login.openLoginForm')"
          square
          @click="navigateToLogin"
        >
          <NuxtImg :src="userIcon" width="17" height="15" alt="user icon" />
        </UiButton>
        <UiButton
          class="group relative hover:!bg-header-400 active:bg-header-400 rounded-md mr-4"
          :tag="NuxtLink"
          :to="localePath(paths.wishlist)"
          :style="{ color: iconColor }"
          :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
          variant="tertiary"
          square
          data-testid="wishlist-page-navigation"
        >
          <template #prefix>
            <NuxtImg :src="heartIcon" width="17" height="15" alt="heart icon" /><span class="text-sm">{{ wishlistItemIds.length }}</span>
          </template>
        </UiButton>
         <UiButton
          class="group relative hover:!bg-header-400 active:!bg-header-400 mr-1 -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :style="{ color: iconColor }"
          :to="localePath(paths.cart)"
          :aria-label="t('numberInCart', { count: cartItemsCount })"
          variant="tertiary"
          square
        >
          <template #prefix>
            <NuxtImg :src="cartIcon" width="17" height="15" alt="cart icon" /><span class="text-sm">{{ cartItemsCount }}</span>
          </template>
        </UiButton>
        <template v-if="localeCodes.length > 1">
          <UiButton
            v-if="!isLanguageSelectOpen"
            class="group relative hover:!bg-header-400 active:!bg-header-400 rounded-md cursor-pointer"
            :aria-label="t('languageSelector')"
            variant="tertiary"
            :style="{ color: iconColor }"
            square
            data-testid="open-languageselect-button"
            :disabled="(showConfigurationDrawer && isEditing) || (showConfigurationDrawer && disableActions)"
            @click="toggleLanguageSelect()"
          >
            <template #prefix>
              <NuxtImg :src="globalIcon" class="relative" width="15" height="15" alt="global icon" /><span class="text-sm">{{ currentLocale.toUpperCase() }}</span>
            </template>
          </UiButton>
          <UiButton
            v-else
            class="group relative hover:!bg-header-400 active:bg-header-400 mr-1 -ml-0.5 rounded-md cursor-pointer"
            :aria-label="t('languageSelector')"
            :style="{ color: isActive ? iconColor : '' }"
            variant="tertiary"
            square
            data-testid="open-languageselect-button"
          >
            <template #prefix>
              <NuxtImg :src="globalIcon" class="relative" width="15" height="15" alt="global icon" /><span class="text-sm">{{ currentLocale.toUpperCase() }}</span>
            </template>
          </UiButton>
        </template>
      </nav>
    </template>

    <template v-if="viewport.isLessThan('lg')" #suffix>
      <div class="h-full">
        <UiButton
          class="h-full group relative hover:!bg-header-400 active:bg-header-400 mr-1"
          :tag="NuxtLink"
          :to="localePath(paths.wishlist)"
          :style="{ color: iconColor }"
          :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
          variant="tertiary"
          square
          data-testid="wishlist-page-navigation"
        >
          <template #prefix>
            <NuxtImg :src="heartIcon" width="17" height="15" alt="heart icon" />
            <SfBadge
                v-if="wishlistItemIds.length > 0"
                :content="wishlistItemIds.length"
                :style="{ backgroundColor: iconColor, outlineColor: headerBackgroundColor, color: '#ffffff' }"
                class="!translate-y-2 outline group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
                data-testid="wishlist-badge"
                placement="top-right"
                :max="99"
              />
          </template>
        </UiButton>
        <UiButton
          class="h-full group relative hover:!bg-header-400 active:!bg-header-400 mr-1 -ml-0.5 mr-2"
          :tag="NuxtLink"
          :style="{ color: iconColor }"
          :to="localePath(paths.cart)"
          :aria-label="t('numberInCart', { count: cartItemsCount })"
          variant="tertiary"
          square
        >
          <template #prefix>
            <NuxtImg :src="cartIcon" width="17" height="15" alt="shopping cart icon" />
            <SfBadge
              v-if="cartItemsCount > 0"
              :content="cartItemsCount"
              :style="{ backgroundColor: iconColor, outlineColor: headerBackgroundColor, color: '#ffffff' }"
              class="!translate-y-2 outline group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
              data-testid="cart-badge"
              placement="top-right"
              :max="99"
            />
          </template>
        </UiButton>
      </div>
    </template>
  </MegaMenu>
  <LanguageSelector />
  <UiModal
    v-if="viewport.isGreaterOrEquals('md') && isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="h-full md:w-[500px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="t('closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent
      v-if="isLogin"
      :is-modal="true"
      @change-view="isLogin = false"
      @logged-in="navigateAfterAuth(true)"
    />
    <Register v-else :is-modal="true" @change-view="isLogin = true" @registered="closeAuthentication" />
  </UiModal>

  <NuxtLazyHydrate when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton
          :aria-label="t('closeDialog')"
          square
          variant="tertiary"
          class="absolute right-4 top-2"
          @click="searchModalClose"
        >
          <SfIconClose class="text-neutral-500" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfDropdown,
  SfIconClose,
  SfListItem,
  SfModal,
  useDisclosure,
} from '@storefront-ui/vue';
import LanguageSelector from '~/components/LanguageSelector/LanguageSelector.vue';
import { paths } from '~/utils/paths';

import searchIcon from 'assets/icons/custom_paths/search.svg';
import userIcon from 'assets/icons/custom_paths/user.svg';
import cartIcon from 'assets/icons/custom_paths/cart.svg';
import globalIcon from 'assets/icons/custom_paths/global.svg';
import heartIcon from 'assets/icons/custom_paths/heart.svg';

const isLogin = ref(true);
const { data: cart } = useCart();
const { wishlistItemIds } = useWishlist();
const cartItemsCount = ref(0);
const { getSetting: getIconColor } = useSiteSettings('iconColor');
const { getSetting: getHeaderBackgroundColor } = useSiteSettings('headerBackgroundColor');

const iconColor = computed(() => getIconColor());
const headerBackgroundColor = computed(() => getHeaderBackgroundColor());

const NuxtLink = resolveComponent('NuxtLink');
const { t, localeCodes, locale: currentLocale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree } = useCategoryTree();
const { data: user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();
const isActive = computed(() => isLanguageSelectOpen);

onNuxtReady(() => {
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

const navigateAfterAuth = (reload: boolean) => {
  if (reload) {
    window.location.reload();
  } else {
    closeAuthentication();
  }
};

watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
  },
);

watch(
  () => isAuthenticationOpen.value,
  async () => {
    isLogin.value = true;
  },
);

const logOut = async () => {
  accountDropdownToggle();
  await logout();
  window.location.reload();
};

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};
</script>
