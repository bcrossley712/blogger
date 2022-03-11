<template>
  <!-- Set up template for profile page -->
  <div class="container-fluid">
    <div class="row shadow rounded m-3 bg-white">
      <div class="col-12 about text-center p-2">
        <h1>{{ profile.name }}</h1>
        <img
          class="rounded img-fluid profile-img"
          :src="profile.coverImg"
          alt=""
        />
        <p>{{ profile.email }}</p>
        <!-- Conditional button -->
        <button
          v-if="profile.id == account.id"
          data-bs-toggle="modal"
          data-bs-target="#profile-modal"
          class="btn btn-outline-warning"
        >
          Edit Profile
        </button>
      </div>
    </div>
    <div class="row m-3">
      <div class="col-12">
        <!-- Conditional BlogForm -->
        <BlogForm v-if="profile.id == account.id" />
      </div>
    </div>
    <div
      class="row d-flex flex-column align-items-center justify-content-center"
    >
      <!-- Iteration for individuals personal blogs -->
      <div class="col-8" v-for="b in blogs" :key="b.id">
        <Blog :blogData="b" />
      </div>
    </div>
    <Modal id="profile-modal">
      <template #title>Edit Profile</template>
      <template #body><ProfileForm /></template>
    </Modal>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { blogsService } from "../services/BlogsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        //Clear active blog for correct conditional form
        AppState.activeBlog = {};
        //Pass id of profile of person who created post from route
        await profilesService.getProfile(route.params.id);
        // Got all blogs from this specific user by passing creatorId as a query
        await blogsService.getAll({ creatorId: route.params.id });
      } catch (error) {
        logger.error(error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.profile),
      // Have to make the blogs reactive
      blogs: computed(() => AppState.blogs),
      //Define account so I can call on it in template for conditional button
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style>
.profile-img {
  height: 200px;
}
</style>