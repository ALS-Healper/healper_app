<script>
    import { navigate } from "svelte-native"
    import Questionnaire from "../pages/Questionnaire.svelte"
    import Home from "../pages/Home.svelte"

</script>
<flexboxLayout orientation="horizontal" row="3" col="0" class="navBar" justifyContent="space-around">
    <button class="navButton" on:tap="{ () => navigate({ page: Home }) }">
        <formattedString>
            <span class="fas" text="&#xf135;\n"/>
            <span text="Home"/>
        </formattedString>
    </button>
    <button class="navButton">
        <formattedString>
            <span class="fas" text="&#xf135;\n"/>
            <span text="Menu"/>
        </formattedString>
    </button>
    <button class="navButton" on:tap="{ () => navigate({ page: Questionnaire }) }">
        <formattedString>
            <span class="fas" text="&#xf135;\n"/>
            <span text="Settings"/>
        </formattedString>
    </button>
</flexboxLayout>
<style>
    .fas {
        color: #3A53FF;
    }

    .navBar{
        background-color: rgb(45,124,124);
        align-items: center;
        border: 5px solid black;
        border-radius: 30px;
        height: 200px;
    }

    .navButton{
        margin: 0;
        border-color: transparent;
        background-color: transparent;
        border-width: 1;
        z-index: 0;
        font-size: 15;
    }

</style>