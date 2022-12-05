<script>
    import { closeModal } from "svelte-native";
    import { postData } from "../store/dataHandler.js";
    import { onMount } from "svelte";
    import { authHeaders } from "../store/staticValues.js";
    import { SecureStorage } from "@nativescript/secure-storage";
  
    let secureStorage = new SecureStorage();
    let inputAnswer;
    let button_text;
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
            postData("http://10.0.2.2:8080/question-choice/", aHeaders, {question_text: button.text, 
            creator: user.pk,         
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
    <flexBoxLayout flexWrap="wrap" justifyContent="center">
        <stackLayout>
        {#if question === "input questions"}
            <textfield bind:text="{inputAnswer}" textWrap="true" hint="Write your input question here..."/>
            <button text="Submit answer" class="button" on:tap={saveNewQuestion}>Save question</button>
                {:else if question === "choice questions"}
                    <textfield bind:text="{button_text}" textWrap="true" hint="Write your choice question here..."/>
                    <button text="Submit answer" class="button" on:tap={saveNewQuestion}>Save question</button>
                {:else if question === "numeric questions"}
                    <textfield bind:text="{sliderQuestion}" textWrap="true" hint="Write your numeric question here..."/>
                    <button text="Submit answer" class="button" on:tap={saveNewQuestion}>Save question</button>
            {/if}
        </stackLayout>
    </flexBoxLayout>
</page>