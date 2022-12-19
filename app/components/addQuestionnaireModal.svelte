<script>
    import { closeModal } from "svelte-native";
    import { postData } from "../store/dataHandler.js";
    import { onMount } from "svelte";
    import { authHeaders } from "../store/staticValues.js";
    import { SecureStorage } from "@nativescript/secure-storage";
    import QuestionnaireList from "../pages/QuestionnaireList.svelte"
  
    let secureStorage = new SecureStorage();
    let titleOfNewQuestionnaire;
    let aHeaders;
    let authToken;
    let user; 
    
    onMount(async ()=>{

        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });

            user = JSON.parse(secureStorage.getSync({
                key: "user"
            }));


    });

    function saveNewQuestionnaire(){
        postData("http://10.0.2.2:8080/questionnaires/", aHeaders, {title: titleOfNewQuestionnaire, 
        creator: user.pk     
            }); 
    
        closeModal({
            page: QuestionnaireList
        });
    };
    

</script>

<page>
    <flexBoxLayout class="modalPage" justifyContent="center">
        <stackLayout class="header">
            <image class="questionmark-icon" src="~/static-resources/images/icons/questionmark.png"/>
            <label>Give a descriptive title</label>
            <textfield class="input" bind:text="{titleOfNewQuestionnaire}" textWrap="true" hint="Write the title here"/>           
            <button text="Submit answer" class="button" on:tap="{saveNewQuestionnaire}"/>
        </stackLayout>
    </flexBoxLayout>
</page>

<style>

page{
        background: linear-gradient(122deg, rgb(127, 171, 222), rgb(230, 197, 166));

    }
flexBoxLayout{
        height: 1200px;
        width: 150%;
        margin-bottom: 10px;
        padding-bottom: 60px;
        border-radius: 10%;
    }

    .header{
        color:white;
        text-align: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif';
        font-size: 20px;
        font-weight:400;
    }

    button {
        position: fixed;
        bottom: 0;
        width: 80%;
        font-size: 18;
        border-radius: 20px;
        background-color: rgb(45, 124, 124);
        color: white;
        font-weight: bolder;
    }

    .input{
        text-decoration: white; 
    }

    .questionmark-icon{
        border-radius: 50%;
        height: 100px;
        width: 100px;
        margin-bottom: 40px;
        margin-top: 100px;
    }

</style>