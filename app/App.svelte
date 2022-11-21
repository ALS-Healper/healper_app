<script>
    import { onMount } from 'svelte';
    import Home from './pages/Home.svelte'
    import LoginPage from './pages/LoginPage.svelte'
    

    let login = false;
    onMount(() =>{
        // store login?
    })
</script>
{#if login}
    <!-- {#if login.isThera}
        <frame>
        <TheraHome />
    </frame>
    {/if} -->
    <!-- {#if login.isClient}
        <frame>
        <Home />
    </frame>
    {/if} -->
    {:else}
    <frame>
        <LoginPage />
    </frame>
{/if}

