<script>
    import { goBack } from 'svelte-native'
    import { onMount } from 'svelte'

    let currentQuestion = {question_text: "Loading questions"};
    let questionIndex = 0;
    let questionList = [];

    let answer;

    onMount(async ()=>{
       const res = await fetch("http://10.0.2.2:8080/questionnaires/");
       const data = await res.json()
       questionList = data.results[0].questions
       currentQuestion = data.results[0].questions[0]
    });

    function onAnswerTap(){
        createQuestionEntry("http://10.0.2.2:8080/questionEntries/",{response_text: answer, 
            creator:1, 
            question: 1              
        })
        
        questionIndex += 1
        currentQuestion = questionIndex >= questionList.length ? "Tak for dit svar" : questionList[questionIndex]
    };

    async function createQuestionEntry(url, data) {
        alert(data.response_text)
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

</script>

<page>
    <actionbar title="Client questionnaire page" />
    <stackLayout>
        <label class="selectionText">Questions from your psychologist</label>
        <label text="{currentQuestion.question_text}" class="questionText" textWrap="true" />
        <flexBoxLayout flexWrap="wrap" justifyContent="center">
           <textfield bind:text="{answer}" hint="Enter your answer here"/>
        </flexBoxLayout>
        <!--Skal ind på diary page-->
        <button text="Nothing in particular" class="button" on:tap={onAnswerTap}/>
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
</style>