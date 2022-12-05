<script>
    import ActivityBox from "./ActivityBox.svelte";
</script>
    <page>
        <scrollView>
            <stackLayout> 
                <ActivityBox boxHeaderText="Anxiety checkup" boxDescText="A description "/>
                <ActivityBox boxHeaderText="Wisdom" boxDescText="A description "/>
                <ActivityBox boxHeaderText="Quote of the day" boxDescText="A description "/>
                <ActivityBox boxHeaderText="Quote of the day" boxDescText="A description "/>
            </stackLayout>
        </scrollView>
    </page>
<style>
    page, scrollView, stackLayout{
        background-color: transparent;
    }
</style>