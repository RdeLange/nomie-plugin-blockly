<script>
    import { createEventDispatcher } from 'svelte';
    import ColorPicker from '../components/ColorPicker.svelte';
    import { DateInput } from 'date-picker-svelte'
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
        TextArea,
        Tile,
    } from "carbon-components-svelte";
    import EmojiPicker from "../components/emojiPicker.svelte"
    import Play from "carbon-icons-svelte/lib/PlayOutline.svelte";
   
    export let pluginname;
    export let pluginemoji;
    export let name = "dummy";
    export let displayName = "Dummy";
    export let description = "Dummy and dummy";
    export let color = "#DAAFE9";
    export let emoji = "🧱"
    export let theme;
    export let latestrun = new Date().toISOString();

    var startitteration = new Date(latestrun);
    var enditteration = new Date(latestrun);
    console.log(latestrun);
   
   const dispatch = createEventDispatcher();
   var date = new Date(latestrun);

   if (theme == "g90"){
    document.documentElement.style.setProperty('--date-picker-background', "#4A4A4B");
    document.documentElement.style.setProperty('--date-picker-foreground', "#f7f7f7");
    document.documentElement.style.setProperty('--date-input-width', "100px");
   }

   if (theme == "g10"){
    document.documentElement.style.setProperty('--date-picker-background', "#E2E3E2");
    document.documentElement.style.setProperty('--date-picker-foreground', "#272727");
    document.documentElement.style.setProperty('--date-input-width', "100px");
   }

   
   
   $: if(date) {
    latestrun = date.toISOString();
   }
   
   //let pickedEmoji = "";
   var disablebutton = true;

   $: if(!name || !description) {
    disablebutton = true;
   }
   else {disablebutton = false}

   function onEmojiChange(event) {
    emoji = event.detail.emoji;
  }

  function executeItteration(){
    dispatch("executesingleitteration",[startitteration,enditteration]);
  }
</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">Edit Workspace</h5>
          <hr>
        </Column>
      </Row>
    </Grid>
    <TextArea rows={1} maxCount={20} labelText="Displayname" placeholder="Enter Display Name..." bind:value={displayName}/>
        <TextArea rows={2} maxCount={200} labelText="Fast description" placeholder="Enter a description..." bind:value={description}/>
        <TextArea rows={1} maxCount={20} labelText="Shortname" placeholder="Enter Short Name..." bind:value={name}/>
        <br>
        <Tile>
        <p>Color:</p>
        <br>
        <ColorPicker bind:theme={theme} bind:value={color}></ColorPicker>
      </Tile>
        <br>
        <Tile>
      <div class="row">
          <div class="column" style="width:40%">
        <p>Emoji:</p>
        <br>
        <h2><EmojiPicker on:change={onEmojiChange}/> {emoji}</h2>
        </div>
        <div class="column" style="width:60%">
        <p>Latest Run:</p>
        <br>
        <DateInput bind:value={date} closeOnSelection={true} format="yyyy-MM-dd"/>
        </div>
        </div>
      </Tile>
      <br>
      <Tile>
        <p>Single Manual Itterated Workspace Run:</p>
        <br>
        <div class="row">
          
          <div class="column" style="width:40%">
           Start: <DateInput bind:value={startitteration} closeOnSelection={true} format="yyyy-MM-dd" /></div>
           <div class="column"  style="width:40%">
            End: <DateInput bind:value={enditteration} closeOnSelection={true} format="yyyy-MM-dd"/></div>
            <div class="column"  style="width:20%">
              <br>
              <span on:click={()=>{executeItteration()}}><Play size={24} style="cursor: pointer;"/></span>
            </div> 
        </div> 
      </Tile>
          
        <br>
        <br>
        <Row>
          <Column>
              <br>
               <span><Button kind="secondary" on:click={()=>{dispatch("exitedit")}} style="float: left;">Exit</Button></span>
               <br>
          </Column>
        <Column>
            <br>
             <span><Button disabled={disablebutton} on:click={()=>{dispatch("saveworkspace")}} style="float: right;">Save</Button></span>
             <br>
        </Column>
    </Row>    
  </Content>



  <style>

:root {
  --date-picker-background: #4A4A4B;
  --date-picker-foreground: #f7f7f7;
}
    h2 {
       margin: 0;
       padding: 0;
       font-size: 2.5em;
       font-weight: 400;
   }

   .column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

 </style>

