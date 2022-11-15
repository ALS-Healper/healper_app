<script>
    let message = "Blank Svelte Native Diary"

    //This is a comment for testing
</script>

<page>
    <actionBar title="Diary" />
    <gridLayout>
        <label class="info">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span text=" {message}" />
            </formattedString>
        </label>
    </gridLayout>
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
</style>