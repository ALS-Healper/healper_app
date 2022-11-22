<script>
    import { onMount } from "svelte";
    import { userToken } from '../store/userStore.js'
    import { Template } from 'svelte-native/components'

    let clients = []
    let authToken;

    onMount( async () =>{
        userToken.subscribe((data) =>{
        authToken = data.Token
        })
    
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

</script>

<page>
    <stackLayout>
        <label> placeholder for clientoverview</label>
        <listView items="{clients}">
            <Template let:item>
                <label text="{item.user_ref.username}" />
            </Template>
        </listView>
    </stackLayout>
</page>

<style>

</style>