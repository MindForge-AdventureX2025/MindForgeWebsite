<template>111</template>

<script lang="ts" setup>
const { isLoaded, isSignedIn } = useAuth();

if (isLoaded.value && isSignedIn.value) {
  await navigateTo("/home");
}
</script>

<style></style>
