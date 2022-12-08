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
        background: linear-gradient(125deg, rgba(199, 222, 222, 1) 0%, rgba(199, 222, 231, 1));
    }
</style>