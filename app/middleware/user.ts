export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoaded, isSignedIn } = useAuth()

  if (isLoaded.value && !isSignedIn.value) {
    return navigateTo('/')
  }
  setPageLayout('user')
})
