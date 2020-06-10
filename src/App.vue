<template>
  <div class="app">
    <header class="header">
      <div class="header__logo">Word Keeper</div>
      <div class="header__nav">
        <router-link
          class="header__link"
          to="/"
          exact
          active-class="active"
        >
          Словарь
        </router-link>

        <router-link
          class="header__link"
          to="/favorites"
          exact
          active-class="active"
        >
          Избранное
        </router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-family: sans-serif;
  background-color: #eee;
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}


.app {
  padding: 10px;
}

.header {
  background: #0092ee;
  color: #fff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  &__logo {
    padding: 20px 0;
    font-size: 24px;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
  }

  &__link {
    display: inline-block;
    text-transform: uppercase;
    color: #eee;
    text-decoration: none;
    padding: 30px 20px 27px;
    border-bottom: 3px solid transparent;

    &.active {
      color: #fff;
      border-bottom: 3px solid #fff;
    }
  }
}


</style>
