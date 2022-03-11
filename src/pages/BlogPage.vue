<template>
  <div class="container-fluid">
    <div class="row w-100 m-2 p-3 shadow bg-dark text-light rounded">
      <div class="col-12 w-100">
        <h1>{{ blog.title }}</h1>
        <p class="border border-light border-2 rounded p-2">{{ blog.body }}</p>
        <div class="selectable d-flex" @click="goTo">
          <p class="p-2">{{ blog.creator?.name }}</p>
          <p class="p-2">{{ blog.creator?.email }}</p>
          <img class="profile-img" :src="blog.creator?.coverImg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { blogsService } from "../services/BlogsService";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        await blogsService.getById(route.params.id);
      } catch (error) {
        logger.error(error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      goTo() {
        router.push({
          name: "Profile",
          params: { id: AppState.activeBlog?.creatorId },
        });
      },
      blog: computed(() => AppState.activeBlog),
    };
  },
};
</script>

<style scoped>
.profile-img {
  height: 50px;
  width: 50px;
}
</style>