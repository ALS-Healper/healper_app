<script>
    import ClientNavbar from "./ClientNavbar.svelte";
</script>
<page>
    <ClientNavbar>
        <slot />
    </ClientNavbar>
</page>
<style>
    page{
        background: linear-gradient(-120deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }
</style>