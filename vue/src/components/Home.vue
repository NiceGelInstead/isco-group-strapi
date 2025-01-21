<template>
    <AppLayout>
      <template #default>
        <div class="content">
          <h1>Welcome to ISCO GROUP</h1>
          <p>This is the home page content.</p>
        </div>
      </template>
    </AppLayout>
  </template>
  
  <script>
  import AppLayout from "@/layouts/App.vue";
  
  export default {
    components: {
      AppLayout,
    },
  };
  </script>
  