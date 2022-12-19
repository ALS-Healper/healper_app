<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import TherapistTemplate from "~/components/TherapistTemplate.svelte";
    import { Template } from "svelte-native/components"; 
    import { onMount } from "svelte";
    import { authHeaders } from "~/store/staticValues";
    import { showModal } from "svelte-native";
    import AddOptionModal from "~/components/addOptionModal.svelte";

    let secureStorage = new SecureStorage();
    let authToken;
    let optionList; 
    let urlPath;
    let aHeaders; 
    export let question;

    onMount(async () =>{
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });
        if(question.optionnumerics != undefined){
            urlPath = "numeric"
            optionList = question.optionnumerics
        }
        else if(question.optionchoices !=undefined){
            urlPath = "choice"
            optionList = question.optionchoices
        }
        else if(question.optioninputs !=undefined){
            urlPath = "input"
            optionList = question.optioninputs
        }
        
    }); 
    
    function editOption(){

    }

    function addOption(){
        showModal({page: AddOptionModal, props: {question: question, optionGenre: urlPath}});
    };
    
</script>

<page actionBarHidden="true">
    <TherapistTemplate>
        <stackLayout>
            <label class="header" textWrap="true" text="Options and details for question: {question.question_text}"/>
            <listView items="{optionList}" on:itemTap="{editOption}" height="76%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/list.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            {#if urlPath === "numeric"}
                                <label text="From: {item.min_value}" class="option-name"/>
                                <label text="To: {item.max_value}" class="option-name"/>
                            {:else if urlPath === "choice"}
                                <label text="Option: {item.option_value}" class="option-name"/>
                            {:else if urlPath === "input"}
                                <label text="{item.standard_text}" class="option-name"/>
                            {/if}
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
            <!--{#if question.optionnumerics[0] || question.optioninputs[0]}-->
            <button text="+" on:tap="{addOption}"/>
        </stackLayout>
    </TherapistTemplate>
</page>
<style>
    .header{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: bolder;
        font-size: 25px;
        border-radius: 1px solid black;
        color: rgb(45, 124, 124); 
        -webkit-text-stroke: 1px black;
        width: 100%;
        text-align: center;
        align-self: center;
    }
    .option-name{
        font-size: 17;
        font-weight: bold;
        padding-top: 0%;
        padding-bottom: 0%;
    }
    .icon{
        width: 100px;
        height: 100px;
        margin-bottom: 0;
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
</style>