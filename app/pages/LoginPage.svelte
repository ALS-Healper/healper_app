<script>
    import {SecureStorage} from "@nativescript/secure-storage"
    import { onMount } from "svelte"
    import { navigate } from 'svelte-native'
    import { userToken, user } from '../store/userStore.js'
    import { getData, postData } from "../store/dataHandler.js"
    import { authHeaders, baseHeaders } from "../store/staticValues.js"
   
    import Home from './Home.svelte'
    import App from '../App.svelte'
    let userDetail = [];
    let username;
    let password;
    let aHeaders; 
    let bHeaders; 
    let url;
    let sliderValue; 

    let secureStorage = new SecureStorage()


    onMount(async ()=>{

        baseHeaders.subscribe((value) => {
                bHeaders = value; 
            });


        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${token}`;

            });
    

        let token = secureStorage.getSync({
                key: "authToken"
            });

            alert(token)

        if(token){

          userDetail = await getData("http://10.0.2.2:8080/user-detail/", {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`
});
        
        secureStorage.set({
            key : "user",
            value: JSON.stringify(userDetail.results[0])
        }).then((data) => console.log(data))
        navigate({ page: Home }) 
        }
    })


async function login(){
    let loginDetails; 
    let token;
    let data;
    secureStorage.get("authToken").then((value) => token = value)

    if(!token){

        data = await postData("http://10.0.2.2:8080/api-token-auth/", {
        "Content-Type": "application/json",
            },
            {username: username, password: password});

        userToken.set({'Token': data.token})

        secureStorage.set({
            key : "authToken",
            value: data.token
        }).then((data) => console.log(data))
        token = data.token
    }
    else{
        secureStorage.get({key:"authToken"}).then((value) => token = value)
    }

    if(sliderValue){

        url = "http://10.0.2.2:8080/client-detail/";

    }else{

        url = "http://10.0.2.2:8080/therapist-detail/";

    };

    loginDetails = await getData(url, {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
     });

     if(loginDetails.results[0]){
        
        secureStorage.set({
            key : "user",
            value: JSON.stringify(loginDetails.results[0])
        }).then((data) => console.log(data))
        user.set({'user': loginDetails.results[0]})
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
    </stackLayout>
        <label class="shadow-down" verticalAlignment="top" />
        <button text="Login" on:tap="{login}"/>
        <button text="Signup"/>
        <switch bind:checked={sliderValue} design="slider" options={['Client', 'Therapist']} fontSize={12}/>
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
    font-weight: bolder;
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
    margin-bottom: 8%;
}

.shadow-down {
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

button {
    width: 80%;
    
    font-size: 25;
    border-radius: 20px;
    background-color: rgb(45, 124, 124);
    color: white;
    font-weight: bolder;
 }

 switch{

    width: 80%;
    font-size: 25;
    border-radius: 20px;
    background-color: rgb(45, 124, 124);
    color: white;
    font-weight: bolder;

 }

 .logo{
    height: 30%;
    width: 70%;
    margin: 10%;
 }
</style>