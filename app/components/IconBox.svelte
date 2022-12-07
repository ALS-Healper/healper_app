<script>
    export let imgUrl;
    export let handleTab;
</script>
<stackLayout on:tap="{handleTab}">
    <image src="{imgUrl}">
</stackLayout>
<style>
    stackLayout{
        padding-top: 20px;
        background-color: white;
        width: 150px;
        height: 150px;
        border-radius: 10%;
        margin-left: 16%;
        margin-right: 12%;
    }

    image{
        border-radius: 50%;
        height: 100px;
        width: 100px;
    }
</style>