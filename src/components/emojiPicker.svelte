<script>
import { EmojiButton } from "@joeattardi/emoji-button";
import {
      Button,
    } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import Upload from "carbon-icons-svelte/lib/Upload.svelte";

  const dispatch = createEventDispatcher();

  const picker = new EmojiButton();
  let trigger;

  picker.on("emoji", selection => {
    dispatch("change", selection);
  });

  function togglePicker() {
    picker.togglePicker(trigger);
  }
</script>
<Button bind:this={trigger} on:click={togglePicker} kind="tertiary" iconDescription="Change Emoji" icon={Upload}/>
