<script>
    import { onMount } from "svelte";
    import { Template } from "svelte-native/components";
    import TherapistTemplate from "../components/TherapistTemplate.svelte";
    import { navigate } from 'svelte-native';
    import {SecureStorage} from "@nativescript/secure-storage";
    import { authHeaders } from "../store/staticValues.js";
    import { getData } from "../store/dataHandler.js";
    import QuestionnaireDetails from "./QuestionnaireDetails.svelte";

    let secureStorage = new SecureStorage();
    let questionnaires;
    let authToken;
    let aHeaders;

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

    function onQuestionnaireTap() {
        navigate({
            page: QuestionnaireDetails
        });
    };
</script>
<page>
    <TherapistTemplate>
        <stackLayout>
            <listView items="{questionnaires}" on:itemTap="{onQuestionnaireTap}" height="100%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/fatass.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.title}" class="questionnaire-name"/>
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
        </stackLayout>
    </TherapistTemplate>
</page>
<style>
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
        color: red;
    }
</style>