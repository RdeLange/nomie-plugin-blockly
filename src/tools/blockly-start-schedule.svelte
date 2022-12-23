<script context="module">
//import { AddonsStore } from "../../../store/addons-store";
import { runCode }  from "./blockly_executer.svelte";

import { writable } from 'svelte/store';
import { ExecuterRunning } from './blockly_executer.svelte';
//import Nblockly from "./blockly/blockly.svelte";
//import { Interact } from "../../../store/interact";

let executionrunning = false;

ExecuterRunning.subscribe(value => {
		executionrunning = value;
	});

export async function runBlocklyScheduler(plugin,workspaces){
console.log("Scheduler Started")

let wspaces = workspaces;

for (var i = 0; i < wspaces.length; i++) {
  let jscode = wspaces[i].jscode;
  let blastrundate = wspaces[i].latestrun;
  let lastrundate = new Date();

  if (blastrundate == undefined || blastrundate == "") {
    var d = new Date();
    d.setDate(d.getDate()-30);
    //lastrundate =new Date("2022-01-01")
    lastrundate = d;}
  else {lastrundate = new Date(blastrundate)}
  let enddate = new Date();
  enddate.setDate(enddate.getDate() - 1);
  let startsingle = function() {
    if (executionrunning) {
      // Execution is currently bussy.
      // Try again later.
      setTimeout(startsingle, 10);
    } else {
      // execute and queue next execution
      let result = runCode(plugin,jscode,lastrundate,enddate,true);
    }
  }
  startsingle() 
  wspaces[i].latestrun = new Date();
  //blocklyaddon.configuration.workspaces[i]  = wspaces[i];
  //AddonsStore.saveAddon(blocklyaddon);}
  //blocklyaddon.configuration.lastcentralschedule = new Date();
  //if (blocklyaddon.configuration.centralscheduleslist !== undefined) {blocklyaddon.configuration.centralscheduleslist = "Schedule Finished on "+ String(new Date())+"\n"+blocklyaddon.configuration.centralscheduleslist}
  //else {blocklyaddon.configuration.centralscheduleslist = "Schedule Finished on "+ String(new Date())+"\n"}
  //AddonsStore.saveAddon(blocklyaddon);
  //Interact.toast("Scheduler Finished");
  }}

</script>