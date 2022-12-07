<script>
    export let buttonText = "Press";
    export let onTapFunc;
</script>
    <button text="{buttonText}" class="button" on:tap={onTapFunc} verticalAlignment="bottom"/>
<style>
    .button {
        position: fixed;
        bottom: 0;
        width: 80%;
        font-size: 18;
        border-radius: 20px;
        background-color: rgb(45, 124, 124);
        color: white;
        font-weight: bolder;
    }
</style>