<script>
    import { closeModal } from "svelte-native";
    import { postData } from "../store/dataHandler.js";
    import { onMount } from "svelte";
    import { authHeaders } from "../store/staticValues.js";
    import { SecureStorage } from "@nativescript/secure-storage";
    import IconBox from "./IconBox.svelte"
    //import questionMark from "app/static-resources/images/icons/questionmark.png"
  
    let secureStorage = new SecureStorage();
    let inputAnswer;
    let inputOptions;
    let buttonText;
    let sliderQuestion; 
    let authToken;
    let aHeaders;
    let user; 
    
    export let question;
    
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

    function saveNewQuestion(){
        if(question === "input questions"){
            postData("http://10.0.2.2:8080/question-input/", aHeaders, {question_text: inputAnswer, 
            creator: user.pk,     
            });
        }
        else if(question === "choice questions"){
            postData("http://10.0.2.2:8080/question-choice/", aHeaders, {question_text: buttonText, 
            creator: user.pk,       
            optioninput: inputOptions   
            });
        }
        else{
            postData("http://10.0.2.2:8080/question-numeric/", aHeaders,{question_text: sliderQuestion, 
            creator: user.pk,        
            });
        };

        closeModal();
    };

</script>

<page>
    <flexBoxLayout class="modalPage" justifyContent="center">
        <stackLayout class="header">
            <image class="question-icon" src="~/static-resources/images/icons/questionMark.png"/>
            <label>Create a new question</label>
        {#if question === "input questions"}
            <textfield bind:text="{inputAnswer}" textWrap="true" hint="Write your input question here"/>
            <textfield bind:text="{inputOptions}" textWrap="true" hint="Write your options here"/>
            <button text="Submit answer" class="button" on:tap="{saveNewQuestion}"/>
                {:else if question === "choice questions"}
                <textfield bind:text="{buttonText}" textWrap="true" hint="Write your choice question here"/>
                <textfield bind:text="{inputOptions}" textWrap="true" hint="Write your options here"/>
                <button text="Submit answer" class="button" on:tap="{saveNewQuestion}"/>
                    {:else if question === "numeric questions"}
                        <textfield bind:text="{sliderQuestion}" textWrap="true" hint="Write your numeric question here..."/>
        {/if}
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
        color: black;
        text-align: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif';
        font-size: 20px;
        font-weight:400;
    }

    button{
        background-color: rgb(45, 124, 124);
        color: white;
        bottom: 0;
        position: absolute;
        
    }

    .question-icon{
        border-radius: 50%;
        height: 100px;
        width: 100px;
        margin-bottom: 40px;
        margin-top: 100px;
    }

</style>