<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import { onMount } from "svelte";
    import { navigate } from "svelte-native";

    import { getData, postData } from "../../store/dataHandler.js";
    import { authHeaders, baseHeaders } from "../../store/staticValues.js";

    import Home from './Home.svelte';
    import Button from "../../components/Button.svelte";

    let secureStorage = new SecureStorage();

    let username;
    let password;
    let aHeaders; 
    let bHeaders; 
    let sliderValue; 

    onMount(async ()=>{
        let token = secureStorage.getSync({
                key: "authToken"
            });

        let user = secureStorage.getSync({
            key: "user"
        });

        if(token && user){
            navigate({ page: Home }) 
        };
    });

    async function login(){
        let data;
        let token = secureStorage.getSync({
                    key: "authToken"
                });

        if(!token){
            baseHeaders.subscribe((value) => {
                    bHeaders = value; 
                });

            data = await postData("http://10.0.2.2:8080/api-token-auth/",
                bHeaders,
                {username: username, password: password}
            );

            secureStorage.set({
                key : "authToken",
                value: data.token
            })
            .then((data) => console.log(data));
            token = data.token;
            
            authHeaders.subscribe((value) => {
                    aHeaders = value;
                    aHeaders.Authorization = `Token ${token}`;
                });
        }
        else{
            secureStorage.get({key:"authToken"}).then((value) => token = value)
        }

        let url;
        if(sliderValue){
            url = "http://10.0.2.2:8080/client-detail/";
        }
        else{
            url = "http://10.0.2.2:8080/therapist-detail/";
        };

        let loginDetails = await getData(url, {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            });

        if(loginDetails.results[0].pk){
            secureStorage.set({
                key : "user",
                value: JSON.stringify(loginDetails.results[0])
            }).then((data) => console.log(data))
            navigate({ page: Home }) 
        };
    };
</script>
<page actionBarHidden="true">
    <stackLayout class="top-section">
        <image src="~/static-resources/images/stock/healperlogo.png" class="logo"/>
        <stackLayout class="login-section">
            <label text="Healper" class="header"/>
            <textField hint="Email" bind:text="{username}" />
            <textField hint="Password" bind:text="{password}" secure="true" />
            <label text="Login as:"/>
            <flexBoxLayout justifyContent="center">
                <label text="Therapist"/>
                <switch bind:checked={sliderValue}/>
                <label text="Client"/>
            </flexBoxLayout> 
    </stackLayout>
        <label class="shadow-down" verticalAlignment="top" />
        <Button buttonText="Login" onTapFunc={login}/>
        <Button buttonText="Signup"/>
    </stackLayout>
</page>
<style>
    .top-section{
    font-size: 20;
    vertical-align: center;
    text-align: center;
    }

    .header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 30px;
        border-radius: 1px solid black;
        color: rgb(45, 124, 124); 
        -webkit-text-stroke: 1px black;
        text-shadow: 2px 2px 8px black;
        width: 100%;
        text-align: center;
        align-self: center;
    }

    .login-section{
        font-size: 20;
        vertical-align: center;
        text-align: center;
    }

    .shadow-down{
        height: 8;
        background: linear-gradient(to bottom, rgba(0,0,0, .1), rgba(0,0,0, 0))
    }

    page{
            background: linear-gradient(122deg, rgb(127, 171, 222), rgb(230, 197, 166));
        }

    textfield{
            background-color: white; 
            font-size: 20;
            width: 80%;
            border-radius: 10%;
            margin-bottom: 5%;
    }
    
    switch{
        background-color: rgb(45, 124, 124);
        color: white;
    }

    .logo{
        height: 30%;
        width: 70%;
        margin: 8%;
    }
</style>