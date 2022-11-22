<script>
    import RoleSelect from './RoleSelect.svelte'
	import { navigate } from 'svelte-native'
    import Questionnaire from './Questionnaire.svelte'
    import Home from './Home.svelte'
    import ClientDetail from './ClientDetail.svelte'
    import { StackLayout } from '@nativescript/core';

    import Template from "../components/ClientTemplate.svelte"
    import {SecureStorage} from "@nativescript/secure-storage"
    import LoginPage from './LoginPage.svelte';

let secureStorage = new SecureStorage()

function logOut(){
    secureStorage.removeAllSync()
    navigate({
      page: LoginPage
    })
}
  
</script>

<page actionBarHidden="true">
        <Template>
        <stackLayout rows="200, 100, *, 80" columns="*" horizontalAlignment="center" verticalAlignment="center">
            <image src="~/static-resources/images/stock/healperlogo.png"/>
            <label class="header" text="Healper"/>
            <label class="sub-header" textWrap="true" text="Your journey to a happier, healthier life starts now" />
            <button class="button" text="logout" on:tap="{logOut}"/>
        </stackLayout>
        </Template>
</page>

<style>
    .bottom-navigation{
        background-color:rgba(252, 249, 244); 
        justify-content: space-around;
    }

    .icon{
        width: 50px;
        height: 50px;
        margin-bottom: 0;
    }

    .bottom-navigation stackLayout{
        width: 25%;
        border-color: black; 
        border-width: 1;
        color:  rgb(45, 124, 124); 
        text-align: center;
        align-items: center;
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