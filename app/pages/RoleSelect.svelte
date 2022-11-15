<script>
import { goBack } from 'svelte-native'
import { navigate } from 'svelte-native'
import Questionnaire from './Questionnaire.svelte'
import ClientOverview from './ClientOverview.svelte'

</script>

<page>
    <actionbar title="Temporary role select page" />
    <stackLayout>
        <label class="selectionText">Please select role</label>
        <button text="Client" class="button" on:tap="{ () => navigate({ page: Questionnaire }) }"/>
        <button text="Psychologist" class="button" on:tap="{ () => navigate({ page: ClientOverview }) }"/>
        <button text="Back" class="button" on:tap="{goBack}"/>
    </stackLayout>
</page>

<style>
    .selectionText{
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .button {
        width: 30%;
        font-family: 20;
    }
</style>