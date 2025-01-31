<template>
  <div id="app">
    <nav class="bg-gray-800 text-white p-4">
      <router-link to="/" class="mr-4">Home</router-link>
    </nav>

    <main class="p-4">
      <router-view></router-view> <!-- This is where the current page/component will be loaded -->
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      STRAPI_URL: "http://localhost:1337" // Replace with your actual Strapi URL
    };
  }
};
</script>