<script>
    import TherapistTemplate from "~/components/TherapistTemplate.svelte";
    import { Template } from "svelte-native/components"; 
    import { onMount } from "svelte";
    import { getData } from "~/store/dataHandler";
    import { baseHeaders } from "~/store/staticValues";

    let optionList; 
    let bHeaders; 

    onMount(async () =>{

        baseHeaders.subscribe((value) => {
                bHeaders = value;
            });

        optionList = getData("", bHeaders )

    }); 

    function editOption(){

    }

    function addOption(){
        
    }
    


</script>

<page actionBarHidden="true">
    <TherapistTemplate>
        <stackLayout>
            <!--<image class="healper-logo" src="~/static-resources/images/icons/.png"></image>-->
            <label class="header">List of options for the choosen question</label>
            <listView items="{optionList}" on:itemTap="{editOption}" height="90%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="~/static-resources/images/icons/list.png" class="icon" horizontalAlignment="right"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.standard}" class="question-name"/>
                        </stackLayout>
                    </stackLayout>
                </Template>
            </listView>
            <button text="+" on:tap="{addOption}"/>
        </stackLayout>
    </TherapistTemplate>
</page>