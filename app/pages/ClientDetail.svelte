<script>
    import { onMount } from "svelte";
    import { ObservableArray } from 'tns-core-modules/data/observable-array';

export const getCountriesData = () => {
  return new ObservableArray([
    { Country: 'Germany', Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
    { Country: 'France', Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
    { Country: 'Bulgaria', Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
    { Country: 'Spain', Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
    { Country: 'USA', Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
  ]);
};

let answersList = []
let client = {username: "Loading username...", email: "Loading email..."}
let therapist = {username: "Loading therapist..."};
let choiceAnswers = []
let inputAswers = []
let numericAnswers = []

onMount( async () => {
    const res = await fetch("http://10.0.2.2:8080/questionEntries/")
    const data = await res.json()

    client = data.results[0].user_ref
    therapist = data.results[0].thera.user_ref
    choiceAnswers = data.results[0].choiceentries
    inputAswers = data.results[0].inputentries
    numericAnswers = data.results[0].numericentries
});

</script>

<page actionBarHidden="true">
    <gridLayout rows="50, 70, *" columns="250, *">
        <label bind:text="{client.username}" class="selectionText" row="0" col="0"/>
        <stackLayout row="1" col="0" >
            <label text="Email: {client.email}" class="infoText" />
            <label text="Therapist: {therapist.username}" class="infoText" />
        </stackLayout>
        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" row="0" col="1" rowSpan="2"/>
        <tabView row="2" col="0" colSpan="2">
            <tabViewItem title="Answers">
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
        </tabViewItem>
        <tabViewItem title="Graph">
            <label text="Hello :D"/>
        </tabViewItem>
    </tabView>
    </gridLayout>
</page>

<style>
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

</style>