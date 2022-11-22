<script>
    import {SecureStorage} from "@nativescript/secure-storage";
    import LoginPage from "./LoginPage.svelte";

let secureStorage = new SecureStorage();

function logOut(){
    secureStorage.removeAllSync();
    navigate({
      page: LoginPage
    });
};
</script>

<page>
    <label text="The rapist home 🙊" />
    <button class="button" text="logout" on:tap="{logOut}"/>
</page>