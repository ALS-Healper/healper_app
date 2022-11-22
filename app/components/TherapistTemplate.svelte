<script>
    import TherapistNavbar from "./TherapistNavbar.svelte";
</script>
<page>
    <TherapistNavbar>
        <slot />
    </TherapistNavbar>
</page>

<style>
    page{
        background: linear-gradient(122deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }
</style>