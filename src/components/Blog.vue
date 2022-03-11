<template>
  <router-link :to="{ name: 'Blog', params: { id: blogData.id } }">
    <div class="row blog shadow border p-2 m-2 selectable">
      <div class="col-12">
        <div>
          <h3>Blogger: {{ blogData.creator?.name }}</h3>
          <h4>{{ blogData.title }}</h4>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    blogData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.blog {
  min-height: 20vh;
  transition: all 0.12s ease;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
}
.blog:hover {
  transform: scale(1.05);
  outline: 1px solid var(--bs-light);
  box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.3);
}
</style>