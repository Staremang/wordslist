<template>
  <div class="word-item">
    <div class="word-item__header">
      <VueNestableHandle v-if="canMove" class="word-item__left" :item="word">
        <svg class="word-item__icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
        </svg>
      </VueNestableHandle>

      <div class="word-item__center" @click="isOpen = !isOpen">
        <span class="word-item__word">{{ word.hwi.hw }}</span>
        <span class="word-item__part">{{ word.fl }}</span>
        <span class="word-item__info">{{ word.shortdef.join(', ') }}</span>
      </div>

      <div class="word-item__right">
        <button
          v-if="!isFavorite"
          class="word-item__button"
          @click="add"
          title="Добавить в избранное"
        >
          <svg height="16" width="16" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
        </button>
        <button
          v-else
          class="word-item__button"
          @click="remove"
          title="Удалить из избранного"
        >
          <svg height="16" width="16" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="word-item__body" v-show="isOpen">
      <p v-if="word.hwi.prs">\{{ word.hwi.prs[0].mw }}\</p>
      <ol>
        <li v-for="(def, i) in word.shortdef" :key="i">
          {{ def }}
          <!--<div><strong>{{ tr.text }}</strong> <i>{{ tr.gen }}</i></div>-->
          <!--<div>{{ tr.mean.flatMap(w => w.text).join(', ') }}</div>-->
        </li>
      </ol>
    </div>
  </div>
</template>
<script>

import { VueNestableHandle } from 'vue-nestable';

// import { mapActions } from 'vuex';

export default {
  name: 'Word',
  components: {
    VueNestableHandle,
  },
  props: {
    canMove: {
      type: Boolean,
      default: false,
    },
    word: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    // previewText() {
    //   if (this.word.tr) {
    //     return this.word.tr.flatMap((item) => item.text).join(', ');
    //   }
    //   return '';
    // },
    isFavorite() {
      return this.$store.getters.getAllUUID.indexOf(this.word.meta.uuid) !== -1;
    },
  },
  methods: {
    add() {
      this.$store.dispatch('addToFavorite', this.word);
    },
    remove() {
      this.$store.dispatch('removeFromFavorite', this.word);
    },
  },
};
</script>
<style lang="scss">

.word-item {
  background-color: #fff;
  margin-bottom: 10px;


  &__header {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }

  &__left {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &__right {

  }

  &__center {
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    flex: 1 0;
    margin: 0 10px;

    span {
      margin-right: 20px;
    }
  }

  &__word {
    font-weight: bold;
  }

  &__part {
    font-style: italic;
  }

  &__info {
    /*text*/
  }

  &__body {
    padding: 10px 20px;
    border-top: 1px solid #aaaaaa;
  }

  &__button {
    cursor: pointer;
    background: none;
    border: 0;
    box-shadow: none;
    display: flex;
    outline: none !important;
  }
}
</style>
