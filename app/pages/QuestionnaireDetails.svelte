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

    export let questionnairePk; 


    onMount(async () => {
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });
        
            const data = await getData("http://10.0.2.2:8080/questionnaires/" + questionnairePk, aHeaders);
            inputQuestions = data.results[0].inputquestions;
            choiceQuestions = data.results[0].choicequestions;
            numericQuestions = data.results[0].numericquestions;

            questionList = [...inputQuestions, ...choiceQuestions, ...numericQuestions]
    
    });

    alert(JSON.stringify(questionList))

    function addQuestion(){
        navigate({
            page: QuestionForm, props: {questionnairePk: questionnairePk}
        });
    };

    function seeQuestion(){
        navigate({
            page: OptionList
        })

    }
</script>
<page actionBarHidden="true">
    <TherapistTemplate>
        <stackLayout>
            <label class="header">List of questions for the choosen questionnaire</label>
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
        color: black;
        text-align: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif';
        font-size: 15px;
        font-weight:400;
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