<script>
    import { goBack, navigate } from "svelte-native";
    import { onMount } from "svelte";
    import ClientTemplate from "../components/ClientTemplate.svelte";
    import { getData, postData, patchData } from "../store/dataHandler.js";
    import { authHeaders } from "../store/staticValues.js";
    import {SecureStorage} from "@nativescript/secure-storage";
    import Home from "./Shared/Home.svelte";
    import Button from "../components/Button.svelte";

    let secureStorage = new SecureStorage();

    let currentQuestion = {question_text: "Loading questions"};
    let questionnary_today;
    let questionIndex = 0;
    let questionList = [];

    let inputAnswer ="";
    let choiceAnswer ="";
    let sliderValue = 0;
    let authToken;
    let user;
    let aHeaders; 

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

        const existingAnswer = await getData("http://10.0.2.2:8080/questionEntries/?completed_today=True&client_pk=" + user.pk, aHeaders);
        const data = await getData("http://10.0.2.2:8080/questionnaires/", aHeaders);
        if(existingAnswer.results[0] && existingAnswer.results[0].is_completed){
            alert("You already answered the diary for today")
            navigate({
                page: Home,
                props: {isCancled: true}
            });
        }
        else{
            /*questionnary_today = await postData("http://10.0.2.2:8080/questionEntries/", aHeaders, {
            creator: user.pk,
            questionnaire: data.results[0].pk
            });*/
        };

       questionList = [...data.results[0].inputquestions, ...data.results[0].choicequestions, ...data.results[0].numericquestions];
    // Hvis det her virker skal der måske laves en sortering som sætter dem i den rigtige rækkefølge for questionnairen
       currentQuestion = data.results[0].choicequestions[0];

    });

    function onAnswerTap(args){
        if(currentQuestion.optioninputs){
            postData("http://10.0.2.2:8080/inputentries/",aHeaders, {response_text: inputAnswer, 
            creator: user.pk, 
            question: currentQuestion.pk,
            questionnaire_entry: questionnary_today.pk         
            });
        }
        else if(currentQuestion.optionchoices){
            const button = args.object
            postData("http://10.0.2.2:8080/choiceentries/", aHeaders, {choice_value: button.text, 
            creator: user.pk, 
            question: currentQuestion.pk,
            questionnaire_entry: questionnary_today.pk           
            });
        }
        else{
            postData("http://10.0.2.2:8080/numericentries/", aHeaders,{response_value: sliderValue, 
            creator: user.pk, 
            question: currentQuestion.pk,
            questionnaire_entry: questionnary_today.pk             
            });
        };
        
        questionIndex += 1;
        currentQuestion = questionIndex >= questionList.length ? {question_text: "Tak for dit svar"} : questionList[questionIndex]
    };

    function sliderValueChange(args){
        const slider = args.object
        sliderValue = slider.value
    }

    function finishAnswers(){
        patchData("http://10.0.2.2:8080/questionEntries/"+questionnary_today.pk+"/?client_pk=" + user.pk, aHeaders, {
            is_completed: true       
            });
        //cancelQuestionnairNotification()
        navigate({
        page: Home,
        props: {isCancled: true}
        })
    };
</script>
<page actionBarHidden="true">
    <ClientTemplate>
        <stackLayout>
            <image class="tobias" src="https://healper-static.s3.amazonaws.com/images/team-members/tobias.jpg"/>
            <label text="{currentQuestion.question_text}" class="questionText" textWrap="true" horizontal-align= "center"/>
            <flexBoxLayout flexWrap="wrap" justifyContent="center">
            {#if currentQuestion.optioninputs}
                {#each currentQuestion.optioninputs as option}
                <textView textWrape="true" bind:text="{inputAnswer}" hint="{option.standard_text}"/>
                {/each}
                <Button buttonText="Submit answer" onTapFunc={onAnswerTap}/>
            {/if}
            {#if currentQuestion.optionchoices}
                <stackLayout orientation="horizontal" class="choices-box" >
                    {#each currentQuestion.optionchoices as option}
                        <button bind:text="{option.option_value}" class="choice-button" on:tap={onAnswerTap}/>
                    {/each}
                </stackLayout>
            {/if}
            {#if currentQuestion.optionnumerics}
                {#each currentQuestion.optionnumerics as option}
                <stackLayout orientation="vertical" width="100%">
                    <label text="{sliderValue}" class="sliderValue"/>
                    <stackLayout orientation="horizontal" class="sliderField">
                            <label text="{option.min_value}"/>
                            <slider minValue="{option.min_value}" 
                                maxValue="{option.max_value}"
                                bind:value="{sliderValue}"
                                on:valueChange="{sliderValueChange}" 
                                width=80%
                                backgroundColor="green"
                                color="white"
                                lineThickness="10"/>
                            <label text="{option.max_value}"/>
                    </stackLayout>
                    <button text="Submit answer" class="button" on:tap={onAnswerTap} verticalAlignment="bottom"/>
                </stackLayout>
                {/each}
            {:else}
                <Button buttonText="Back" onTapFunc={finishAnswers}/>
            {/if}
            </flexBoxLayout>
        </stackLayout>
    </ClientTemplate>
</page>
<style>
    .selectionText{
        font-size: 20;
        vertical-align: center;
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

    .choices-box{
        width: 90%;
        align-self: center;
        justify-content: space-evenly;
        vertical-align: center;
    }

    .choice-button{
        width: 33.33%;
        font-size: 18;
        border-radius: 20px;
        background-color: rgb(45, 124, 124);
        color: white;
        font-weight: bolder;
    }

    .questionText{
        margin: 30;
        font-size: 35;
        font-weight: bolder;
        text-align: center;
    }

    .sliderValue{
        font-size: 20;
        vertical-align: center;
    }

    .sliderField{
        width: 80%;
        font-size: 10;
    }

    textView{
        background-color:rgba(247, 243, 235, 0.829); 
        font-size: 20;
        width: 80%;
        height: 750px;
        border-radius: 10%;
        text-decoration-color: rgb(85, 80, 80);
        text-anchor: start;
        text-indent: 15%;
    }

    .tobias{
        border-radius: 50%;
        height: 300px;
        width: 300px;
    }
</style>