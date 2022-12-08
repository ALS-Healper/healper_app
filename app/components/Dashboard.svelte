<script>
    import ActivityBox from "./ActivityBox.svelte";
</script>
    <page>
        <scrollView>
            <stackLayout> 
                <ActivityBox boxHeaderText="Quote of the day" boxDescText="A description " backgroundImgSrc="~/static-resources/images/stock/art.png"/>
                <ActivityBox boxHeaderText="Anxiety checkup" boxDescText="A description " backgroundColor="rgba(248, 51, 60, 0.5)"/>
                <ActivityBox boxHeaderText="Wisdom" boxDescText="A description" backgroundColor="rgba(38, 55, 49, .3)"/>
                <ActivityBox boxHeaderText="Quote of the day" boxDescText="A description" backgroundImgSrc="~/static-resources/images/stock/lake.jpg"/>
            </stackLayout>
        </scrollView>
    </page>
<style>
    page, scrollView, stackLayout{
        background-color: transparent;
    }
</style>