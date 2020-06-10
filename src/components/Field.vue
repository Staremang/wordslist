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
    >
      <svg class="input-field__icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
      </svg>
    </button>
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
    width: 16px;
    height: 16px;
    /*position: absolute;*/
    /*top: 50%;*/
    /*right: 10px;*/
    // transform: translateY(-50%);
    // z-index: 1;
  }

  &__button {
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
    background: none;
    border: 0;
    box-shadow: none;
  }
}
</style>
