<script lang="ts" setup>
const isDark = computed(() => useColorMode().value === 'dark')

const { isLoaded, isSignedIn } = useAuth()

if (isLoaded.value && isSignedIn.value) {
  await navigateTo('/home')
}
</script>

<template>
  <ParticlesBg
    class="inset-0 absolute sm:h-[calc(70vh_+_57px)] h-screen pointer-events-none"
    :quantity="100"
    :ease="100"
    :color="isDark ? '#FFF' : '#000'"
    :staticity="10"
    refresh
  />
  <div class="w-full sm:h-[70vh] h-[90vh] flex sm:px-10 px-1">
    <div class="justify-center items-center flex flex-col flex-1">
      <ClientOnly>
        <BlurReveal
          :delay="0.2"
          :duration="0.75"
          class="flex flex-col gap-4 sm:items-start items-center"
        >
          <div class="text-5xl sm:text-6xl font-bold" as-child>
            <span style="color: rgb(131, 179, 32)">M</span>
            <span style="color: rgb(47, 195, 106)">i</span>
            <span style="color: rgb(42, 169, 210)">n</span>
            <span style="color: rgb(4, 112, 202)">d</span>
            <span style="color: rgb(107, 10, 255)">F</span>
            <span style="color: rgb(183, 0, 218)">o</span>
            <span style="color: rgb(218, 0, 171)">r</span>
            <span style="color: rgb(230, 64, 92)">g</span>
            <span style="color: rgb(232, 98, 63)">e</span>
          </div>
          <div class="flex flex-col">
            <span class="text-3xl">Your Digital Twin.</span>
            <span class="text-3xl">Make AdventureX Great Again.</span>
          </div>
          <div class="flex gap-2">
            <SignInButton as-child>
              <Button class="cursor-pointer mt-1">
                Getting Start
              </Button>
            </SignInButton>
            <Button class="mt-1" variant="secondary" as-child>
              <NuxtLink href="/">
                Why US
              </NuxtLink>
            </Button>
          </div>
        </BlurReveal>
      </ClientOnly>
    </div>
    <div class="justify-center items-center flex-col flex-1 sm:flex hidden">
      <!-- <IndexDrillCanvas /> -->
    </div>
  </div>
</template>

<style></style>
