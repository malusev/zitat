<template>
  <div v-html="newPage"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailsPage",
  data() {
    return {
      newPage: "lodaing",
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const id = this.$route.params.id;
      const response = await axios.get(
        "https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/" + id
      );
      this.newPage = response.status === 200 ? response.data : "no results";
    },
  },
};
</script>