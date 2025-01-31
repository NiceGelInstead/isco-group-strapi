<template>
<div class="p-6">
    <h1 class="text-4xl text-primary font-bold mb-8">ISCO Membership</h1>
    <div>
      <h2 class="text-2xl font-semibold mb-6">Members</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            :src="STRAPI_URL + article.cover.url"
            alt="Article Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">{{ article.title }}</h3>
            <p class="text-gray-600 mb-4">{{ article.content }}</p>
            <p class="text-sm text-gray-500">
              Published: {{ formatDate(article.publishedAt) }}
            </p>
          </div>
        </article> -->
        <member
          v-for="member in members"
          :key="member.id"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
        <img
  v-if="member.Foto && member.Foto.url"
  :src="STRAPI_URL + member.Foto.url"
  alt="member Image"
  class="w-full h-48 object-cover"
/>
<img
  v-else
  src="" 
  alt="Default Member Image"
  class="w-full h-48 object-cover"
/>
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">{{ member.Nama }}</h3>
            <p class="text-gray-600 mb-4">{{ member.Email }}</p>
            <p class="text-sm text-gray-500">
              Published: {{ formatDate(member.publishedAt) }}
            </p>
          </div>
          <div class="p-4">
    <h2 class="text-lg font-semibold">{{ member.idMember }}</h2>
    <router-link
      :to="`/members/${member.documentId}`"
      class="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
    >
      Check their profile
    </router-link>
  </div>
        </member>
      </div>
    </div>
  </div>
</template>

  <script setup>
// Import dependencies
import { ref, onMounted } from "vue";

// Strapi Base URL
const STRAPI_URL = "http://localhost:1337";

// Variables
const articles = ref([]);

// Fetch articles
const getArticles = async () => {
  const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
  const data = await response.json();
  articles.value = data.data;
};

// Format date
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Fetch articles on component mount
onMounted(() => {
  getArticles();
});

// Variables
const members = ref([]);

// Fetch members
const getMembers = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/members?populate=*`);
    const data = await response.json();
    members.value = data.data;
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};



// Fetch members on component mount
onMounted(() => {
  getMembers();
});


</script>