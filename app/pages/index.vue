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
    <div class="justify-center items-start px-8 flex flex-col">
      <ClientOnly>
        <BlurReveal
          :delay="0.2"
          :duration="0.75"
          class="flex flex-col gap-4 sm:items-start items-center"
        >
          <div class="text-5xl sm:text-6xl font-bold font-serif" as-child>
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
                Getting Started
              </Button>
            </SignInButton>
            <Button class="mt-1" variant="secondary" as-child>
              <NuxtLink href="/">
                Why us
              </NuxtLink>
            </Button>
          </div>
        </BlurReveal>
      </ClientOnly>
    </div>
    <div class="justify-center items-center flex-row flex-1 sm:flex hidden">
      <img src="/website.png" class="max-h-[405px]">
      <img src="/mobile.jpg" class="hidden xl:inline max-h-[405px]">
    </div>
  </div>
  <div class="sm:px-20 px-5 flex flex-col gap-10">
    <div class="flex sm:h-[calc(100vh_-_70vh_-_57px_-_20px)] h-[50vh] sm:flex-row flex-col gap-5">
      <Card class="flex-1 flex flex-col items-center justify-center">
        <CardContent class="px-10 !pb-0">
          <div class="text-xl font-bold">
            What is MindForge? 🤔
          </div>
          <div class="text-sm text-zinc-500">
            Your evolving digital twin. Beyond data, it gets your emotions, keeps your thoughts, and grows with you. More than a journal—it's your reflective journey.
          </div>
        </CardContent>
      </Card>
      <Card class="flex-1 flex flex-col items-center justify-center">
        <CardContent class="px-10 !pb-0">
          <div class="text-xl font-bold">
            How Does It Grow With You? 🌱
          </div>
          <div class="text-sm text-zinc-500">
            Multi-agent AI listens & learns. MindForge becomes your emotional mirror: noticing patterns, supporting struggles, reflecting your path
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="px-5 flex flex-col gap-10">
      <!-- Why us -->
      <h1 class="text-3xl font-bold">
        Why us?
      </h1>

      <Table>
        <TableCaption>
          Our special points vs
          <NuxtLink class="border-b-[1px] border-accent-foreground" to="https://secondme.io/">
            <span>Second Me</span>
          </NuxtLink> & <NuxtLink class="border-b-[1px] border-accent-foreground" to="https://me.bot/">
            <span>Me.bot</span>
          </NuxtLink>.
        </TableCaption>
      </Table>
    </div>
  </div>
</template>

<style></style>
