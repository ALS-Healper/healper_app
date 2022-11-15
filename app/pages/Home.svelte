<script>
    import RoleSelect from './RoleSelect.svelte'
	import { navigate } from 'svelte-native'

</script>

<page>
    <actionBar title="Home" />
    <stackLayout>
        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" />
        <button text="Go to Diary" on:tap="{ () => navigate({ page: RoleSelect }) }" />
    </stackLayout>

</page>

<style>
    .info .fas {
        color: #3A53FF;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }

    .profileImage {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        margin: 100px;
    }

</style>