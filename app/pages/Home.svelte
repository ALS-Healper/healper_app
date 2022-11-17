<script>
    import RoleSelect from './RoleSelect.svelte'
	import { navigate } from 'svelte-native'
    import Questionnaire from './Questionnaire.svelte'
   
</script>

<page>
    <!-- <stackLayout>
        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" />
        <button text="Go to Diary" on:tap="{ () => navigate({ page: RoleSelect }) }" />
    </stackLayout> -->
    <gridLayout rows="200, 100, *, 80" columns="*">

        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" row="0" col="0" />
        <button text="Go to Diary" on:tap="{ () => navigate({ page: RoleSelect }) }"  row="1" col="0"/>
        <label text="Feed" class="info" row="2" col="0"/>
        <flexboxLayout orientation="horizontal" row="3" col="0" class="navBar" justifyContent="space-around">
            <button class="navButton">
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