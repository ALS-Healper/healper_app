<script>
	import { navigate } from 'svelte-native';
    import { SecureStorage } from "@nativescript/secure-storage";
    import { onMount } from "svelte";
    import { setupNotifications } from '~/store/notifications';

    import LoginPage from './LoginPage.svelte';
    import ClientTemplate from "../../components/ClientTemplate.svelte";
    import TherapistTemplate from "../../components/TherapistTemplate.svelte";
    import Dashboard from "../../components/Dashboard.svelte";
    export let isCancled;
    let secureStorage = new SecureStorage()
    let user;

    onMount(()=>{
        user = JSON.parse(secureStorage.getSync({
                key: "user"
            })
        );
    });

    function logOut(){
        secureStorage.removeAllSync()
        navigate({
        page: LoginPage
        })
    }
    setupNotifications(isCancled)
</script>
<page actionBarHidden="true">
    {#if user && user.is_therapist}
        <TherapistTemplate>
            <stackLayout rows="200, 100, *, 80" columns="*" horizontalAlignment="center" verticalAlignment="center">
                <image src="~/static-resources/images/stock/healperlogo.png"/>
                <label class="header" text="Healper Therapist"/>
                <label class="sub-header" textWrap="true" text="Your journey to a happier, healthier life starts now" />
                <button class="button" text="Logout" on:tap="{logOut}"/>
            </stackLayout>
        </TherapistTemplate>
    {:else if user}
        <ClientTemplate>
               <Dashboard />  
        </ClientTemplate>
    {/if}
    <label text="dsa"/>
</page>

<style>
    .header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
        font-size: 40px;
        border-radius: 1px solid black;
        color: rgb(45, 124, 124); 
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 8px black;
        width: 100%;
        text-align: center;
        align-self: center;
    }

    .sub-header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 25px;
        border-radius: 1px solid black;
        color: rgb(45, 124, 124); 
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 8px black;
        width: 100%;
        text-align: center;
        align-self: center;
        margin-top: 50px;
    }

    image{
        width: 300px;
        height: 300px;
    }

</style>