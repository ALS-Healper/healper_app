<script>
    import ClientNavbar from "./ClientNavbar.svelte"
</script>
<page>
    <ClientNavbar>
        <slot />
    </ClientNavbar>
</page>
<style>
    page{
        background-image: url("~/static-resources/images/icons/logo.png");
        background: linear-gradient(125deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }
</style>