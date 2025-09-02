<template>
  <footer data-testid="footer" class="bg-[#F5EFEF]">
    <div class="max-w-screen-2xl mx-auto py-[40px] px-[20px] text-[14px] xl:py-[60px]">
      <div class="xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-[100px]">
        <div class="pt-[40px] max-w-[550px] mx-auto xl:pt-[0] xl:flex xl:gap-[60px] xl:flex xl:justify-between w-full xl:max-w-[530px]">
          <div class="links flex flex-col">
            <input type="checkbox" id="my-account-footer">
            <label for="my-account-footer" class="border-t border-black flex min-h-[40px] flex items-center xl:border-t-0 xl:min-h-[0] xl:text-[18px] xl:font-semibold whitespace-nowrap">{{ t('account.heading') }}</label>
            <ul class="pb-[20px] leading-[2] xl:pb-[0]">
              <li>
                <NuxtLink :to="localePath(paths.account)">{{ t('account.heading') }}</NuxtLink> 
              </li>
              <li>
                <NuxtLink :to="localePath(paths.authLogin)">{{ t('account.ordersAndReturns.section.myOrders') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.cart)">{{ t('account.ordersAndReturns.section.myOrders') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.accountReturns)">{{ t('account.ordersAndReturns.section.returns') }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="links flex flex-col">
            <input type="checkbox" id="my-viania-footer">
            <label for="my-viania-footer" class="border-t border-black flex min-h-[40px] flex items-center xl:border-t-0 xl:min-h-[0] xl:text-[18px] xl:font-semibold whitespace-nowrap">PERGAMON</label>
            <ul class="pb-[20px] leading-[2] xl:pb-[0]">
              <li>
                <NuxtLink to="#">Über uns</NuxtLink>
              </li>
              <li>
                <NuxtLink to="#">Kontakt</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.legalDisclosure)">Impressum</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.termsAndConditions)">AGB</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="links flex flex-col border-b border-black xl:border-b-0">
            <input type="checkbox" id="my-service-footer">
            <label for="my-service-footer" class="border-t border-black flex min-h-[40px] flex items-center xl:border-t-0 xl:min-h-[0] xl:text-[18px] xl:font-semibold whitespace-nowrap">Service</label>
            <ul class="pb-[20px] leading-[2] xl:pb-[0]">
              <li>
                <NuxtLink to="#">Größentabelle</NuxtLink>
              </li>
              <li>
                <NuxtLink to="#">Waschanleitung</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.cancellationForm)">Widerrufsrecht</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath(paths.privacyPolicy)">Datenschutz</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <NewsletterCyt
          name="newsletter"
          type="subscribe"
          class="pt-[40px] xl:pt-[0] 2xl:max-w-[590px]"
          :content='{
            "text": {
              "bgColor": "transparent",
              "title": t("Footer.newsletter1"),
              "htmlDescription": t("Footer.newsletter2")
            },
            "input": {
              "displayNameInput": false,
              "nameIsRequired": false
            },
            "button": {
              "label": t("Footer.newsletter3")
            }
          }'
      />
    </div>

    <div class="mini-links text-center gap-[10px] flex flex-wrap pt-[40px] justify-center" v-if="viewport.isLessThan('xl')">
      <NuxtLink :to="localePath(paths.legalDisclosure)">Impressum</NuxtLink>
      <NuxtLink :to="localePath(paths.termsAndConditions)">AGB</NuxtLink>
      <NuxtLink :to="localePath(paths.cancellationForm)">Widerrufsrecht</NuxtLink>
      <NuxtLink :to="localePath(paths.privacyPolicy)">Datenschutz</NuxtLink>
    </div>

    <div class="copy text-center text-[12px] pt-[20px] xl:pt-[40px] 2xl:text-left 2xl:flex 2xl:flex-wrap">
      <p><sup>*</sup>{{ t('Footer.copyRight.1') }}</p>
      <p><sup>**</sup>{{ t('Footer.copyRight.2') }}</p>
      <p class="pt-[10px] xl:pt-[0] xl:ml-auto">{{ companyName }} / Alle Rechte vorbehalten <a href="https://www.createyourtemplate.com" target="_blank" title="Lösungen für den eCommerce - Online Shops, eBay Shops und Templates, Widgets, Design, Programmierung, Fullservice, Branding - createyourtemplate GmbH &amp; Co. KG - Berlin, Germany">powered by <strong>createyourtemplate</strong></a></p>

      <NuxtLink :to="localePath(paths.home)" class="pt-[30px] flex justify-center 2xl:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="111" height="30" viewBox="0 0 111 30"><defs><clipPath id="ax"><rect width="111" height="30" fill="none"/></clipPath></defs><g clip-path="url(#ax)"><path d="M58.549,5.987c0,1.214-.011,2.322,0,3.437.016,1.273.059,2.545.084,3.819.06,3.2.1,6.411.179,9.616.05,2.131.143,4.26.218,6.391.02.58-.051.644-.628.656-.91.018-1.82.045-2.731.071-.527.015-.638-.1-.635-.608.028-3.866.075-7.732.072-11.6,0-2.992-.051-5.983-.109-8.975-.051-2.588-.144-5.178-.218-7.767,0-.113.006-.23,0-.342-.033-.386.141-.537.531-.535,1.089,0,2.17-.017,3.254-.033a6.433,6.433,0,0,0,.821-.043.77.77,0,0,1,.879.514q5.755,11.379,11.527,22.747c.063.123.132.242.252.464,0-.829.012-1.55,0-2.269-.052-2.4-.119-4.808-.168-7.212-.072-3.549-.129-7.1-.2-10.646C71.653,2.7,71.59,1.73,71.547.758c-.021-.484.084-.591.553-.6C73.01.129,73.92.1,74.829.072c.607-.02.662.06.648.64q-.045,2.061-.045,4.124c0,3.908-.008,7.82.029,11.729.036,3.692.125,7.384.194,11.077q.015.879.056,1.759c.016.346-.135.491-.484.5-1.372.021-2.745.047-4.118.087a.786.786,0,0,1-.8-.519q-4.069-8.146-8.152-16.285l-3.365-6.72c-.065-.128-.129-.256-.24-.472"/><path d="M45.536,20.768h-3.5c-1.649,0-3.3.006-4.946,0a.391.391,0,0,0-.458.307.464.464,0,0,0-.007.052c-.651,2.71-1.324,5.413-1.982,8.125-.138.568-.22.648-.807.653-1.085.008-2.169.022-3.252.033-.444,0-.547-.13-.427-.543L38.4.807c.175-.606.224-.638.869-.648Q41.433.127,43.6.076c.568-.012.678.062.825.591q3.444,12.345,6.893,24.689c.366,1.307.78,2.6,1.167,3.9.135.453.074.545-.392.561-1.242.042-2.484.083-3.726.109-.6.013-.65-.046-.785-.616q-.952-4.047-1.914-8.093c-.032-.136-.083-.27-.133-.449m-8.069-3.307h7.212L41.1,3.667l-3.638,13.8"/><path d="M99.384.071c.92,0,1.849.011,2.772-.005a.626.626,0,0,1,.7.532h0q3.5,12.554,7.018,25.1c.335,1.2.712,2.383,1.065,3.575.126.423.06.527-.371.541-1.271.043-2.541.068-3.812.116a.607.607,0,0,1-.7-.488.556.556,0,0,1-.008-.07c-.62-2.688-1.278-5.367-1.887-8.057-.106-.467-.3-.564-.75-.56q-3.9.031-7.81,0a.465.465,0,0,0-.544.369.308.308,0,0,0-.007.053c-.66,2.735-1.34,5.471-1.994,8.207a.557.557,0,0,1-.6.512h-.016c-1.142,0-2.284.021-3.426.03-.441,0-.529-.125-.4-.554q3.4-11.69,6.8-23.379c.5-1.73.964-3.469,1.446-5.2.167-.591.224-.634.832-.634h1.692V.075m3.757,17.417L99.594,3.808l-.076.015-3.6,13.668Z"/><path d="M10.651,25.167q.263-1.052.524-2.1c1.3-5.271,2.627-10.537,3.9-15.814.53-2.194.963-4.412,1.424-6.622a.524.524,0,0,1,.568-.477.133.133,0,0,1,.028,0C18.138.147,19.178.131,20.219.122c.467,0,.541.1.419.536q-3.3,12.048-6.594,24.1c-.41,1.5-.775,3.017-1.16,4.526-.143.56-.221.614-.8.623-1.256.02-2.512.038-3.768.083a.64.64,0,0,1-.731-.531l0-.022Q4.664,18.286,1.726,7.139.889,3.947.043.755C-.063.35.011.265.453.239,1.678.168,2.9.1,4.128,0c.392-.031.6.1.67.481.937,5.134,2.22,10.19,3.464,15.255q1.135,4.62,2.261,9.243c.015.063.033.124.05.186l.078.006"/><path d="M23.1,18.426c0-3.136.032-6.273-.009-9.41-.036-2.7-.154-5.406-.238-8.109-.022-.718.006-.74.733-.752,1.185-.019,2.37-.049,3.555-.078.511-.013.573.044.57.561-.025,4.825-.084,9.651-.066,14.477.014,3.678.118,7.356.191,11.034.022,1.057.084,2.114.118,3.173.016.486-.078.566-.573.576q-1.842.036-3.684.082c-.56.014-.663-.123-.643-.685.038-1.072.053-2.147.055-3.22.008-2.549,0-5.1,0-7.648H23.1"/><path d="M86.178,21.627c.075,2.589.146,5.178.233,7.766.011.36-.139.5-.472.5l-3.857.083c-.455.009-.566-.1-.564-.542.022-6.2.074-12.4.049-18.6-.012-3.333-.157-6.665-.242-10-.017-.652.011-.674.669-.684C83.15.132,84.306.1,85.461.079c.71-.017.722,0,.716.757-.03,3.865-.069,7.73-.084,11.6-.007,2.248.072,9.19.084,9.19"/></g></svg>
        </NuxtLink>
      </div>
    </div>

    <span v-if="isDev" class="bg-black text-white flex items-center justify-center fixed right-2 bottom-2 rounded-[50%] w-[30px] h-[30px] px-2 py-1 border border-neutral-200 z-[1000] font-bold text-xs">
      <span class="xs:hidden">XXS</span>
      <span class="hidden xs:block sm:hidden">XS</span>
      <span class="hidden sm:block md:hidden">SM</span>
      <span class="hidden md:block lg:hidden">MD</span>
      <span class="hidden lg:block xl:hidden">LG</span>
      <span class="hidden xl:block 2xl:hidden">XL</span>
      <span class="hidden 2xl:block 3xl:hidden">2XL</span>
      <span class="hidden 3xl:block 4xl:hidden">3XL</span>
      <span class="hidden 4xl:block">4XL</span>
    </span>
  </footer>
</template>

<style scoped>
.links {
  & ul {
    height: 0;
    transition: height 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    overflow: hidden;
    opacity: 0;

    @media (min-width: 1280px) {
      height: auto;
      min-height: 0;
      opacity: 1;

      overflow: auto;
      padding-top: 15px;
    }

    > li {
      &:last-child {
        padding-bottom: 20px;

        @media (min-width: 1280px) {
          padding-bottom: 0;
        }
      }
    }
  }

  label {
    &::after {
      content: "";
      background: 0 no-repeat transparent url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3e%3cline y2='10' transform='translate(5)' fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='1'/%3e%3cline x2='10' transform='translate(0 5)' fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='1'/%3e%3c/svg%3e");
      width: 10px;
      height: 10px;
      margin-left: auto;
      transition: transform 0.3s ease-in-out;

      @media (min-width: 1280px) {
        display: none;
      }
    }
  }
}

.links input[type="checkbox"] {
  display: none;
}

.links input[type="checkbox"]:checked {
  + label {
    font-weight: 500;

    &::after {
      transform: rotate(45deg);
      transition: transform 0.3s ease-in-out;
    }
    + ul {
      height: auto;
      min-height: 0;
      opacity: 1;
      transition: height, opacity 0.3s ease-in-out;
      overflow: auto;
    }
  }
}
</style>

<script setup lang="ts">
const viewport = useViewport();
const { t } = useI18n();
const localePath = useLocalePath();

const storename: string = useRuntimeConfig().public.storename;
const companyName: string = `© ${storename} ${new Date().getFullYear()}`;

const isDev: boolean = useRuntimeConfig().public.isDev;
</script>
