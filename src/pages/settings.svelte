<script>
    import { createEventDispatcher } from 'svelte';
    import { DateInput } from 'date-picker-svelte';
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
        Tile,
        TextArea,
    } from "carbon-components-svelte";
   
    export let pluginname;
    export let pluginemoji;
    export let lastcentralschedule;
    export let theme;
    export let centralscheduleslist;
    export let workspaces;

   
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

   let open=true;
   var date = new Date(lastcentralschedule);
   var consoletext;
   var showoutput = false;

   $: if(date) {
    lastcentralschedule = date.toISOString();
   }

   
   const dispatch = createEventDispatcher();

   function exitSettings(){
        dispatch("exitsettings");
        open = false;
    }

    function saveSettings(){
        dispatch("savesettings");
       // dispatch("exitsettings");
        //open = false;
    } 

    function startSchedule(){
      dispatch("startschedule");
    }
    
    function showSchedulerLog(){
      consoletext = centralscheduleslist;
    }

    function runShowValidSchedules(){
      consoletext = "";
      let overview = "WORKSPACES WITH VALID SCHEDULES\n";
        overview += "================================\n\n";
      console.log("Show Valid Schedules Started")
      let wspaces = workspaces;

      for (var i = 0; i < wspaces.length; i++) {
        let jscode = wspaces[i].jscode;
        if (jscode.includes('s4eblocklyframe = "activated"') && !jscode.includes('var schedule = "none"')){
          overview += "Workspace: "+wspaces[i].displayName+" ==> VALID SCHEDULE\n";
        }
        else {overview += "Workspace: "+wspaces[i].displayName+" ==> NON VALID SCHEDULE\n";}
      }
      consoletext = overview;
}

async function LoadFile(action) {
	document.querySelector("#file-input").value = null;
    document.querySelector("#file-input").click();
    var awaitfile = setInterval(function() {
  		if (document.querySelector("#file-input").files[0]) {
			importFile(document.querySelector("#file-input").files[0],action);
    		clearInterval(awaitfile);
  		}
	}, 1000);

}

function importFile(file,action) {
	//let file = document.querySelector("#file-input").files[0];
		let reader = new FileReader();
		reader.addEventListener('load', function(e) {
	    		let text = e.target.result;
				var obj = JSON.parse(text);
        if (action == "add"){
				dispatch("import_add",obj);}
        else if (action == "replace"){
				dispatch("import_replace",obj);}

		});
		reader.readAsText(file);
}

function SaveFile() {
  let contentType = "text/plain";
  // Create a date object from a date string
var date = new Date();
// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });
// Generate yyyy-mm-dd date string
var formattedDate = day + "_" + month + "_" + year;
  let fileName = "Backup_"+formattedDate+".wsp";
	//fileName = Workspaces[0].id+".wsp";
    let content = JSON.stringify(workspaces);

        const a = document.createElement("a");
		  const file = new Blob([content], { type: contentType });
		  a.href = URL.createObjectURL(file);
		  a.download = fileName;
		  a.click();
   
}


</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">Plugin Settings</h5>
          <hr>
        </Column>
      </Row>
    </Grid>

    <Tile>
      <h4>Manual Run Schedule:</h4>
      <h6>Manually Run the Scheduler</h6>
      <br>
      <Button on:click={()=>{startSchedule()}}>Run</Button>
    </Tile>
    <br>
    <Tile>
      <h4>Scheduler Logs:</h4>
      <h6>Show an overview of all schedules executed</h6>
      <br>
      <Button on:click={()=>{showSchedulerLog()}}>Show</Button>
    </Tile>
    <br>
    <Tile>
      <h4>Valid Workspaces:</h4>
      <h6>Show an overview of Blockly Workspaces with valid schedule configuration</h6>
      <br>
      <Button on:click={()=>{runShowValidSchedules()}}>Show</Button>
    </Tile>
    <br>
    <Tile>
      <h4>Backup and Import:</h4>
      <h6>Backup all your workspaces or import a previously taken backup by adding to current workplaces or replacing current workplaces</h6>
      <br>
      <Row>
        <Column>
          <span><Button on:click={()=>{SaveFile()}} style="float:left;width:100%;padding:1px">Backup</Button></span>
        </Column>
        <Column>
          <span><Button on:click={()=>{LoadFile("add")}} style="float:center;width:100%;padding:1px">Add</Button></span>
          </Column>
          <Column>
            <span><Button on:click={()=>{LoadFile("replace")}} style="float:right;width:100%;padding:1px">Replace</Button></span>
            </Column>
      </Row>
    </Tile>
    <br>
    <Tile>
      <h4>Adjust Date Last Schedule:</h4>
      <h6>This will adjust the date of the last execution of the Scheduler. Next schedule will start from adjusted date</h6>
      <br>
      <Row>
      <Column>
      <DateInput bind:value={date} closeOnSelection={true} format="yyyy-MM-dd" />
      </Column>
      <Column>
        <span><Button on:click={saveSettings} style="float: right;">Save</Button></span>
        </Column>
    </Row>
    </Tile>
    <br>
    <Tile>
         <Row>
        <Column>
          <TextArea rows={8} labelText="Output Console" placeholder="Output..." readonly={true} bind:value={consoletext}/>
          </Column>
        </Row>
      </Tile>

       
    <Row>
      <Column>
          
      </Column>
    <Column>
      <br>
      <span><Button kind="secondary" on:click={exitSettings} style="float: right;">Exit</Button></span>
      <br>
    </Column>
</Row>
  </Content>



  <style>
    h2 {
       margin: 0;
       padding: 0;
       font-size: 2.5em;
       font-weight: 400;
   }

   .column {
  float: left;
  width: 33.33%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.right {
  width:100%
    }

    .right span {
        padding: 0 0 0 .5rem;
        cursor: pointer;
    }

 </style>

