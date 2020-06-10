<template>
  <Inner>
    <template v-slot:top>
      <h1>Избранное</h1>
    </template>

    <template v-slot:sidebar>
      <Field v-model="field" />

      <div class="checkbox-list" v-if="partsOfSpeech.length > 0">
        <label
          class="input-checkbox"
          v-for="part in partsOfSpeech"
          :key="part"
        >
          <input
            class="input-checkbox__text"
            type="checkbox"
            :value="part"
            v-model="checkedParts"
          >
          <span class="input-checkbox__label">
            {{ part }}
          </span>
        </label>
      </div>
    </template>

    <template v-slot:main>
      <VueNestable
        :value="filteredBySearch"
        :max-depth="1"
        key-prop="uuid"
        @input="$store.commit('SET_ITEMS', $event)"
      >
        <template v-slot:placeholder>
          <b>Cписок пуст</b>
        </template>

        <template slot-scope="{ item }">
          <Word
            :word="item"
            :can-move="field === '' && checkedParts.length === 0"
          />
        </template>
      </VueNestable>
    </template>
  </Inner>
</template>

<script>
import { mapState } from 'vuex';

import { VueNestable } from 'vue-nestable';

import Word from '@/components/Word';
import Field from '@/components/Field';
import Inner from '@/components/Inner';


export default {
  name: 'Favorites',
  components: {
    VueNestable,
    Inner,
    Field,
    Word,
  },
  data() {
    return {
      field: '',
      checkedParts: [],
      status: '',
    };
  },
  mounted() {
    this.$store.dispatch('getFromLocal');
  },
  computed: {
    ...mapState({
      items: 'list',
    }),

    /**
     * Отфильтрованный по части речи
     */
    filteredByParts() {
      return this.checkedParts.length === 0
        ? this.items
        : this.items.filter(item => this.checkedParts.indexOf(item.fl) !== -1);
    },

    /**
     * Отфильтрованный по слову
     */
    filteredBySearch() {
      return this.field === ''
        ? this.filteredByParts
        : this.filteredByParts.filter(item => item.hwi.hw.indexOf(this.field) !== -1);
    },

    /**
     * Сортированный список частей речии
     */
    partsOfSpeech() {
      return this.items
        .reduce((acc, item) => {
          acc.indexOf(item.fl) === -1 && acc.push(item.fl);
          return acc;
        }, [])
        .sort();
    },

  },
};
</script>


<style lang="scss">
.checkbox-list {
  margin-top: 20px;
}

.input-checkbox {
  display: flex;
  padding: 5px 0;
  cursor: pointer;

  &__label {
    margin-left: 10px;
  }
}

.nestable {
  position: relative;

  .nestable-list {
    margin: 0;
    list-style-type: none;
    padding: 0;
  }
}

.nestable-item,
.nestable-item-copy {
  margin: 10px 0 0;

  &:first-child {
    margin-top: 0;
  }

  .nestable-list {
    margin-top: 10px;
  }
}

.nestable-item {
  position: relative;

  &.is-dragging {
    .nestable-list {
      pointer-events: none;
    }

    * {
      opacity: 0;
      filter: alpha(opacity=0);
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(106, 127, 233, 0.274);
      border: 1px dashed rgb(73, 100, 241);
      border-radius: 5px;
    }
  }
}


.nestable-drag-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;

  > .nestable-list {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    background-color: rgba(106, 127, 233, 0.274);
  }
}

.nestable [draggable="true"] {
  cursor: move;
}
</style>
