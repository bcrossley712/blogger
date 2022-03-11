<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">This is Profile Page</div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profilesService.getProfile();
      } catch (error) {}
    });
    return {
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style>
</style>