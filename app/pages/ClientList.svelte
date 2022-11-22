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
            <label> placeholder for clientoverview</label>
            <listView items="{clients}" on:itemTap="{onClientTap}">
                <Template let:item>
                    <gridLayout columns="300, 100">
                        <label text="{item.user_ref.first_name} {item.user_ref.last_name}" col="0"/>
                        <image src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="profileImage" col="1"/>
                    </gridLayout>
                </Template>
            </listView>
        </stackLayout>
    </TherapistTemplate>
</page>

<style>
    .profileImage{
        height: 100px;
        width: 100px;
        border-radius: 50%;
    }
</style>