<script>
    import { goBack } from 'svelte-native'
    import { onMount } from 'svelte'

    let currentQuestion;
    let questionIndex = 0;
    let questionList = []

    onMount(async ()=>{
       const res = await fetch("http://10.0.2.2:8080/questionnaires/");
       const data = await res.json()
       questionList = data.results[0].questions
       currentQuestion = data.results[0].questions[0].question_text
    })

    function onAnswerTap(){
        questionIndex += 1
        currentQuestion = questionIndex >= questionList.length ? "Tak for dit svar" : questionList[questionIndex].question_text
    }

</script>

<page>
    <actionbar title="Client questionnaire page" />
    <stackLayout>
        <label class="selectionText">Questions from your psychologist</label>
        <label text="{currentQuestion}" class="questionText" textWrap="true" />
        <flexBoxLayout flexWrap="wrap" justifyContent="center">
            <button text="Answer1" />
            <button text="Answer2" />
            <button text="Answer3" />
            <button text="Answer4" />
            <button text="Answer5" />
            <button text="Answer6" />
            <button text="Answer7" />
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