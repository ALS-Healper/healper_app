<script>
    import {SecureStorage} from "@nativescript/secure-storage"

let secureStorage = new SecureStorage()
</script>

<page>
    <label text="The rapist home 🙊" />
    <button text="logout" on:tap="{() => secureStorage.removeSync({key: "token"})}"/>
</page>