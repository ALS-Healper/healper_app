<script>
    import { onMount } from "svelte";
    import { Template } from "svelte-native/components";
    import TherapistTemplate from "../components/TherapistTemplate.svelte";
    import { navigate, showModal } from 'svelte-native';
    import {SecureStorage} from "@nativescript/secure-storage";
    import { authHeaders } from "../store/staticValues.js";
    import { getData } from "../store/dataHandler.js";
    import QuestionnaireDetails from "./QuestionnaireDetails.svelte";
    import AddQuestionnaireModal from "~/components/addQuestionnaireModal.svelte";

    let secureStorage = new SecureStorage();
    let questionnaires;
    let authToken;
    let aHeaders;
    let choosenQuestionnaire;

    onMount( async () =>{
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });

        const data = await getData("http://10.0.2.2:8080/questionnaires/", aHeaders)
        questionnaires = data.results

    });

    function onQuestionnaireTap(event) {
       let choosenQuestionnaire = questionnaires[event.index]
        navigate({
            page: QuestionnaireDetails, props: {questionnaire: choosenQuestionnaire}
        });
    };

    function addQuestionnaireModal(){
        showModal({
            page: AddQuestionnaireModal,
        });
    };

</script>
<page>
    <TherapistTemplate>
        <stackLayout orientation="vertical">
            <label class="header" textWrap="true">List of your created questionnaires</label>
            <listView items="{questionnaires}" on:itemTap="{onQuestionnaireTap}" height="85%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/list.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.title}" class="questionnaire-name"/>
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
            <button text="+" on:tap="{addQuestionnaireModal}"/>
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
    .questionnaire-name{
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