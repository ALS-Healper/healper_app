<script>
    import { navigate } from 'svelte-native';
    import { SecureStorage } from "@nativescript/secure-storage";
    import { onMount } from "svelte";

    import LoginPage from "../pages/LoginPage.svelte"

let secureStorage = new SecureStorage()
    let user = {client: [], therapist:[]};

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
</script>
<page>
    <stackLayout class="settings-page">
        <label class="header" text="Settings page"></label>
            <stackLayout>
                <label text="Details">
                <label text="Username: {user.username}" />
                <label text="Fuld navn: {`${user.first_name}  ${user.last_name}`}" />
            </stackLayout>
            <stackLayout>
                <label text="Setting">

            </stackLayout>
            <stackLayout>
                <label text="Information">

            </stackLayout>
        <button class="button" text="logout" on:tap="{logOut}"/>
    </stackLayout>
</page>
<style>
    page{
        background: linear-gradient(-120deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }

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

    .settings-page{
        align-items: center;
    }

    .button {
            position: fixed;
            bottom: 0;
            width: 80%;
            font-size: 18;
            border-radius: 20px;
            background-color: rgb(45, 124, 124);
            color: white;
            font-weight: bolder;
        }
    
</style>