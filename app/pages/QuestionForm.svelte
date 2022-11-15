<script>
    import { goBack } from 'svelte-native'
    let textFieldValue = ""

</script>

<page>
    <actionbar title="Question form page" />
    <stackLayout class="Text">
        <label>Create questions here</label>
        <textField col="0" row="0" bind:text="{textFieldValue}" hint="Type new question..." editable="true"/>
        <button text="Back" class="button" on:tap="{goBack}"/>
    </stackLayout>
</page>

<style>
    .Text{
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .button {
        width: 30%;
        font-family: 20;
    }
</style>