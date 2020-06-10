<template>
  <div class="inner">
    <div class="inner__top">
      <slot name="top"></slot>
    </div>
    <div class="inner__sidebar">
      <div class="sidebar-block">
        <slot name="sidebar"></slot>
      </div>
    </div>
    <div class="inner__main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inner',
};
</script>

<style lang="scss">
.inner {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;

  &__top {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 10px;
  }

  &__sidebar {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 10px;
  }

  &__main {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 10px;
  }

  @media all and (min-width: 1070px) {
    &__sidebar {
      flex: 0 0 30%;
      max-width: 30%;
    }

    &__main {
      flex: 0 0 70%;
      max-width: 70%;
    }
  }
}

.sidebar-block {
  background-color: #fff;
  padding: 20px;
}

</style>
