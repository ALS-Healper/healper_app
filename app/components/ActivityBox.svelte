<script>
    export let backgroundColor;
    export let boxHeaderText;
    export let boxDescText;

</script>
    <stackLayout>
        <label class="header" text="{boxHeaderText}"></label>
        <label class="description" text="{boxDescText}"></label>
        <image class="arrow-icon" src="~/static-resources/images/icons/arrow_right.png">
    </stackLayout>
<style>
    stackLayout{
        height: 800px;
        width: 90%;
        background-color: rgb(235, 234, 234);
        border: solid 1px black;
        margin-top: 100px;
        padding-bottom: 60px;
        border-radius: 10%;
    }

    .header{
        color: black;
        text-align: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 40px;
        font-weight:400;
    }

    .description{
        color: rgb(85, 80, 80);
        text-align: start;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 20px;
        width: 95%;
    }

    .arrow-icon{
        width: 100px;
        height: 100px;
        justify-self: end;
        align-self:flex-end;
    }
</style>