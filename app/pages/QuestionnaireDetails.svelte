<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import { onMount } from "svelte";
    import TherapistTemplate from "../components/TherapistTemplate.svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import { getData } from "../store/dataHandler.js";
    import { authHeaders } from "../store/staticValues.js";
    import { Template } from "svelte-native/components";
    import {navigate} from "svelte-native";
    import OptionList from "./Therapist/OptionList.svelte";

    let secureStorage = new SecureStorage();
    let questionList;
    let authToken;
    let aHeaders;

    let inputQuestions = [];
    let choiceQuestions = [];
    let numericQuestions = [];

    export let questionnaire; 


    onMount(async () => {
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });
        
            const data = await getData("http://10.0.2.2:8080/questionnaires/" + questionnaire.pk, aHeaders);
            inputQuestions = data.inputquestions;
            choiceQuestions = data.choicequestions;
            numericQuestions = data.numericquestions;

            questionList = [...inputQuestions, ...choiceQuestions, ...numericQuestions]
    });


    function addQuestion(){
        navigate({
            page: QuestionForm, 
            props: {questionnairePk: questionnaire.pk}
        });
    };

    function seeQuestion(event){
        let q = questionList[event.index]
        navigate({
            page: OptionList, 
            props: {question: q}
        })

    }
</script>
<page actionBarHidden="true">
    <TherapistTemplate>
        <stackLayout>
            <label class="header" textWrap="true" text="Details of: {questionnaire.title}"/>
            <listView items="{questionList}" on:itemTap="{seeQuestion}" height="85%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/list.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.question_text}" class="question-name"/>
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
            <button text="+" on:tap="{addQuestion}"/>
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
    .question-name{
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