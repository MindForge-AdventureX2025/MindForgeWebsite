export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isLoaded, isSignedIn } = useAuth()

  if (isLoaded.value && !isSignedIn.value) {
    return navigateTo('/')
  }
  setPageLayout('user')
})
