<script lang="ts">
	import { highlightedid } from '../store/stores';
	import { createEventDispatcher } from 'svelte';
	import Blockly from 'blockly/core.js';
	import En from 'blockly/msg/en.js';
	import De from 'blockly/msg/de.js';
	import 'blockly/blocks.js';
	import 'blockly/javascript.js';
	import 'blockly/javascript_compressed.js';
	import '@blockly/field-date';
	//import { ntoolbox }  from './nomie_toolbox_OLD.svelte';
	import BlocklyComponent, { Locale, Transform } from 'svelte-blockly';
	import { onMount } from 'svelte';
	//import { Interact } from "../../../../store/interact";
    import darkTheme from "@blockly/theme-dark";
	//import appconfig from "../../../../config/appConfig";
    //import { getDailyTrackerValue, getData } from './nomie_blockly_functions.svelte'; 
    //import { loadBlocks } from './nomie_blocks_OLD.svelte';
	import Interpreter from 'js-interpreter';
	import { ntoolbox } from '../tools/toolbox.svelte';
	import {
    Tile,
	TextArea,
  } from "carbon-components-svelte";
    import Filemanager from "../components/filemanager.svelte"
  	import Save from "carbon-icons-svelte/lib/Save.svelte";
	import Play from "carbon-icons-svelte/lib/PlayOutline.svelte";
	import Console from "carbon-icons-svelte/lib/Screen.svelte";
	import ConsoleOff from "carbon-icons-svelte/lib/ScreenOff.svelte";
	
    export let wsid;
    export let activetransformation: { scrollX: number; scrollY: number; scale: number; }; //workspacePosition
	export let activeworkspace: string; //workspaceBlocks
	export let code = "Meaning_of_Life=42;"; //jscode
	export let wsemoji; //emoji
	export let wsname; //name
	export let wsdisplayname;
	export let wsdescription;
	export let wscolor;
	export let wsactive;
	export let wsblock;
	export let wslatestrun;
	export let wsschedule;
	export let plugin;

	var workspaces= [];

	$: if(wsid || activetransformation || activeworkspace || code || wsemoji || wsname || wsdisplayname || wsdescription || wscolor || wsactive || wsblock || wslatestrun || wsschedule ){
		workspaces = [{"id":wsid,"workspacePosition":activetransformation,"workspaceBlocks":activeworkspace,"jscode":code,"emoji":wsemoji,"color":wscolor,"name":wsname,"displayName":wsdisplayname,"description":wsdescription,"active":wsactive,"block":wsblock,"latesrun":wslatestrun,"schedule":wsschedule}];
	}

    export let buttonpushed = false;
	export let consoleoutput: string;
	export let background = "dark";
	export let pluginname;
    export let pluginemoji;
	export let parent;
	const dispatch = createEventDispatcher();

	let hlid;



  	let showconsole = false;
    let theme = null;
    let lastbuttonpushed = buttonpushed;
    let coderunning = false;
	let wsheight = "80vh";

  
	////start new code

	const en: Locale = {
		rtl: false,
		msg: {
			CAT_LOGIC: 'Logic',
			CAT_LOOPS: 'Loops',
			CAT_MATH: 'Math',
			CAT_LISTS: 'Lists',
			CAT_VARIABLES: 'Variables',
			CAT_FUNCTIONS: 'Functions',
			CAT_TEXT: 'Text',
			...En,
		},
	};
	const de: Locale = {
		rtl: false,
		msg: {
			CAT_LOGIC: 'Logik',
			CAT_LOOPS: 'Schleifen',
			CAT_MATH: 'Mathe',
			CAT_LISTS: 'Listen',
			CAT_VARIABLES: 'Variablen',
			CAT_FUNCTIONS: 'Funktionen',
			CAT_TEXT: 'Text',
			...De,
		},
	};
	const locales: Record<string, Locale> = { en, de };
	const toolbox: Blockly.utils.toolbox.ToolboxDefinition = ntoolbox(parent);

	var config = {
		toolbox,
		toolboxPosition: 'end',
        horizontalLayout: true,
		move: {
			scrollbars: false,
			drag: true,
			wheel: false,
		},
		zoom: {
			controls: true,
			wheel: true,
			maxScale: 1.5,
			minScale: 0.4,
			scaleSpeed: 1.02,
			startScale: 0.8,
		},
		grid: {
			spacing: 20,
			length: 3,
			colour: '#ccc',
			snap: true,
		},
		trashcan: true,
		theme: theme,
	};
	let showparams = false;
	let locale = 'en';
	let transform: Transform;
	let workspace: Blockly.WorkspaceSvg;
	let saved: [string, Transform] | undefined = undefined;
	//let code = '';
    highlightedid.subscribe((value) => {hlid = value;
		if (workspace){
			workspace.highlightBlock(hlid);}})

	function saveWorkspace(){
		dispatch("saveactualworkspace")
	}

	function executeCode(){
		dispatch("executecode")
	}

	function toggleConsole(){
		if (showconsole) {
			showconsole=false;
			wsheight="80vh"
		}
		else {showconsole=true
			wsheight="61vh"}
	}

	function initWorkspace(){
		if(background == "dark" || background == "s4e") {
       config.theme = darkTheme;}
       else {config.theme = null
	}
		if(activeworkspace !=""){
	Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(activeworkspace), workspace); 
	transform = activetransformation;}}

	function handleSave() {
		const xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
		saved = [xml, transform];
	}
	function handleRestore() {
		Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(saved[0]), workspace);
		transform = saved[1];
	}
	function onChange() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		activeworkspace = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
		activetransformation = transform;
		const lang = (Blockly as any)['JavaScript'];
		lang.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
		if (!lang.RESERVED_WORDS_.includes("highlightBlock")){
			lang.addReservedWords('highlightBlock');
		}

		try {
			code = lang.workspaceToCode(workspace);
			//generateCodeAndLoadIntoInterpreter();
		} catch (_err) {
			// Happens e.g. when deleting a function that is used somewhere.
			// Blockly will quickly recover from this, so it's not a big deal.
			// Just make sure the app doesn't crash until then.
		}
	}

	async function uploadWS(event){
		let res = await plugin.confirm('Replace Workspace', 'Are you sure you want to replace your current workspace? The replacement will only be final after saving your workplace.');
if(res.value) {
    activetransformation= event.detail[0].workspacePosition;
	activeworkspace= event.detail[0].workspaceBlocks;
	code = event.detail[0].jscode;
	wsemoji= event.detail[0].emoji;
	wsname= event.detail[0].name;
	wsdisplayname= event.detail[0].displayName;
	wsdescription= event.detail[0].description;
	wscolor= event.detail[0].color;
	wsactive= event.detail[0].active;
	wsblock= event.detail[0].block;
	wslatestrun= event.detail[0].latestrun;
	wsschedule= event.detail[0].schedule;

	Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(activeworkspace), workspace); 
	transform = activetransformation;
	}}

    // JS-INTERPRETER CODE START
    // ===================================================================================

    // ===================================================================================
    // JS-INTERPRETER CODE END

	onMount(() => {
    	initWorkspace();
  });
</script>

<main>
	{#if showparams}
		<div>
			<h1>Config</h1>
			<div>
				<select bind:value={locale}>
					{#each Object.keys(locales) as locale}
						<option value={locale}>{locale}</option>
					{/each}
				</select>
				<button on:click={handleSave}>Save Editor</button>
				<button on:click={handleRestore} disabled={saved === undefined}>Restore Editor</button>
			</div>
			<h2>Current JS Code & Transform</h2>
			<p>{JSON.stringify(transform)}</p>
			<pre>{code}</pre>
            <h2>INTERPRETER</h2>
			<h2>Saved Blockly XML & transform</h2>
			{#if saved !== undefined}
				<p>{JSON.stringify(saved[1])}</p>
				<pre>{saved[0]}</pre>
			{:else}
				<p>(none)</p>
			{/if}
		</div>
	{/if}
	<div>
		
		<div class="blockly-container" style="height:{wsheight}">
			<Tile>
				<div class="row">
					<div class="column" style="width:20%;">
						<div style="justify-content: flex-start;  display: flex;">
				<span on:click={()=>{saveWorkspace()}}><Save size={32} style="cursor: pointer;"/></span>
				{#if showconsole}
				<span on:click={()=>{toggleConsole()}}><ConsoleOff size={32} style="cursor: pointer;"/></span>
				{:else}
				<span on:click={()=>{toggleConsole()}}><Console size={32} style="cursor: pointer;"/></span>
				{/if}
			    </div>
			    </div>
				<div class="column" style="grid-auto-flow: column;width:50%; display:grid; align-items:center; justify-items:center;">
					<div>
				<span><h6>{wsemoji} {wsname}</h6></span>
				</div>
				</div>
				<div class="column" style="width:30%;">
					<div style="justify-content: flex-end;  display: flex;">
				<Filemanager bind:Workspaces={workspaces} on:uploadws={(e)=>{uploadWS(e)}}></Filemanager>
				<span on:click={()=>{executeCode()}}><Play size={32} style="cursor: pointer;"/></span>
				</div>
				</div>
			    </div>
				{#if showconsole}
				<div class="row">
				<TextArea bind:value={consoleoutput} readonly={true} rows={6} labelText="App description" hideLabel placeholder="Console output"/>
				</div>
				{/if}
			</Tile>
			<BlocklyComponent
				{config}
				locale={locales[locale]}
				bind:workspace
				bind:transform
				on:change={onChange}
			/>
			
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
	}
	main > div {
		width: 100%;
		padding: 0;
	}
	.blockly-container {
		height:80vh;
		/*height: 63vh;*/
		/*max-height: 70vh;*/
		/* height: 420px;*/
		border: 1px solid black;
		margin-top:50px;
	}

	pre {
		overflow-x: auto;
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
