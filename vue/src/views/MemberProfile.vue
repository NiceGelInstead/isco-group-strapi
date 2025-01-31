<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const STRAPI_URL = "http://localhost:1337";
const route = useRoute();
const member = ref(null);
const loading = ref(true);
const error = ref(null);

const getMember = async () => {
  try {
    const documentId = route.params.id;
    const response = await fetch(`${STRAPI_URL}/api/members/${documentId}?populate=*`);
    const data = await response.json();

    console.log("Full API Response:", data); 
    console.log("Member Object:", data.data);
    console.log("Nama:", data.data.Nama);

    if (!data.data) {
      throw new Error("Member not found");
    }

    member.value = data.data; // ✅ Directly use data.data
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getMember();
});


</script>

<script>
import html2pdf from "html2pdf.js";;
import QrcodeVue from 'qrcode.vue';

export default {
  components: {
    QrcodeVue
  },
  props: {
    member: Object // Assuming member is passed as a prop
  },
  methods: {
    downloadPDF() {
      const content = this.$refs.content;
      html2pdf().from(content).save("download.pdf");
    }
  }
};
</script>

<template>
    <div>
        <section ref="content" id="pdf-content">
                <div v-if="member" class="max-w-2xl mx-auto p-4">
                  <img
                    v-if="member.Foto"
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
                    <h1 class="text-2xl font-bold text-center mt-4 text-red-500">Nama</h1>
                    <h1 class="text-xl font-bold text-center mt-4 text-blue-500">{{ member.Nama }}</h1>
                    <h1 class="text-2xl font-bold text-center mt-4 text-red-500">ID</h1>
                    <h1 class="text-xl font-bold text-center mt-4 text-blue-500">{{ member.documentId }}</h1>
                    <h1 class="text-2xl font-bold text-center mt-4 text-red-500">Nomor KTA</h1>
                    <h1 class="text-xl font-bold text-center mt-4 text-blue-500">{{ member.NomorKTA }}</h1>
                    <qrcode-vue :value="`https://5174-idx-isco-group-strapi-1737365982434.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/members/${member.documentId}`"></qrcode-vue>
                </div>
                <div v-else>
                    LOL
                </div>
        </section>
        <button @click="downloadPDF">Download as PDF</button>
    </div>
    


<!-- Button to trigger PDF download
<button @click="downloadPdf">Download PDF</button> -->
</template>
