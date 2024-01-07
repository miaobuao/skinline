export default defineNuxtRouteMiddleware(async () => {
  return navigateTo({
    name: 'user-login',
  });
});
