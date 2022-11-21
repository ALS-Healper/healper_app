<script>
    import { onMount } from 'svelte';
    import { subscribe } from 'svelte/internal';
    import Home from './pages/Home.svelte'
    import TheraHome from './pages/TheraHome.svelte';
    import LoginPage from './pages/LoginPage.svelte'
    import { user } from './store/userStore.js'
    import {SecureStorage} from "@nativescript/secure-storage"

    let secureStorage = new SecureStorage()

    let loginUser;
    let login = false;
    onMount(() => {
        loginUser = secureStorage.getSync({
                key: "user"
            });
    })
    
</script>
{#if loginUser}
    {#if loginUser.therapist[0].is_therapist}
        <frame>
        <TheraHome />
        </frame>
    {:else if loginUser.client[0]}
        <frame>
        <Home />
        </frame>
    {/if}
    {:else}
    <frame>
        <LoginPage />
    </frame>
{/if}

