<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import { onMount } from "svelte";
    import TherapistTemplate from "../components/TherapistTemplate.svelte";
    import { getData } from "../store/dataHandler.js"
    import { authHeaders } from "../store/staticValues.js";
    import { Template } from "svelte-native/components";

    let secureStorage = new SecureStorage();
    let user;
    let questionList;
    let questionnaireQuestions = [];
    let authToken;
    let aHeaders;

    let inputQuestions = [];
    let choiceQuestions = [];
    let numericQuestions = [];


    onMount(async () => {
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });
        
            const data = await getData("http://10.0.2.2:8080/questionnaires", aHeaders);
            inputQuestions = data.results[0].inputquestions;
            choiceQuestions = data.results[0].choicequestions;
            numericQuestions = data.results[0].numericquestions;

            questionList = [...inputQuestions, ...choiceQuestions, ...numericQuestions]
            //alert(JSON.stringify(questionList[1]))
    });

    function onTap(){
        alert ("Her skal der kunne redigeres i spørgsmålet0,")
    }
    
</script>

<page actionBarHidden="true">
    <TherapistTemplate>
        <stackLayout>
            <listView items="{questionList}" on:itemTap="{onTap}" height="90%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/fatass.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.question_text}" class="question-name"/>
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
            <button text="+" />
        </stackLayout>
    </TherapistTemplate>
</page>

<style>
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
        color: red;
    }

    button {
        width: 13%;
        font-size: 25;
        border-radius: 50%;
        background-color: rgb(45, 124, 124);
        color: white;
        font-weight: bolder;
    }
</style>