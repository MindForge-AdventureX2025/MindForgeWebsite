<script lang="ts" setup>
const { isLoaded, isSignedIn } = useAuth()

console.log(isLoaded, isSignedIn)
if (isLoaded.value && isSignedIn.value) {
  await navigateTo('/home')
}
</script>

<template>
  111
</template>

<style></style>
