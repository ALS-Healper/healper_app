<script>
    import RoleSelect from './RoleSelect.svelte'
    import ClientOverview from './ClientOverview.svelte';
	import { navigate } from 'svelte-native'
    import Questionnaire from './Questionnaire.svelte'
</script>

<page actionBarHidden="true">
    <!-- <stackLayout>
        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" />
        <button text="Go to Diary" on:tap="{ () => navigate({ page: RoleSelect }) }" />
    </stackLayout> -->
    <gridLayout rows="200, 100, *, 80" columns="*">


        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" row="0" col="0" />
        <button text="Go to Diary" on:tap="{ () => navigate({ page: RoleSelect }) }"  row="1" col="0"/>
        <label text="Feed" class="info" row="2" col="0"/>
    </gridLayout>
</page>

<style>
    .fas {
        color: #3A53FF;
    }

    .navBar{
        background-color: aqua;
        align-items: center;
        border: 5px solid black;
        border-radius: 30px;
        
    }

    .navButton{
        margin: 0;
        border-color: transparent;
        background-color: transparent;
        border-width: 1;
        z-index: 0;
        font-size: 15;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }

    .profileImage {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        margin: 100px;
    }

</style>