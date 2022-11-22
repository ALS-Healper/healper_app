<script>
    import { goBack } from 'svelte-native'
    import { onMount } from 'svelte'
    import Template from '../components/ClientTemplate.svelte'
    import { userToken } from '../store/userStore.js'
    import {SecureStorage} from "@nativescript/secure-storage"

    let currentQuestion = {question_text: "Loading questions"};
    let questionIndex = 0;
    let questionList = [];
    let secureStorage = new SecureStorage()

    let inputAnswer ="";
    let choiceAnswer ="";
    let sliderValue = 0;
    let authToken;
    let user;

    onMount(async ()=>{

        authToken = secureStorage.getSync({
                key: "authToken"
            });
        user = JSON.parse(secureStorage.getSync({
                key: "user"
            }));

    
       const res = await fetch("http://10.0.2.2:8080/questionnaires/", {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            }
        });
       const data = await res.json()
       questionList = [...data.results[0].inputquestions, ...data.results[0].choicequestions, ...data.results[0].numericquestions]
    // Hvis det her virker skal der måske laves en sortering som sætter dem i den rigtige rækkefølge for questionnairen
       currentQuestion = data.results[0].inputquestions[0]

    });

    function onAnswerTap(args){
        if(currentQuestion.optioninputs){
            createQuestionEntry("http://10.0.2.2:8080/inputentries/",{response_text: inputAnswer, 
            creator: user.client[0].pk, 
            question: currentQuestion.pk         
        })
        }
        else if(currentQuestion.optionchoices){
            const button = args.object
            createQuestionEntry("http://10.0.2.2:8080/choiceentries/",{choice_value: button.text, 
            creator: user.client[0].pk, 
            question: currentQuestion.pk         
        })
        }
        else{
            createQuestionEntry("http://10.0.2.2:8080/numericentries/",{response_value: sliderValue, 
            creator: user.client[0].pk, 
            question: currentQuestion.pk          
        })
        }
        
        questionIndex += 1
        currentQuestion = questionIndex >= questionList.length ? {question_text: "Tak for dit svar"} : questionList[questionIndex]
        //alert(questionIndex +" "+ currentQuestion.question_text)
    };

    async function createQuestionEntry(url, data) {
        //alert(data.response_text)
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify(data) 
        });
     return response.json(); 
    };

    function sliderValueChange(args){
        const slider = args.object
        sliderValue = slider.value
    }

</script>

<page actionBarHidden="true">
    <Template>
        <stackLayout>
            <image class="tobias" src="https://healper-static.s3.amazonaws.com/images/team-members/tobias.jpg"/>
            <label text="{currentQuestion.question_text}" class="questionText" textWrap="true" horizontal-align= "center"/>
            <flexBoxLayout flexWrap="wrap" justifyContent="center">
            {#if currentQuestion.optioninputs}
                {#each currentQuestion.optioninputs as option}
                <textfield textWrap="true" bind:text="{inputAnswer}" hint="{option.standard_text}"/>
                {/each}
                <button text="Submit answer" class="button" on:tap={onAnswerTap}/>
            {/if}
            {#if currentQuestion.optionchoices}
                {#each currentQuestion.optionchoices as option}
                    <button bind:text="{option.option_value}" class="button" on:tap={onAnswerTap}/>
                {/each}
            {/if}
            {#if currentQuestion.optionnumerics}
            {#each currentQuestion.optionnumerics as option}
            <label text="{sliderValue}" class="sliderValue"/>
            <stackLayout orientation="horizontal" class="sliderField">
                    <label text="{option.min_value}"/>
                    <slider minValue="{option.min_value}" 
                    maxValue="{option.max_value}"
                    bind:value="{sliderValue}"
                    on:valueChange="{sliderValueChange}" width=80%/>
                    <label text="{option.max_value}"/>
            </stackLayout>
                <button text="Submit answer" class="button" on:tap={onAnswerTap} verticalAlignment="bottom"/>
                {/each}
                {:else}
                    <button text="Back" class="button" on:tap="{goBack}" verticalAlignment="bottom"/>
            {/if}
            </flexBoxLayout>
        </stackLayout>
    </Template>
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
    .questionText{
        margin: 30;
        font-size: 35;
        font-weight: bolder;
    }
    .sliderValue{
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .sliderField{
        width: 80%;
        font-size: 10;
    }

    textfield{
        background-color:rgba(187, 183, 177, 0.49); 
        font-size: 20;
        width: 80%;
        height: 500px;
        border-radius: 10%;
    }

    .tobias{
        border-radius: 50%;
        height: 300px;
        width: 300px;
    }
</style>