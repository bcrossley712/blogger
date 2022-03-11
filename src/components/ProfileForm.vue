<template>
  <form @submit.prevent="editProfile">
    <div class="row profile-form">
      <div class="col-6 mb-3">
        <input
          v-model="editable.name"
          type="text"
          class="form-control"
          name="name"
          id="name"
          placeholder="Name..."
        />
      </div>
      <div class="col-6 mb-3">
        <input
          v-model="editable.bio"
          type="text"
          class="form-control"
          name="bio"
          id="bio"
          placeholder="bio..."
        />
      </div>

      <div class="col-6 mb-3">
        <input
          v-model="editable.imgUrl"
          type="text"
          class="form-control"
          name="imgUrl"
          id="imgUrl"
          placeholder="imgUrl..."
        />
      </div>
      <div class="col-6 mb-3">
        <input
          v-model="editable.email"
          type="text"
          class="form-control"
          name="email"
          id="email"
          placeholder="email..."
        />
      </div>
      <button class="btn btn-outline-warning">Edit Profile</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { Modal } from "bootstrap";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async editProfile() {
        try {
          //Pass the id from the active profile in the AppState and data from editable object
          await profilesService.editProfile(
            AppState.profile.id,
            editable.value
          );
          Modal.getOrCreateInstance(
            document.getElementById("profile-modal")
          ).hide();
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