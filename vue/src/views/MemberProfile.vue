<template>
  <div class=" w-full min-h-screen bg-[#FF5482] place-content-center">
    <div v-if="player" class="isco-container p-8 grid grid-cols-3 gap-8 bg-white rounded-lg" ref="pdfSection">
      <img :src="playerImage" :alt="playerName" class="w-full h-80 object-cover rounded-lg" />

      <div class="bg-white">
        <div :class="{
          'text-red-500': !player.isAlive,
          'text-green-500': player.isAlive,
          'text-2xl font-semibold mb-2': true
        }">
          {{ player.isAlive ? 'Alive' : 'Dead' }}
        </div>
        <h1 class="mb-8">{{ player.Name }}</h1>
        <p class="text-lg mt-8">{{ player.EmergencyContact }}</p>
        <div class="text-lg mb-8 underline">{{ player.uid }}</div>
        <button @click="downloadPDF">Download as PDF</button>
      </div>
      <div class="flex place-content-end">
        <qrcode-vue :value="fullUrl"></qrcode-vue>
      </div>    
    </div>
    <div v-else>
      Loading player...
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const STRAPI_URL = "https://admin.testjellysuper.my.id";
const route = useRoute();
const player = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch player data
const fetchplayer = async (id) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/players/${id}?populate=*`);
    const data = await response.json();
    if (!data.data) throw new Error("Player not found");
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Reactive fetching based on route changes
watchEffect(async () => {
  loading.value = true;
  error.value = null;
  try {
    player.value = await fetchplayer(route.params.id);
  } catch (err) {
    error.value = err.message;
    player.value = null;
  } finally {
    loading.value = false;
  }
})

const fullUrl = computed(() => `${window.location.origin}${route.path}`);

// Computed properties
const playerName = computed(() => player.value?.Nama || "Unknown Player");

// Compute the image URL safely
const playerImage = computed(() => {
  return player.value?.Photo?.url ? `${STRAPI_URL}${player.value.Photo.url}` : "";
});
</script>



<!-- <script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const STRAPI_URL = "https://admin.testjellysuper.my.id";
const route = useRoute();
const player = ref(null);
const loading = ref(true);
const error = ref(null);


const fetchplayer = async (id) => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/players/${id}?populate=*`);
    const data = await response.json();
    if (!data.data) throw new Error("player not found");
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Reactive fetching based on route changes
watchEffect(async () => {
  loading.value = true;
  error.value = null;
  try {
    player.value = await fetchplayer(route.params.id);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const playerName = computed(() => player.value?.Nama);



</script> -->

<script>
import html2pdf from "html2pdf.js";
import QrcodeVue from "qrcode.vue";

export default {
  components: { QrcodeVue },
  props: { player: Object },
  methods: {
    downloadPDF() {
      html2pdf().from(this.$refs.content).save("download.pdf");
    },
  },
};
</script>
