<template>
  <div>asd</div>
</template>

<script lang="ts" setup>
const { isLoaded, isSignedIn } = useAuth();

if (isLoaded.value && !isSignedIn.value) {
  navigateTo("/");
}

definePageMeta({
  middleware: ["user"],
  layout: false,
});
</script>

<style></style>
