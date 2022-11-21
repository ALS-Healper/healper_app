<script>
    import { onMount } from 'svelte';
    import { subscribe } from 'svelte/internal';
    import Home from './pages/Home.svelte'
    import TheraHome from './pages/TheraHome.svelte';
    import LoginPage from './pages/LoginPage.svelte'
    import { user } from './store/userStore.js'

    let loginUser;
    let login = false;
    user.subscribe((data) => {
        loginUser = data
        if(loginUser.user != null){
            console.log(loginUser.user.therapist[0].is_therapist)
        }
    })
    
</script>
{#if loginUser.user != null}
    {#if loginUser.user.therapist[0].is_therapist}
        <frame>
        <TheraHome />
        </frame>
    {/if}
    {#if loginUser.username == "ClientTest"}
        <frame>
        <Home />
        </frame>
    {/if}
    {:else}
    <frame>
        <LoginPage />
    </frame>
{/if}

