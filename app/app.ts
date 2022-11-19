/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/
import Charts from 'svelte-native-nativescript-ui/chart'
import { svelteNativeNoFrame } from 'svelte-native'
import App from './App.svelte'


Charts.register();

svelteNativeNoFrame(App, {})
