<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import { onMount } from "svelte";
    import ClientTemplate from "../components/ClientTemplate.svelte";
    import TherapistTemplate from "../components/ClientTemplate.svelte";
    import { getData } from "../store/dataHandler.js"
    import { authHeaders } from "../store/staticValues.js";
    import { formatDates } from '../store/dataHandler.js';
    import { StackLayout } from "@nativescript/core";

    export let clientPk; 

    let secureStorage = new SecureStorage();
    let user = {client: [], therapist:[]};
    let client = {username: "Loading username...", email: "Loading email..."}
    let therapist = {username: "Loading therapist..."};

    let choiceAnswers = [];
    let inputAswers = [];
    let numericAnswers = [];
    let numericAnswers1 = [];
    let authToken;
    let aHeaders;

    onMount(async () => {
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
        let clientQuestionEntries = await getData("http://10.0.2.2:8080/questionEntries/?client_pk=" + clientPk, aHeaders);

        client = clientQuestionEntries.results[0].user_ref;
        therapist = clientQuestionEntries.results[0].thera.user_ref;
        choiceAnswers = clientQuestionEntries.results[0].choiceentries;
        inputAswers = clientQuestionEntries.results[0].inputentries;
        numericAnswers = clientQuestionEntries.results[0].numericentries
        numericAnswers = numericAnswers.map(function(currentObject) {
            return {
                response_value: currentObject.response_value,
                entry_date: formatDates(currentObject.entry_date)
            };
        });
    });

</script>

<page actionBarHidden="true">
    <ClientTemplate>
        <tabView>
            <tabViewItem title="Info">
                <scrollView>
                    <stackLayout class="profilePage">
                        <stackLayout class="profile-card">
                            <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage"/>
                            <label text="{client.first_name} {client.last_name}" class="selectionText"/>
                            <stackLayout class="infoText">
                                <label text="Allowed data access: Yes"/>
                                <label text="Email: {client.email}"/>
                                <label text="Phonenumber: xxxxxxxx"/>
                                <label text="Questionnaire status: Waiting for answers"/>
                                <label text="Next appointment: 27/11/2022 15:15"/>
                            </stackLayout>
                        </stackLayout>
                        <stackLayout class="profile-card">
                            <label text="Notes..."/>
                        </stackLayout>
                </stackLayout>
                </scrollView>
            </tabViewItem>
            <tabViewItem title="Progress">
                <scrollView>
                    <stackLayout>
                        <label class="graph-label" text="Client feelings from 1-10 over time" textWrap="true" horizontal-align= "center"/>
                        <radCartesianChart id="cartesianChart" width="1500px" height="1600px">
                            <categoricalAxis prop:horizontalAxis labelFitMode="Rotate" labelRotationAngle="-300" lineColor="white" lineThickness="4"/>
                            <linearAxis prop:verticalAxis lineColor="white" lineThickness="4" lineHidden="false" ticksHidden="false"/>
                            <splineSeries items="{numericAnswers}" categoryProperty="entry_date" 
                            valueProperty="response_value" 
                            lineThickness="5" 
                            lineColor="green"
                            labelTextColor="white" />
                        </radCartesianChart>
                        <label class="graph-label" text='Client answers to "Have your taken your medicin today?"' textWrap="true" horizontal-align= "center"/>
                        <radCartesianChart id="cartesianChart" width="1500px" height="1600px">
                            <categoricalAxis prop:horizontalAxis lineColor="white" lineThickness="4"/>
                            <linearAxis prop:verticalAxis lineColor="white" lineThickness="4"/>
                            <barSeries items="{choiceAnswers}" 
                            categoryProperty="choice_value"
                            labelTextColor="white"/>
                        </radCartesianChart>
                    </stackLayout>
                </scrollView>
            </tabViewItem>
        </tabView>
    </ClientTemplate>
</page>

<style>
    radCartesianChart{
        width: 1000px;
        margin-bottom: 500px;
    }

    splineSeries{
        fillColor: black;
        stroke-width: 7;
        color: white;
        stroke-color: rgb(45, 124, 124); 
    }
    .selectionText{
        font-size: 25;
        text-align: center;
        font-style: oblique;
    }
    .infoText{
        font-size: 15;
    }
    .profileImage {
        border-radius: 50%;
        height: 20%;
        width: 40%;
    }
    .profile-card{
        background-color: white;
        border-radius: 10%;
        padding: 10%;
        margin-top: 50px;
        
    }
    .profilePage{
        width: 80%;
        
    }

    tabViewItem{
        background-color: transparent;
    }

    .graph-label{
        margin: 30;
        font-size: 25;
        color: white;
    }

</style>