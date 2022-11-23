<script>
	import { navigate } from 'svelte-native'
    import Questionnaire from '../pages/Questionnaire.svelte'
    import Home from '../pages/Home.svelte'
    import ClientDetail from '../pages/ClientDetail.svelte'
    import IconBox from './IconBox.svelte';
    import Settings from '../pages/Settings.svelte'

    function goToSettings(){
        navigate({ page: Settings })
    }

</script>
<dockLayout height="100%">
    <stackLayout class="nav-header" orientation="horizontal" dock="top">
        <IconBox imgUrl="~/static-resources/images/icons/calendar.png" />
        <image class="tobias" src="https://healper-static.s3.amazonaws.com/images/team-members/tobias.jpg"/>
        <IconBox imgUrl="~/static-resources/images/icons/account.png" handleTab="{goToSettings}" />
    </stackLayout> 
    <stackLayout dock="bottom" class="bottom-navigation" orientation="horizontal">
        <stackLayout on:tap="{ () => navigate({ page: Home }) }">
            <image src="~/static-resources/images/icons/home.png" class="icon" row="0" col="0" />
            <label text="Home" />
        </stackLayout>
        <stackLayout on:tap="{ () => navigate({ page: Questionnaire }) }" >
            <image src="~/static-resources/images/icons/sun.png" class="icon" row="0" col="0" />
            <label text="Diary" />
        </stackLayout>
        <stackLayout on:tap="{ () => navigate({ page: ClientDetail }) }">
            <image src="~/static-resources/images/icons/bar.png" class="icon" row="0" col="0" />
            <label text="Progress" />
        </stackLayout>
        <stackLayout>
            <image src="~/static-resources/images/icons/circle.png" class="icon" row="0" col="0" />
            <label text="Focus" />
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

    .nav-header{
        justify-content: space-around;
        padding-top: 20px;
    }

    .tobias{
        border-radius: 50%;
        height: 300px;
        width: 300px;
    }

</style>