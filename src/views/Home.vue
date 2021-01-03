<template>
  <div class="home">
    <div class="global-container max-bound">
      <header class="main-header">
        <img class="logo" alt="Vue logo" src="../assets/logo.svg">
        <router-link to="/about" class="about">about</router-link>
      </header>
      <main class="main-container">
        <h1>Portfolio</h1>
        <p>UI and motion designer working in design field since 2015.</p>
        <div class="home-navigation">
          <div class="home-navigation__element">Motion Reel</div>
          <div class="home-navigation__circle">
            <img src="" alt="" srcset="">
          </div>
          <div class="home-navigation__element">UI Design</div>
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
