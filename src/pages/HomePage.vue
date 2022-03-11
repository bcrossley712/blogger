<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6" v-for="b in blogs" :key="b.id">
        <Blog :blogData="b" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { blogsService } from "../services/BlogsService";
import { AppState } from "../AppState";
export default {
  setup() {
    onMounted(async () => {
      try {
        await blogsService.getAll();
      } catch (error) {
        logger.error(error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      blogs: computed(() => AppState.blogs),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
