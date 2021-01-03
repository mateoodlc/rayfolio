<template>
  <div class="home max-bound">
    <div class="global-container">
      <header class="main-header">
        <img class="logo" alt="Vue logo" src="../assets/logo.svg">
        <router-link to="/about" class="about">about</router-link>
      </header>
      <main class="main-container">
        <h1>Portfolio</h1>
        <p>UI and motion designer working in design field since 2015.</p>
        <div class="home-navigation">
          <button class="home-navigation__element">Motion Reel</button>
          <div class="home-navigation__circle">
            <img src="" alt="" srcset="">
          </div>
          <button class="home-navigation__element">UI Design</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
