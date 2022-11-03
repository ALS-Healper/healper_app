<page>
    <actionBar title="Home" />
    <gridLayout>
        <label class="info">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span text=" {message}" />
                <span text="Look, this string is only on Alek's branch!"/>
            </formattedString>
        </label>
    </gridLayout>
</page>

<script lang="ts">
    let message: string = "Blank Svelte Native App"

    //This is a comment for testing
</script>

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
