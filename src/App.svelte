<script>
  import { onMount } from 'svelte';
  import { globalplugin , trackablelist } from './store/stores';
  import {notifications} from './components/notifications.js'
	import Toast from './components/toast.svelte'
  import "carbon-components-svelte/css/all.css";
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
    Theme,
    Button,
  } from "carbon-components-svelte";
  import nid from "./modules/nid/nid";
  import Main from "./pages/main.svelte";
  import Info from "./pages/info.svelte";
  import Settings from "./pages/settings.svelte";
  import Edit from "./pages/main-edit.svelte";
  
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import Sun from "carbon-icons-svelte/lib/Sun.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import Workspace from './pages/workspace.svelte';
  import { runCode }  from "./tools/blockly_executer.svelte";
  import { runBlocklyScheduler }  from "./tools/blockly-start-schedule.svelte";
  import { ExecuterConsole, SingleExecuterConsole, ExecuterRunning } from './tools/blockly_executer.svelte';
  import Widget from "./components/widget.svelte";

  let executionrunning = false;

  ExecuterRunning.subscribe(value => {  
		executionrunning = value;
	});
  
  const pluginname = "Blockly Plugin";
  const pluginemoji = "🧱";
  var parent = "";
  
  const plugin = new NomiePlugin({
        name: pluginname,
        emoji: pluginemoji,
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZooooAKKRmCjLHAqA3sIPBJ+gppN7CbSLFFVvt0Xo35UfbovRvyp8kuwcyLNFVvt0Xo35UfbovRvyo5Jdg5kWaKrfbovRvyo+3RejflRyS7BzIs0VW+3RejflR9ui9G/Kjkl2DmRZoqNZlYAgHml81fepGPopnmr70eavvQA+imeavvR5q+9AD6KZ5q+9PBB6GgAooooAKKKKACiig9DQBmXUxkkIz8o6CoaD1P1orsSsrGDdwooooEFFFFABRRRQAUlLSUAX4/8AVr9KdTY/9Wv0p1cr3N0FFFFIAooooAKVWKnIpKKALIORmikT7g+lLSGFFFFABQehooPQ0AYx6n60UHqfrRXYc4UUUUAFFFFABRRRQAUlLSUAX4/9Wv0p1Nj/ANWv0p1cr3N0FFFFIAooooAKKKKALCfcH0paRPuD6UtIYUUUUAFB6Gig9DQBjHqfrRQep+tFdhzhRRRQAUUUUAFFFOEbldwU4ouA2kpaSgC/H/q1+lOpsf8Aq1+lOrle5ugooopAFFFFABRRRQBYT7g+lLSJ9wfSlpDCiiigAoPQ0UHoaAMY9T9aKD1P1orsOcKKKKACiiigAq+v3R9KoVfHQfSsqvQuAySFX56H1qtJEydRketXaKiM2inFMbH/AKtfpTqBwMCipZQUUUUgCiiigAooooAsJ9wfSlpE+4PpS0hhRRRQAUHoaKD0NAGMep+tFB6n60V2HOFFFFABRRRQAVfHQfSqFXx0H0rKr0LgLRRRWJoFFFFABRRRQAUUUUAFFFFAFhPuD6UtIn3B9KWkMKKKKACg9DRQehoAxj1P1ooPU/Wiuw5wooooAKKKKACr46D6VQq+Og+lZVehcBaKQkKMk4FQSXHZPzrNRb2LbSLFFNQ5RSfSnUhhRRRSAKKKKACiiigCwn3B9KWkT7g+lLSGFFFFABQehooPQ0AYx6n60UHqfrRXYc4UUUUAFFFFABUwuSExt59ahopNJ7jTaFd2c5Y5ptLSUxF+P/Vr9KdTY/8AVr9KdXK9zdBRRRSAKKKKACiiigCwn3B9KWkT7g+lLSGFFFFABQehooPQ0AYx6n60UHqfrRXYc4UUUUAFFFFABRRRQAUlLSUAX4/9Wv0p1Nj/ANWv0p1cr3N0FFFFIAooooAKKKKALCfcH0paRPuD6UtIYUUUUAFB6UUUAY7gq7A9jSVoXNr5h3p9709apGGVTgo35V1RkmjFxaGUUFSpwwI+tFUSFFFFABRRQAScAZNABSU/ypP7jflR5Un9xvyougsXI/8AVr9KdSRqRGoIPSnbT6GuV7m6Eopdp9DRtPoaQCUUu0+ho2n0NACUUu1vQ09IznLUASLwo+lLRRSGFFFFABRRRQAUUUUAVb6IugdRyvX6VQrZqnPZ5JaL8q2pztozOUeqKVFOaN0PzIw/CkCM3RWP0FbXMxKt2MRLGQjgcCkhs2YgycD071fACgADAFZTmrWRpGPVhRRRWBoFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFGBRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//Z",
        description: "Blockly Plugin for creating your own simple automations",
        uses: ['createNote', 'onLaunch', 'getLocation', 'searchNotes', 'onNote'],
        version: "0.9",
        addToCaptureMenu: true,
        addToMoreMenu: true,
        addToWidgets: true,
      }); 
  let inNomie = false;
  let isSideNavOpen = false;
  let theme = "g10";
  let mode = "hidden";
  let loading = true;
  let view = "main";

  // BLOCKY PLUGIN VARIABLES DECLARATION START
  
  let blockly = {workspaces:[],lastcentralschedule: new Date().getTime(),centralscheduleslist:""};
    let id=  "";
		let name ="" ;
		let description="";
    let color="";
    let displayName="";
    let emoji="";
    let active= "";
    let block = "";
    let workspaceBlocks= "";
    let workspacePosition= "";
    let jscode= "";
    let latestrun= new Date().toDateString();
    let schedule="";
    let amountofcards = 0;

    let isEditMode = false;
    let isAddMode = false;
    let consoleoutput = "";
    
    SingleExecuterConsole.subscribe(value => {
		consoleoutput = value;
	});
  // BLOCKY PLUGIN VARIABLES DECLARATION END

  // BLOCLY INIT FUNCTIONS START
  async function setTrackableList(days=30){
    let PreLoadedList = [];
  let hasChanges = false;
      // Search all notes
      const everyNote = await plugin.searchNotes('', new Date(), days);
      // Filter out only notes with elements that have a person
      const allNotes = everyNote.filter(note => {
        return note.elements.find(e => e.type == 'person' || e.type == 'tracker')
      })
      // Create a standalone object
      const allTrackables = { ...{} };
      // Loop over the people notes
      allNotes.forEach((note) => {
        // Loop over the elements of the notes
        // filter out on people
        note.elements.filter(e => e.type == 'person' || e.type == 'tracker').forEach(async (ele) => {
          
          if (!allTrackables.hasOwnProperty(ele.id)) {
            let emoji = "?"
            let value;
            if (ele.type == 'tracker'){
              value = await plugin.getTrackable("#"+ele.id);
              emoji = value.trackable.tracker.emoji
              setTimeout(()=>{  allTrackables[ele.id] = {
              username: ele.id,
              emoji:emoji,
              displayName: value.trackable.tracker.label,
              tag: value.trackable.tracker.tag ,
              type: value.trackable.tracker.type,
              color: value.trackable.tracker.color,
              label: value.trackable.tracker.label,
              include: value.trackable.tracker.include,
              uom: value.trackable.tracker.uom,
              min: value.trackable.tracker.min,
              max: value.trackable.tracker.max,
              defaultvalue: value.trackable.tracker.default,
              note: value.trackable.tracker.note,
              picks: value.trackable.tracker.picks,
              latest: note.end
            }
            hasChanges = true;},2)
            }
            else if (ele.type == 'person'){
              value = await plugin.getTrackable("@"+ele.id);
              emoji = "😎"
              setTimeout(()=>{  allTrackables[ele.id] = {
              username: ele.id,
              emoji:emoji,
              displayName: value.trackable.person.displayName,
              tag: ele.id,
              type: "person",
              color: "",
              label: value.trackable.person.displayName,
              include: "",
              uom: "",
              min: "",
              max: "",
              defaultvalue: "",
              note: "",
              picks: "",
              latest: note.end
            }
            hasChanges = true;},1)
            }

            
          } else {
            // Get this note date
            const noteDate = new Date(note.end);
            // Get last note date
            const lastUserDate = allTrackables[ele.id].latest || '1960-01-01';
            const latest = new Date(lastUserDate);

            // Is latest less than this note date?
            if (latest < noteDate) {
              hasChanges = true;
              // yes, update the latest to this notes date
              allTrackables[ele.id].latest = note.end;
            }
          }
        })
      })

      setTimeout(()=>{
      
      
      Object.entries(allTrackables).forEach(([key, value]) => {
        if (value.type == "person"){
      PreLoadedList.push([value.emoji+" "+value.label,"@"+value.tag]);}
        else {
          PreLoadedList.push([value.emoji+" "+value.label,"#"+value.tag]);
        }
    });
},200)
//setTimeout(()=>{trackablelist.set(PreLoadedList);},4000)
return PreLoadedList;
}

  // BLOCLY INIT FUNCTIONS END


  // Load init params
  function loadInitParams() {
    globalplugin.set(plugin);
    parent = getParentUrl();
    plugin.onUIOpened(async () => {
      mode = 'modal';
    });

    plugin.onLaunch(async () => {
      console.log("==================🧱🧱=================");
      console.log("🧱 Blockly Plugin onLaunch");
      console.log("==================🧱🧱=================");
      onLaunchStart();
      
    });

    plugin.onNote((note)=>{
      console.log("==================🧱🧱=================");
      console.log("🧱 Blockly Plugin onNote");
      console.log("==================🧱🧱=================");
      onNoteStart(note);
    })

    plugin.onWidget(() => {
      if (plugin.prefs.theme == "light") {
        theme = "white"}
      else if (plugin.prefs.theme == "dark") {
        theme = "g100"}  
      else {theme = "g10"} 
      mode = "widget";
    });

    plugin.onRegistered(async () => {
      inNomie = true;
      loading = false;
      await plugin.storage.init()
      blockly = await plugin.storage.getItem('blockly') || {workspaces:[],lastcentralschedule: new Date().getTime(),centralscheduleslist:""};
     // this.trackable = await plugin.getTrackable('#meditation');
      if (plugin.prefs.theme == "light") {
        theme = "g10"}
      else if (plugin.prefs.theme == "dark") {
        theme = "g90"}  
      else {theme = "g10"} 
    })

    setTimeout(() => {
      if (loading) {
        inNomie = false;
      }
    }, 700);
    
  }

  // change theme
  function toggleTheme(){
    console.log(theme);
    if (theme == "white"){
      theme = "g10"}
    else if (theme == "g10"){
      theme = "g80"}
    else if (theme == "g80"){
      theme = "g90"}
    else if (theme == "g90"){
      theme = "g100"}
    else {
      theme = "white"}
 }

 // Get parent
 function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    var parentfound = null;
    
    if (isInIframe) {
        parentUrl = document.referrer;
    }

    if (parentUrl.includes("nomie")) {
      parentfound = "Nomie"
    }
    else {parentfound = "Smarter4Ever"}

    return parentfound;
}

// ALL ON LAUNCH CODE START
async function onLaunchStart() {
  var diff = Math.abs(new Date().getTime() - new Date(blockly.lastcentralschedule).getTime()) / 3600000;
    if (diff > 24) {
      console.log("Last scheduled run is already "+diff+" hours ago, scheduler will be started")
      startSchedule();
    }
    else {console.log("Last scheduled run is just "+diff+" hours ago, scheduler will not be started")}
  
}

// ALL ON NOTE CODE START
async function onNoteStart(note) {
  blockly = await plugin.storage.getItem('blockly') || {workspaces:[],lastcentralschedule: new Date().getTime(),centralscheduleslist:""};
  console.log("OnNote start")
  if (note.note.includes("Run Blockly Workspace:")){
    console.log("Action to execute a Blockly Workspace found")
    blockly.workspaces.forEach((ws, index) => {
      if (note.note.includes(ws.name)){
        console.log("Execute Blockly Workspace for "+ws.displayName)
        let startsingle = function() {
          if (executionrunning) {
          // Execution is currently bussy.
          // Try again later.
          setTimeout(startsingle, 10);
        } else {
          // execute and queue next execution
          let result = runCode(plugin,ws.jscode,new Date(),new Date(),false);
    }
  }
  startsingle() 
       // runCode(plugin,ws.jscode,new Date(),new Date(),false);
      }
    });
  }
}

//view main page
function showMain(){
  view = "main"
  window.scrollTo(0,0);
 }
 
 //view info page
 function showInformation(){
  view = "info"
  window.scrollTo(0,0);
 }

 //view settings page
 function showSettings(){
  view = "settings"
  window.scrollTo(0,0);
 }

 

 function saveSettings(){
  plugin.storage.setItem('blockly', blockly);
  notifications.default('Settings Saved', 3000)
  
 }

 // RUNNING CODE MANAGEMENT START
 function executeCode(){
    runCode(plugin,jscode,new Date(),new Date(),false);
  }

 function startSchedule(){
  notifications.default('Scheduler Started', 5000);
  runBlocklyScheduler(plugin,blockly.workspaces);
  blockly.lastcentralschedule = new (Date);
  if (blockly.centralscheduleslist != undefined) {
  blockly.centralscheduleslist = "Schedule Finished on "+ String(new Date())+"\n"+blockly.centralscheduleslist;}
  else {blockly.centralscheduleslist = "Schedule Finished on "+ String(new Date())+"\n"}
  plugin.storage.setItem('blockly', blockly);
}

function executeSingleItteration(details){
  if (jscode.includes('s4eblocklyframe = "activated"') && !jscode.includes('var schedule = "none"')) {
  runCode(plugin,jscode,details.detail[0],details.detail[1],true);
  notifications.default('Workspace Itteration being executed', 5000)}
  else {notifications.warning('Workspace does not contain Schedule option', 5000)}
}
  
 // RUNNING CODE MANAGEMENT END

 // DATASTRUCTURE MANAGEMENT START
 const editMode = (event) => {
  const workspaceId=event.detail;
		
		//find workspace by id
		let workspace = blockly.workspaces.find(workspace => workspace.id === workspaceId);
		    id=  workspace.id;
				name =workspace.name ;
				description=workspace.description;
        color=workspace.color;
        displayName=workspace.displayName;
        emoji=workspace.emoji;
        active= workspace.active;
        block = workspace.block;
        workspaceBlocks= workspace.workspaceBlocks;
        workspacePosition= workspace.workspacePosition;
        jscode= workspace.jscode;
        latestrun= workspace.latestrun;
        schedule=workspace.schedule;
        isEditMode = true;
        console.log('workspace to edit', displayName);
        view="mainedit";
}

const gotoWorkspace = async (event) => {
  const workspaceId=event.detail;
  //loadtrackers
  let payload = await setTrackableList(30);
  if (payload.length ==0) {
    payload.push(["⦰ Empty ","#dummy"]);
  }
  trackablelist.set(payload);
		
		//find workspace by id
		let workspace = blockly.workspaces.find(workspace => workspace.id === workspaceId);
		    id=  workspace.id;
				name =workspace.name ;
				description=workspace.description;
        color=workspace.color;
        displayName=workspace.displayName;
        emoji=workspace.emoji;
        active= workspace.active;
        block = workspace.block;
        workspaceBlocks= workspace.workspaceBlocks;
        workspacePosition= workspace.workspacePosition;
        jscode= workspace.jscode;
        latestrun= workspace.latestrun;
        schedule=workspace.schedule;
        isEditMode = true;
        console.log('workspace to load', displayName);
       setTimeout(()=>{view="workspace"},200) ;
}

const addworkspace = () => {
		
		if (isEditMode) {
			editworkspace(id, name, displayName, emoji, description ,color,latestrun);
			
		} else {
			const workspace = {
				id: nid(),
				name : name,
				description: description,
        color: color,
        displayName:displayName,
        emoji: emoji,
        active: active,
        block : block,
        workspaceBlocks: workspaceBlocks,
        workspacePosition: workspacePosition,
        jscode: jscode,
        latestrun: latestrun,
        schedule:schedule,
			};
			blockly.workspaces = blockly.workspaces.concat(workspace);
			resetAndSave(blockly);
		}
  view="main";  
}
const editworkspace = (id, newName, newdisplayName, newEmoji,newDescription, newColor, newLatestrun) => {
		console.log('workspace to edit', name);
		//find workspace by name
		let index = blockly.workspaces.findIndex(workspace => workspace.id === id);
		
    //edit workspace
		blockly.workspaces[index].name = newName;
		blockly.workspaces[index].description = newDescription;
    blockly.workspaces[index].displayName = newdisplayName;
    blockly.workspaces[index].emoji = newEmoji;
    blockly.workspaces[index].color = newColor;
    blockly.workspaces[index].latestrun= newLatestrun;
    
		//blockly.workspaces = [...blockly.workspaces];
    console.log('workspaces after edit', blockly.workspaces);
		resetAndSave(blockly);
};
 const newworkspace = async () => {
  let newws = null;
  newws = await LoadFile();
  var awaitresult = setInterval(function() {
    console.log("check");
    if (newws) {
      id=  nid();
				name = newws[0].name ;
				description=newws[0].description;
        color=newws[0].color ;
        displayName=newws[0].displayName ;
        emoji=newws[0].emoji ;
        active= newws[0].active ;
        block = newws[0].block ;
        workspaceBlocks= newws[0].workspaceBlocks ;
        workspacePosition= newws[0].workspacePosition ;
        jscode= newws[0].jscode ;
        latestrun= newws[0].latestrun ;
        schedule=newws[0].schedule ;
        isAddMode = true;
       view = "mainedit";
       clearInterval(awaitresult);
    }
  },500)
       
}

async function LoadFile() {
    console.log("Placeholder Load File");
	document.querySelector("#file-input").value = null;
    document.querySelector("#file-input").click();
    var awaitfile = setInterval(function() {
  		if (document.querySelector("#file-input").files[0]) {
			importFile(document.querySelector("#file-input").files[0]);
    		clearInterval(awaitfile);
  		}
	}, 1000);

}

function importFile(file) {
	//let file = document.querySelector("#file-input").files[0];
		let reader = new FileReader();
		reader.addEventListener('load', function(e) {
	    		let text = e.target.result;
				var newws = JSON.parse(text);
				//dispatch("uploadws",obj);
        id=  nid();
				name = newws[0].name ;
				description=newws[0].description;
        color=newws[0].color ;
        displayName=newws[0].displayName ;
        emoji=newws[0].emoji ;
        active= newws[0].active ;
        block = newws[0].block ;
        workspaceBlocks= newws[0].workspaceBlocks ;
        workspacePosition= newws[0].workspacePosition ;
        jscode= newws[0].jscode ;
        latestrun= newws[0].latestrun ;
        schedule=newws[0].schedule ;
        
        const workspace = {
				id: id,
				name : name,
				description: description,
        color: color,
        displayName:displayName,
        emoji: emoji,
        active: active,
        block : block,
        workspaceBlocks: workspaceBlocks,
        workspacePosition: workspacePosition,
        jscode: jscode,
        latestrun: latestrun,
        schedule:schedule,
			};
			//blockly.workspaces.push(workspace);
      //plugin.storage.setItem('blockly', blockly);
      //amountofcards = blockly.workspaces.length;

        isAddMode = true;
       view = "mainedit";

		});
		reader.readAsText(file);
}

const addByTemplate = (event) => {
  const workspace = {
				id: nid(),
				name : event.detail.detail.template.name,
				description: event.detail.detail.template.description,
        color: event.detail.detail.template.color,
        displayName:event.detail.detail.template.displayName,
        emoji: event.detail.detail.template.emoji,
        active: event.detail.detail.template.active,
        block : event.detail.detail.template.block,
        workspaceBlocks: event.detail.detail.template.workspaceBlocks,
        workspacePosition: event.detail.detail.template.workspacePosition,
        jscode: event.detail.detail.template.jscode,
        latestrun: new Date().toDateString(),
        schedule:event.detail.detail.template.schedule,
			};
			blockly.workspaces = blockly.workspaces.concat(workspace);
			resetAndSave(blockly);

}

const resetAndSave = blockly=> {
		reset();
    plugin.storage.setItem('blockly', blockly);
    amountofcards = blockly.workspaces.length;
}

const saveActualWorkspace = () => {
  let index = blockly.workspaces.findIndex(workspace => workspace.id === id);
	const workspace = {
				id: id,
				name : name,
				description: description,
        color: color,
        displayName:displayName,
        emoji: emoji,
        active: active,
        block : block,
        workspaceBlocks: workspaceBlocks,
        workspacePosition: workspacePosition,
        jscode: jscode,
        latestrun: latestrun,
        schedule:schedule,
			};
			blockly.workspaces[index] = workspace;
      plugin.storage.setItem('blockly', blockly);
      amountofcards = blockly.workspaces.length;
      console.log('Workspace saved!');
      notifications.success('Workspace saved!', 3000)
}


const reset = () => {
        id=  "";
				name ="" ;
				description="";
        color="";
        displayName="";
        emoji="";
        active= "";
        block = "";
        workspaceBlocks= "";
        workspacePosition= "";
        jscode= "";
        latestrun= "";
        schedule="";
		    isEditMode = false;
  }

  const deleteworkspace = async event => {
    let res = await plugin.confirm('Delete Workspace?', 'Are you sure you want to delete this workspace?');
if(res.value) {

    const id=event.detail;
		console.log('workspace to delete', id);
		//find workspace by id
		let index = blockly.workspaces.findIndex(workspace => workspace.id === id);
		//remove workspace
		blockly.workspaces.splice(index, 1);
		blockly.workspaces = [...blockly.workspaces];
		console.log('workspaces after delete', JSON.stringify(blockly.workspaces));
		resetAndSave(blockly);
  } else {
	//nothing to do;
}
};

const showworkspaceinfo = event => {
  const workspaceId= event.detail;
		//find workspace by id
		let workspace = blockly.workspaces.find(workspace => workspace.id === workspaceId);
  plugin.alert(workspace.displayName, workspace.description);
}
// DATASTRUCTURE MANAGEMENT END

// FILE MANAGEMENT START

async function importAdd(payload) {
  let res = await plugin.confirm('Add Workspaces', 'Are you sure you want to add the backup to your current workspaces?');
if(res.value) {
  let newws = payload.detail;

  newws.forEach((element,index) => {
    newws[index].id = nid();
    blockly.workspaces.push(newws[index]);
  });
  plugin.storage.setItem('blockly', blockly);
  amountofcards = blockly.workspaces.length;
  notifications.success('Workspaces added!', 3000)
}
}

async function importReplace(payload) {
  let res = await plugin.confirm('Replace Workspaces', 'Are you sure you want to replace your current workspaces with this backup?');
if(res.value) {
  let newws = payload.detail;

  newws.forEach((element,index) => {
    newws[index].id = nid();
  });
  blockly.workspaces = newws;
  plugin.storage.setItem('blockly', blockly);
  amountofcards = blockly.workspaces.length;
  notifications.success('Workspaces replaced!', 3000)
}

}

// FILE MANAGEMENT END

 onMount(async () => {
  loadInitParams();
 })

</script>


{#if mode == "modal"  || mode =="widget"}
<Theme bind:theme />
{#if inNomie}
{#if mode == "modal"}
<Header company={parent} platformName={pluginname} on:click={showMain}>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} on:click={showSettings}/>
    <HeaderGlobalAction aria-label="Theme" icon={Sun} on:click={toggleTheme}/>
    <HeaderGlobalAction aria-label="Theme" icon={Information} on:click={showInformation}/>
  </HeaderUtilities>
</Header>

{#if view == "main"}
<Main pluginname={pluginname} pluginemoji={pluginemoji} workspaces={blockly.workspaces} on:addnew={()=>{LoadFile()}} on:addbytemplate={addByTemplate} on:deleteworkspace={deleteworkspace} on:showworkspaceinfo={showworkspaceinfo} on:editworkspace={editMode} on:gotoworkspace={gotoWorkspace} on:startschedule={()=>{startSchedule()}}/>
{:else if view == "info"}
<Info parent={parent} pluginname={pluginname} pluginemoji={pluginemoji} on:exitinfo={showMain}/>
{:else if view == "settings"}
<Settings pluginname={pluginname} pluginemoji={pluginemoji} workspaces={blockly.workspaces} bind:centralscheduleslist={blockly.centralscheduleslist} bind:lastcentralschedule={blockly.lastcentralschedule} bind:theme={theme} on:exitsettings={showMain} on:savesettings={saveSettings} on:startschedule={()=>{startSchedule()}} on:import_add={(e)=>{importAdd(e)}} on:import_replace={(e)=>{importReplace(e)}}/>
{:else if view == "mainedit"}
<Edit pluginname={pluginname} pluginemoji={pluginemoji} bind:theme={theme} bind:latestrun={latestrun} on:addnew={addworkspace} on:saveworkspace={addworkspace} on:executesingleitteration={(detail)=>{executeSingleItteration(detail)}} on:exitedit={()=>{view="main"; isEditMode=false; isAddMode=false;}} bind:name={name} bind:displayName={displayName} bind:description={description} bind:color={color} bind:emoji={emoji}></Edit>
{:else if view == "workspace"}
<Workspace parent={parent} plugin={plugin} pluginname={pluginname} pluginemoji={pluginemoji} bind:consoleoutput={consoleoutput} background={plugin.prefs.theme} buttonpushed={true} bind:activeworkspace={workspaceBlocks} bind:activetransformation={workspacePosition} bind:code={jscode} bind:wsemoji={emoji} bind:wsname={displayName} bind:wsid={id} bind:wsdisplayname={displayName} bind:wsdescription={description} bind:wscolor={color} bind:wsactive={active} bind:wsblock={block} bind:wsltestrun={latestrun} bind:wsschedule={schedule} on:saveactualworkspace={saveActualWorkspace} on:executecode={()=>{executeCode()}}></Workspace>

{/if}
{:else if mode == "widget"}
<Widget pluginname={pluginname} pluginemoji={pluginemoji} workspaces={blockly.workspaces} lastcentralschedule={blockly.lastcentralschedule}></Widget>
{/if}
{/if}

{:else if !inNomie}
        <h1 style="text-align:center">{pluginemoji}</h1>
        <h2 style="text-align:center">{pluginname}</h2>
        <h5 style="text-align:center">This is a plugin for Nomie</h5>
        <hr>
{/if}
{#if loading}
<div class="startup">
<p>Loading....</p>
</div>
{/if}
<Toast />
<input hidden={true} type="file" id="file-input" accept=".wsp"/>