<script>
    import { closeModal } from "svelte-native";
    import { postData } from "../store/dataHandler.js";
    import { onMount } from "svelte";
    import { authHeaders } from "../store/staticValues.js";
    import { SecureStorage } from "@nativescript/secure-storage";
    import OptionList from "~/pages/Therapist/OptionList.svelte";

    let secureStorage = new SecureStorage();
    let inputAnswer;
    let choiceValue;
    let createdQuestion;
    let minValue;
    let maxValue;
    let authToken;
    let aHeaders;


    export let question;
    export let optionGenre;
    let questionPk = question.pk
    
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

    async function saveNewOption(){
        if(optionGenre === "input"){
            createdQuestion = await postData("http://10.0.2.2:8080/option-input/", aHeaders, {standard_text: inputAnswer,
            question: questionPk  
            }); 
        }
        else if(optionGenre === "choice"){
            createdQuestion = postData("http://10.0.2.2:8080/option-choice/", aHeaders, {option_value: choiceValue,
            question: questionPk  
            });

        }
        else{
            createdQuestion = postData("http://10.0.2.2:8080/option-numeric/", aHeaders, {min_value: minValue, max_value: maxValue,
            question: questionPk      
            });
        };

        closeModalFunction();
       
    };

    function closeModalFunction(){
        closeModal({
            page: OptionList
        });
    };

</script>

<page>
    <flexBoxLayout class="modalPage" justifyContent="center">
        <stackLayout class="header">
            <image class="questionmark-icon" src="~/static-resources/images/icons/questionmark.png"/>
            <label text="Write option" />
        {#if optionGenre === "input"}
            <textfield bind:text="{inputAnswer}" textWrap="true" hint="Write your input option here"/>
            <button text="Save option" class="button" on:tap="{saveNewOption}"/>
                {:else if optionGenre === "choice"}
                <textfield bind:text="{choiceValue}" textWrap="true" hint="Write your choice option here"/>
                <button text="Save choice" class="button" on:tap="{saveNewOption}"/>
                    {:else if optionGenre === "numeric"}
                        <textfield bind:text="{minValue}" textWrap="true" hint="Write the minimum value"/>
                        <textfield bind:text="{maxValue}" textWrap="true" hint="Write the maximum value"/>
                        <button text="Save values" class="button" on:tap="{saveNewOption}"/>
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

    .questionmark-icon{
        border-radius: 50%;
        height: 100px;
        width: 100px;
        margin-bottom: 40px;
        margin-top: 100px;
    }

</style>