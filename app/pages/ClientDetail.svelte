<script>
    import { Observable } from "@nativescript/core";
    import {SecureStorage} from "@nativescript/secure-storage"
    import { onMount } from "svelte";
    import Template from "../components/ClientTemplate.svelte"
    import { formatDates } from "../store/timehandler.js"


    export let clientPk
   
    let secureStorage = new SecureStorage()
    let client = {username: "Loading username...", email: "Loading email..."}
    let therapist = {username: "Loading therapist..."};
    let choiceAnswers = []
    let inputAswers = []
    let numericAnswers = []

    onMount( async () => {
        let token = secureStorage.getSync({
                key: "authToken"
            });

        const res = await fetch(`http://10.0.2.2:8080/questionEntries/?client_pk=${clientPk}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        const data = await res.json()

        client = data.results[0].user_ref
        therapist = data.results[0].thera.user_ref
        choiceAnswers = data.results[0].choiceentries
        inputAswers = data.results[0].inputentries
        numericAnswers = data.results[0].numericentries

        if(choiceAnswers.length > 0){

        }

    });

</script>

<page actionBarHidden="true">
    <Template>
        <gridLayout rows="50, 70, *" columns="250, *">
            <label bind:text="{client.username}" class="selectionText" row="0" col="0"/>
            <stackLayout row="1" col="0" >
                <label text="Email: {client.email}" class="infoText" />
                <label bind:text="{clientPk}" class="infoText" />
            </stackLayout>
            <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" row="0" col="1" rowSpan="2"/>
            <tabView row="2" col="0" colSpan="2">
                <tabViewItem title="Answers">
                    <scrollView>
                        <stackLayout>
                            <label text="Choice questions" class="selectionText"/>
                            {#each choiceAnswers as answer}
                                <stackLayout>
                                    <label text="{answer.question.question_text}" />
                                    <label text="{answer.choice_value}" />
                                </stackLayout>
                            {/each}
                            <label text="Input questions" class="selectionText"/>
                            {#each inputAswers as answer}
                                <stackLayout>
                                    <label text="{answer.question.question_text}" />
                                    <label text="{answer.response_text}" />
                                </stackLayout>
                            {/each}
                            <label text="Numeric questions" class="selectionText"/>
                            {#each numericAnswers as answer}
                                <stackLayout>
                                    <label text="{answer.question.question_text}" />
                                    <label text="{answer.response_value}" />
                                </stackLayout>
                            {/each}
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
        </gridLayout>
    </Template>
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
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .infoText{
        font-size: 15;
        horizontal-align: center;
        vertical-align: center;
    }
    .profileImage {
        border-radius: 50%;
        margin-top: 20px;
        height: 200px;
        width: 200px;
    }

    tabViewItem{
        background-color: transparent;
    }

    .graph-label{
        margin: 30;
        font-size: 25;
        font-weight: bolder;
        color: white;
    }

</style>