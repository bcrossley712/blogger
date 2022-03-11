<template>
  <!-- Created a blog form for a new blog. -->
  <form
    @submit.prevent="handleSubmit"
    class="row bg-white justify-content-center shadow rounded p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Blog title</label>
      <input
        v-model="editable.title"
        required
        type="text"
        class="form-control"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Image</label>
      <input
        v-model="editable.imgUrl"
        required
        type="text"
        class="form-control"
      />
    </div>
    <div class="col-12 mb-2">
      <label for="" class="form-label">Body</label>
      <input
        v-model="editable.body"
        required
        type="text"
        class="form-control"
      />
    </div>
    <!-- Conditional if active blog exists show edit, otherwise show create -->
    <div v-if="blog.creator?.name" class="col-12 d-flex justify-content-end">
      <button class="btn btn-outline-warning">Edit</button>
    </div>
    <div v-else class="col-12 d-flex justify-content-end">
      <button class="btn btn-outline-primary">Create</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { blogsService } from "../services/BlogsService";
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { Modal } from "bootstrap";
import { useRoute } from "vue-router";
export default {
  setup() {
    // Two way binding with editable and v-model(s) in the template
    const editable = ref({});
    const route = useRoute();
    //Watcheffect to populate content in the blog being edited
    watchEffect(() => {
      editable.value = AppState.activeBlog;
    });
    return {
      editable,
      blog: computed(() => AppState.activeBlog),
      async handleSubmit() {
        try {
          if (AppState.activeBlog.id == route.params.id) {
            //If active blog exists, go on to edit. Otherwise create.
            await blogsService.editBlog(AppState.activeBlog.id, editable.value);
            editable.value = {};
            Modal.getOrCreateInstance(
              document.getElementById("blog-modal")
            ).hide();
          } else {
            // Create blog by passing the editable value onto the service
            await blogsService.createBlog(editable.value);
            editable.value = {};
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>