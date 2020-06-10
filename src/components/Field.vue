<template>
  <label class="input-field">
    <input
      class="input-field__input" type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <button
      class="input-field__button"
      @click="$emit('click')"
    >Искать</button>
  </label>
</template>

<script>
export default {
  name: 'Field',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.input-field {
  display: block;
  position: relative;

  &__input {
    display: block;
    width: 100%;
    padding: 20px 10px;
    border: 1px solid #0092ee;
    border-radius: 3px;
    background-color: #fff;
  }

  &__icon {
    position: absolute;
    background-color: #eee;
    padding: 5px 10px;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
    border: 1px solid #42b983;
  }

  &__button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
  }
}
</style>
