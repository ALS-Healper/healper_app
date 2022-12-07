<script>
	import { navigate } from "svelte-native";
    import Home from "../pages/Shared/Home.svelte";
    import ClientList from "~/pages/Therapist/ClientList.svelte";
    import QuestionnaireList from "~/pages/QuestionnaireList.svelte";
</script>
<dockLayout height="100%">
    <stackLayout dock="bottom" class="bottom-navigation" orientation="horizontal">
        <stackLayout on:tap="{ () => navigate({ page: Home }) }">
            <image src="~/static-resources/images/icons/home.png" class="icon" row="0" col="0" />
            <label text="Home" />
        </stackLayout>
        <stackLayout on:tap="{() => alert("No page yet")}" >
            <image src="~/static-resources/images/icons/sun.png" class="icon" row="0" col="0" />
            <label text="Temp" />
        </stackLayout>
        <stackLayout on:tap="{ () => navigate({ page: ClientList }) }">
            <image src="~/static-resources/images/icons/bar.png" class="icon" row="0" col="0" />
            <label text="Clients progress" />
        </stackLayout>
        <stackLayout on:tap="{() => navigate({page: QuestionnaireList})}">
            <image src="~/static-resources/images/icons/circle.png" class="icon" row="0" col="0" />
            <label text="Questionnaires" />
        </stackLayout>
    </stackLayout>
    <slot />
</dockLayout>
<style>
    .bottom-navigation{
        background-color:rgba(252, 249, 244); 
        justify-content: space-around;
        box-shadow: 0px -2px 2px rgba(34,34,34,0.6);
        height: "100", 2%;
    }

    .icon{
        width: 100px;
        height: 100px;
        margin-bottom: 0;
    }

    .bottom-navigation stackLayout{
        width: 25%;
        border-color: transparent;
        border-width: 1;
        color:  rgb(45, 124, 124); 
        text-align: center;
        align-items: center;
    }

</style>