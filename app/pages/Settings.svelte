<script>
    import { navigate } from 'svelte-native';
    import { SecureStorage } from "@nativescript/secure-storage";
    import { onMount } from "svelte";

    import LoginPage from "../pages/LoginPage.svelte"

    let secureStorage = new SecureStorage()
    let user = {client: [], therapist:[]};
    let switchEnabled;

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
            <stackLayout class="section">
                <label class="section-header" text="Details"/>
                <stackLayout class="section-item" orientation="horizontal" >
                    <label text="{`Username: ${user.username}`}" />
                </stackLayout>
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="{`Full name: ${user.first_name} ${user.last_name}`}" />
                </stackLayout>
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="{`Therapist:  `}" />
                </stackLayout>
            </stackLayout>
            <stackLayout class="section">
                <label class="section-header" text="Settings" />
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="Change Therapist permission"/>
                    <switch bind:checked="{switchEnabled}"/>
                </stackLayout>
            </stackLayout>
            <stackLayout class="section">
                <label class="section-header" text="Information"/>
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="Some link to healpers webpage"/>
                </stackLayout>
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="Terms of Service"/>
                </stackLayout>
                <stackLayout class="section-item" orientation="horizontal">
                    <label text="App version: 0.0.1"/>
                </stackLayout>
            </stackLayout>
        <button class="button" text="Logout" on:tap="{logOut}"/>
    </stackLayout>
</page>
<style>
    page{
        background: linear-gradient(-120deg, rgb(127, 171, 222), rgb(230, 197, 166));
    }

    .header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bold;
        font-size: 40px;
        border-radius: 1px solid black;
        color: rgb(0, 0, 0); 
        -webkit-text-stroke: 1px black;
        width: 100%;
        text-align: center;
        align-self: center;
    }

    .section-header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bold;
        font-size: 20px;
        border-radius: 1px solid black;
        color: rgb(0, 0, 0); 
        -webkit-text-stroke: 1px black;
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
    }

    .section{
    }

    .section-item{
        background-color:rgba(71, 73, 73, 0.188);
    }

    .section-item label{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
        font-size: 20px;
        border-radius: 1px solid black;
        color: rgb(0, 0, 0); 
        -webkit-text-stroke: 1px black;
        width: 80%;
        text-align: start;
    }
    
</style>