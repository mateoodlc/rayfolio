<script>
  export default {
    name: "App",
    methods: {
      hasHistory() {
        return window.history.length > 2;
      }
    }
  }
</script>