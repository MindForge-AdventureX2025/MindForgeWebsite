<template>111</template>

<script lang="ts" setup>
const { isLoaded, isSignedIn } = useAuth();

console.log(isLoaded, isSignedIn);
if (isLoaded.value && isSignedIn.value) {
  navigateTo("/home");
}
</script>

<style></style>
