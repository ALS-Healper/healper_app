<script>
    import { onMount } from "svelte";
    import { Template } from 'svelte-native/components'
    import TherapistTemplate from '../../components/TherapistTemplate.svelte'
    import { navigate } from 'svelte-native'
    import {SecureStorage} from "@nativescript/secure-storage"
    import ClientDetail from "../Shared/ClientDetail.svelte";
    import { authHeaders } from "../../store/staticValues.js"
    import { getData } from "../../store/dataHandler.js"

    let secureStorage = new SecureStorage()
    let clients = []
    let authToken;
    let aHeaders;
    //const color = new Color(2, 12, 200, 23, "rgb")
    onMount( async () =>{
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });

        const data = await getData("http://10.0.2.2:8080/client-list/", aHeaders)
        clients = data.results
    });

    function onClientTap(event) {
        const client = clients[event.index]
        if (client.data_access === true){
            navigate({
                page: ClientDetail,
                props: { clientPk: clients[event.index].pk }
                })
        }
        else{
            alert("You do not have access to this Client!")
        }
  }

</script>
<page>
    <TherapistTemplate>
        <stackLayout>
            <searchBar hint="Search" />
            <listView items="{clients}" on:itemTap="{onClientTap}" height="100%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="client-image"/>
                        <stackLayout verticalAlignment="middle" style="padding: 0%;">
                            <label text="{item.user_ref.first_name} {item.user_ref.last_name}" class="client-name"/>
                            <label text="{item.user_ref.username}" class="client-text"/>
                            <label text="{item.user_ref.email}" class="client-text"/>
                            <!-- <label text="Data access: {item.data_access}" class="client-text"/> -->
                        </stackLayout>
                        {#if item.data_access != true}
                            <image src="~/static-resources/images/icons/block.png" class="icon" horizontalAlignment="right"/>
                        {/if}
                    </stackLayout>
                </Template>
            </listView>
        </stackLayout>
    </TherapistTemplate>
</page>
<style>
    .client-image{
        height: 15%;
        width: 15%;
        border-radius: 50%;
        margin-right: 5%;
        margin-top: 0;
    }
    .client-name{
        font-size: 17;
        font-weight: bold;
        padding-top: 0%;
        padding-bottom: 0%;
    }
    .client-text{
        padding-top: 0%;
        padding-bottom: 0%;
    }

    .icon{
        width: 100px;
        height: 100px;
        margin-bottom: 0;
        color: red;
    }
</style>