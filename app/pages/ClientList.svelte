<script>
    import { onMount } from "svelte";
    import { userToken } from '../store/userStore.js'
    import { Template } from 'svelte-native/components'
    import TherapistTemplate from '../components/ClientTemplate.svelte'
    import { navigate } from 'svelte-native'
    import {SecureStorage} from "@nativescript/secure-storage"
    import ClientDetail from "./ClientDetail.svelte";
    import { authHeaders } from "../store/staticValues.js"
    import { getData } from "../store/dataHandler.js"
    import { StackLayout } from "@nativescript/core";

    let secureStorage = new SecureStorage()
    let clients = []
    let authToken;
    let aHeaders;

    onMount( async () =>{
        authToken = secureStorage.getSync({
                key: "authToken"
            });

        authHeaders.subscribe((value) => {
                aHeaders = value;
                aHeaders.Authorization = `Token ${authToken}`;
            });

        const data = await getData("http://10.0.2.2:8080/client-list/", aHeaders)
        clients = data.results[0].clients
    });

    function onClientTap(event) {
    navigate({
      page: ClientDetail,
      props: { clientPk: clients[event.index].pk }
    })
  }

</script>

<page>
    <TherapistTemplate>
        <stackLayout>
            <searchBar hint="Search" >
            </searchBar>
            <listView items="{clients}" on:itemTap="{onClientTap}" height="100%">
                <Template let:item>
                    <stackLayout orientation="horizontal">
                        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="client-image"/>
                        <stackLayout>
                            <label text="{item.user_ref.first_name} {item.user_ref.last_name}" class="client-name"/>
                            
                        </stackLayout>
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
    }
</style>