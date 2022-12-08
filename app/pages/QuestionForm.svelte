<script>
    import { showModal } from "svelte-native";
    import TherapistTemplate from "../components/TherapistTemplate.svelte";
    import AddQuestionModal from "../components/addQuestionModal.svelte";
    import { authHeaders } from "../store/staticValues.js";
    import { onMount } from "svelte";
    import { user } from "~/store/userStore";

    let authToken;
    let aHeaders;

    export let questionnairePk;

    let options = [
		"input questions",
		"choice questions",
		"numeric questions"
	];

    onMount(async ()=>{
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

    });

    function addQuestionModal(pickedQuestion){
        showModal({page: AddQuestionModal, props: {question: pickedQuestion, questionnairePk: questionnairePk} });
    };
</script>

<page>
    <TherapistTemplate>
        <actionbar title="Question form page" />
        <flexBoxLayout flexWrap="wrap" justifyContent="center">
            <stackLayout class="Text">
                <label text="What kind of question would you like to create" textWrap="true" justifyContent="center"/>
                {#each options as value}
                    <button type="radio" textWrap="true" bind:textContent="{value}" on:tap="{() => addQuestionModal(value)}">{value}</button>
                {/each}
            </stackLayout>
        </flexBoxLayout>
    </TherapistTemplate>
</page>

<style>
    .Text{
        font-size: 20;
        vertical-align: center;
    }
    
    button {
        width: 30%;
        font-family: 20;
    }
</style>