<template>
<div class="p-6">
    <h1 class="text-4xl text-primary font-bold mb-8">ISCO playership</h1>
    <div>
      <h2 class="text-2xl font-semibold mb-6">players</h2>
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
        <player
          v-for="player in players"
          :key="player.id"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
        <img
          :src="player.Photo?.url ? STRAPI_URL + player.Photo.url : ''"
          alt="Player Image"
          class="w-full h-48 object-cover"
        />
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">{{ player.Name }}</h3>
            <p class="text-gray-600 mb-4">{{ player.EmergencyContact }}</p>
            <p class="text-sm text-gray-500">
              Published: {{ formatDate(player?.TimeOfDeath) }}
            </p>
          </div>
          <div class="p-4">
    <h2 class="text-lg font-semibold">{{ player.uid }}</h2>
    <router-link
      :to="`/players/${player.documentId}`"
      class="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
    >
      Check their profile
    </router-link>
  </div>
        </player>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const STRAPI_URL = "https://admin.testjellysuper.my.id";
const players = ref([]);

// Fetch Players Data
const getPlayers = async () => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/players?populate=*`);
    const data = await response.json();
    players.value = data.data;
  } catch (error) {
    console.error("Error fetching players:", error);
  }
};

// Format Date Function
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
};

// Fetch players when the component is mounted
onMounted(getPlayers);
</script>