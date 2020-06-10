<template>
  <Inner>
    <template v-slot:top>
      <h1>Поиск слов</h1>
    </template>

    <template v-slot:sidebar>
      <Field v-model="field" @click="getWords" />


      <ul class="autocomplete">
        <li
          v-for="word in autocomplete"
          :key="word"
        >
          <a href="#" @click.prevent="field = word">{{ word }}</a>
        </li>
      </ul>
    </template>

    <template v-slot:main>
      <template v-if="list.length === 0">
        <b v-if="field.length === 0">Введите слово для поиска</b>
        <b v-else-if="status === 'loading'">Загрузка...</b>
        <b v-else-if="status === 'error'">Ошибка!</b>
        <b v-else>Не найдено</b>
      </template>
      <Word
        v-else
        v-for="word in list"
        :key="word.uuid"
        :word="word"
      />
    </template>
  </Inner>
</template>

<script>
import debounce from 'lodash.debounce';

import Word from '@/components/Word';
import Field from '@/components/Field';
import Inner from '@/components/Inner';

const APP_KEY = 'e1edeeea-3540-4b7d-a7bf-fa0a143a6ec4';

export default {
  name: 'Home',
  components: {
    Inner,
    Word,
    Field,
  },
  data() {
    return {
      field: '',
      list: [],
      autocomplete: [],
      status: '',
    };
  },
  watch: {
    field(value) {
      if (value.length > 0) {
        this.debouncedGetWords();
      }
    },
  },
  created() {
    this.debouncedGetWords = debounce(this.getWords, 500);
  },
  methods: {
    /**
     * Поиск по слову
     */
    getWords() {
      let url = `https://dictionaryapi.com/api/v3/references/sd4/json/`;

      /** Слово */
      url += `${this.field}/?`;

      /** Api ключ */
      url += `&key=${APP_KEY}`;

      this.status = 'loading';

      fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
          if (json.error) {
            const error = new Error(json.error);
            error.response = json;
            throw error;
          }

          return json;
        })
        .then((json) => {
          this.status = null;

          // this.list = json.map(item => ({
          //   uuid: item.meta.uuid,
          //   ...item,
          // }));

          if (typeof json[0] === 'string') {
            this.autocomplete = json;
          } else {
            this.autocomplete = [];
            this.list = json.map(item => ({
              uuid: item.meta.uuid,
              ...item,
            }));
          }
        })
        .catch((e) => {
          this.status = 'error';

          console.log(e);
          // setTimeout(() => {
          //   this.status = null;
          // }, 2000);
        });
    },
  },
};
</script>


<style lang="scss">

</style>
