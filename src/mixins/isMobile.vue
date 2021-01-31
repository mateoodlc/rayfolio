<script>
export default {
    data() {
        return {
            windowWidth: window.innerWidth
        }
    },
    computed: {
        isMobile() {
            return this.windowWidth < 900;
        },
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        })
    }
}
</script>