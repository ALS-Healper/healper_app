<script>
    import { onMount } from "svelte";
    import { userToken } from '../store/userStore.js'
    import { Template } from 'svelte-native/components'
    import ClientTemplate from '../components/ClientTemplate.svelte'
    import { navigate } from 'svelte-native'
    import {SecureStorage} from "@nativescript/secure-storage"
    import ClientDetail from "./ClientDetail.svelte";

    let secureStorage = new SecureStorage()
    let clients = []
    let authToken;

    onMount( async () =>{
        authToken = secureStorage.getSync({
                key: "authToken"
            });
    
        const res = await fetch("http://10.0.2.2:8080/client-list/", {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            }
        });
        const data = await res.json()
        //alert(data.results[0].clients[0].user_ref.username)
        clients = data.results[0].clients
        //alert(clients)

    });

    function onClientTap(event) {
    navigate({
      page: ClientDetail,
      props: { clientPk: clients[event.index].pk }
    })
  }

</script>

<page>
    <ClientTemplate>
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
    </ClientTemplate>
</page>

<style>
    .profileImage{
        height: 100px;
        width: 100px;
        border-radius: 50%;
    }
</style>