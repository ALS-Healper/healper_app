<script>
    import Navbar from "./Navbar.svelte"
</script>
<page>
    <Navbar>
        <slot />
    </Navbar>
</page>

<style>
    page{
        background: linear-gradient(122deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }
</style>