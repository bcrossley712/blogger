<template>
  <div class="container-fluid">
    <div class="row w-100 m-2 p-3 shadow bg-dark text-light rounded d-flex">
      <div class="col-6">
        <h1>{{ blog.title }}</h1>
        <p class="border border-light border-2 rounded p-2">{{ blog.body }}</p>
        <div class="selectable d-flex" @click="goTo">
          <p class="p-2">{{ blog.creator?.name }}</p>
          <p class="p-2">{{ blog.creator?.email }}</p>
          <img class="profile-img" :src="blog.creator?.coverImg" alt="" />
        </div>
        <!-- Conditional buttons if the blog belongs to user -->
        <div class="row d-flex w-100 justify-content-around p-2">
          <button
            data-bs-toggle="modal"
            data-bs-target="#blog-modal"
            v-if="account.id == blog.creatorId"
            class="btn btn-outline-warning col-3"
          >
            Edit Blog
          </button>
          <button
            @click="deleteBlog"
            v-if="account.id == blog.creatorId"
            class="btn btn-outline-danger col-3"
          >
            Delete Blog
          </button>
        </div>
      </div>
      <div class="col-6">
        <img class="img-fluid" :src="blog.imgUrl" alt="" />
      </div>
    </div>
    <Modal id="blog-modal">
      <template #title>Edit Blog</template>
      <template #body><BlogForm /></template>
    </Modal>
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
      blog: computed(() => AppState.activeBlog),
      account: computed(() => AppState.account),
      async deleteBlog() {
        try {
          if (await Pop.confirm()) {
            await blogsService.deleteBlog(route.params.id);
            Pop.toast("Deleted post!", "success");
            router.push({
              name: "Profile",
              params: { id: AppState.profile.id },
            });
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      goTo() {
        router.push({
          name: "Profile",
          params: { id: AppState.activeBlog?.creatorId },
        });
      },
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