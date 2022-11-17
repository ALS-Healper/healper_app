<script>
    import { goBack } from 'svelte-native'
    import { onMount } from 'svelte'
    import Navbar from './components/navbar.svelte';

    let currentQuestion = {question_text: "Loading questions"};
    let questionIndex = 0;
    let questionList = [];

    let answer;
    let sliderValue = 0;

    onMount(async ()=>{
       const res = await fetch("http://10.0.2.2:8080/questionnaires/");
       const data = await res.json()
       questionList = [...data.results[0].inputquestions, ...data.results[0].choicequestions, ...data.results[0].numericquestions]
    // Hvis det her virker skal der måske laves en sortering som sætter dem i den rigtige rækkefølge for questionnairen
       currentQuestion = data.results[0].inputquestions[0]
    });

    function onAnswerTap(){
        createQuestionEntry("http://10.0.2.2:8080/questionEntries/",{response_text: answer, 
            creator:1, 
            question: questionIndex              
        })
        
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
            'Content-Type': 'application/json'
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

<page>
    <Navbar />
    <stackLayout>
        <label class="selectionText">Questions from your psychologist</label>
        <label text="{currentQuestion.question_text}" class="questionText" textWrap="true" />
        <flexBoxLayout flexWrap="wrap" justifyContent="center">
           {#if currentQuestion.optioninputs}
            {#each currentQuestion.optioninputs as option}
            <textfield bind:text="{answer}" hint="{option.standard_text}"/>
            {/each}
            <button text="Submit answer" class="button" on:tap={onAnswerTap}/>
           {/if}
           {#if currentQuestion.optionchoices}
            {#each currentQuestion.optionchoices as option}
                <button bind:text="{answer = option.option_value}" class="button" on:tap={onAnswerTap}/>
            {/each}
           {/if}
           {#if currentQuestion.optionnumerics}
           {#each currentQuestion.optionnumerics as option}
           <label text="{sliderValue}" class="sliderValue"/>
           <stackLayout orientation="horizontal" class="sliderField">
                <label text="{option.min_value}"/>
                <slider minValue="{option.min_value}" 
                maxValue="{option.max_value}"
                value="{option.max_value/2}"
                on:valueChange="{sliderValueChange}" width=80%/>
                <label text="{option.max_value}"/>
           </stackLayout>
            <button text="Submit answer" class="button" on:tap={onAnswerTap}/>
            {/each}
            {:else}
                <button text="Back" class="button" on:tap="{goBack}"/>
           {/if}
        </flexBoxLayout>
    </stackLayout>
</page>

<style>
    .selectionText{
        font-size: 20;
        horizontal-align: center;
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
    }
    .questionText{
        margin: 30;
        font-size: 20;
        font-style: italic;
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
</style>