<script context ="module" lang="ts">
  import { writable } from 'svelte/store';
  import { highlightedid } from '../store/stores';
  //import { Interact } from "../../../../store/interact";
	import Interpreter from 'js-interpreter';
	import { initInterpreterWaitForSeconds } from '../blocks/wait_block';
	import { initInterpreterGetPromise } from '../blocks/test_block';
	import { initInterpreterFetchDayValue } from '../blocks/dayvalue_block';
  import { initInterpreterFetchPeriodValue } from '../blocks/periodvalue_block';
	import { initInterpreterLogValue } from '../blocks/logvalue_block';
  import { initInterpreterHttpRequest} from '../blocks/httprequest_block';
	import '../blocks/console_block';
  import '../blocks/weblogconsole_block';
	import '../blocks/datepicker_block';
	import '../blocks/trackerpicker_block';
	import '../blocks/daypicker_block';
  import '../blocks/periodpicker_block';
	import '../blocks/statspicker_block';
	import '../blocks/display_block';
  import '../blocks/mainwrapper_block';
  import '../blocks/httprequest_block';
  import '../blocks/objects_blocks';
  import '../blocks/functions_blocks';
  import '../blocks/classes_blocks';
  import '../blocks/advancedjs_blocks';
  

  var consoleoutput = "";

    //interpreter prep start
    
    var test = initInterpreterWaitForSeconds;
	  var test2 = initInterpreterGetPromise;
	  var import_initInterpreterFetchDayValue = initInterpreterFetchDayValue;
    var import_initInterpreterFetchPeriodValue = initInterpreterFetchPeriodValue;
	  var import_initInterpreterLogValue  = initInterpreterLogValue ;
    var import_initInterpreterHttpRequest = initInterpreterHttpRequest;
  
    var myInterpreter = null;
    var runner;
    var coderunning = false;
    let rundate = "undefined";
    let schedule_startdate = new Date();
	  let schedule_enddate = new Date();
	  let schedule_active = false;
    let plugin;
    
  
  export const ExecuterConsole = writable("");
  export const SingleExecuterConsole = writable("");
  export const ExecuterRunning = writable(false);
  
  
  
    // JS-INTERPRETER CODE START
    // ===================================================================================


    function initApi(interpreter, globalObject) {
     
  // Add an API function for the alert() block, generated for "text_print" blocks.
   var wrapper = function(text) {
    text = text ? text.toString() : '';
	consoleoutput = consoleoutput + '\n' + text;
  SingleExecuterConsole.update(value => value = value + '\n' + text);
  //SingleExecuterConsole.update(value => value = value + '\n' + text);
  };
  interpreter.setProperty(globalObject, 'alert',
      interpreter.createNativeFunction(wrapper));

   // Add an API function for the consolelog() function.
   var wrapper = function(text) {
    text = text ? text.toString() : '';
    console.log(text);
  };
  interpreter.setProperty(globalObject, 'consolelog',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

   // Add an API for the wait block.
   test(interpreter, globalObject);
  
  // Add an API for the getPromise block.
   test2(interpreter, globalObject);

   // Add an API function for the prompt() block.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the s4eprompt window.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    if (!schedule_active){
    //Interact.alert("Message", text);
    plugin.alert('Message', text);}
    else {}
  };
  interpreter.setProperty(globalObject, 'display',
      interpreter.createNativeFunction(wrapper));

   // Add an API for the logvalue block.
   import_initInterpreterLogValue(interpreter, globalObject);   
   
   // Add an API function for determine the absolute date to take into account.
  var wrapper = function(daypicked,date) {
	
  if (daypicked == "today") {
      let newdate = new Date(date); 
      newdate.setDate(newdate.getDate());
      return newdate.toISOString().slice(0, 10);} 
    else {
      let newdate = new Date(date);
      newdate.setDate(newdate.getDate() - 1);
      return newdate.toISOString().slice(0, 10);};
};

interpreter.setProperty(globalObject, 'getdate',
  interpreter.createNativeFunction(wrapper));

  // Add an API function to validate if runcode is triggered by automated scheduler
var wrapper = function() {
    return schedule_active;
  };
  interpreter.setProperty(globalObject, 'scheduler_activated',
      interpreter.createNativeFunction(wrapper));	  	  
    
// Add an API function to validate startdate if runcode is triggered by automated scheduler
var wrapper = function() {
    return schedule_startdate;
  };
  interpreter.setProperty(globalObject, 'scheduler_start',
      interpreter.createNativeFunction(wrapper));
	  
// Add an API function to validate enddate if runcode is triggered by automated scheduler
var wrapper = function() {
    return schedule_enddate;
  };
  interpreter.setProperty(globalObject, 'scheduler_end',
      interpreter.createNativeFunction(wrapper));	  
    	  

  // Add an API for the dayvalue block.
  import_initInterpreterFetchDayValue(interpreter, globalObject);

  // Add an API for the periodvalue block.
  import_initInterpreterFetchPeriodValue(interpreter, globalObject);

  // Add an API for the httprequest block.
  import_initInterpreterHttpRequest(interpreter, globalObject);
  
}

var highlightPause = false;

function highlightBlock(id) {
  //workspace.highlightBlock(id);
  //console.log("hlset "+id)
  highlightedid.set(id);
  highlightPause = true;
}

function resetStepUi(clearOutput) {
  //console.log("hlset null")
  highlightedid.set(null);
  highlightPause = false;
  coderunning = false;
  ExecuterRunning.update(value => value = false);

  if (clearOutput) {
	consoleoutput = 'Program output:\n=================';
  ExecuterConsole.update(value => value += 'Next Program output:\n=================\n');
  SingleExecuterConsole.update(value => value = 'Program output:\n=================');

  }
}


function resetInterpreter() {
  myInterpreter = null;
  if (runner) {
    clearTimeout(runner);
    runner = null;
  }
}

export function runCode(activeplugin,codetorun,start,end,scheduler) {
plugin = activeplugin;

  if (scheduler) {
const timezonecorrection = (new Date().getTimezoneOffset())*-1;
if (typeof start == "undefined") {schedule_startdate = new Date()}
else {//let temp = new Date(new Date(start).getTime() + timezonecorrection * 60000).toISOString().slice(0, 10)+"T13:00:00";
schedule_startdate = new Date(new Date(new Date(start).getTime() + timezonecorrection * 60000).toISOString().slice(0, 10)+"T13:00:00");}
if (typeof end == "undefined") {schedule_enddate = new Date()}
else {schedule_enddate = new Date(new Date(new Date(end).getTime() + timezonecorrection * 60000).toISOString().slice(0, 10)+"T13:00:00");}
if (typeof scheduler == "undefined") {schedule_active = false}
else {schedule_active = scheduler}

// validate if code is run by schedule & only execute when the following conditions apply
// 1) s4e mainwrapper exists
// 2) schedule in mainwrapper is NOT set to 'no schedule'

try{
if (schedule_active && codetorun.includes('s4eblocklyframe = "activated"') && !codetorun.includes('var schedule = "none"')) {
	console.log("scheduler requested r=> worspace includes mainwrapper and schedule so can be executed as part of the scheduler");}
else if (!schedule_active && codetorun.includes('s4eblocklyframe = "activated"')) {
	console.log("single run requested => worspace includes mainwrapper so can be executed as part of this single run");}
else {throw "exit";}}
catch (e) {console.log("Scheduler cannot be executed on this workspace");
return;} //exit

// validate if enddate is not priot or equal to startdate
try {
if(schedule_enddate >= schedule_startdate && !schedule_active) {
  console.log("request > enddate is later then or equal to then startdate, so can be executed");
}
else if(schedule_enddate >= schedule_startdate && schedule_active) {
  console.log("request > enddate is later then or equal to startdate, so can be executed");
}
else {throw "exit";}}
catch (e) {console.log("Scheduler cannot be executed on this workspace as the input dates are not valid");
return;} //exit
  }
// end scheduler validation

if (!myInterpreter) {
  // First statement of this code.
  // Clear the program output.
  resetStepUi(true);
  coderunning = true;
  ExecuterRunning.update(value => value = true);

  // And then show generated code in an alert.
  // In a timeout to allow the outputArea.value to reset first.
  setTimeout(function() {
// Begin execution
    highlightPause = false;
    myInterpreter = new Interpreter(codetorun, initApi);
    runner = function() {
      if (myInterpreter) {
        var hasMore = myInterpreter.run();
        if (hasMore) {
          // Execution is currently blocked by some async call.
          // Try again later.
          setTimeout(runner, 10);
        } else {
          // Program is complete.
          consoleoutput += '\n\n<< Program complete >>';
          ExecuterConsole.update(value => value += '\n\n<< Program complete >>\n\n');
          SingleExecuterConsole.update(value => value += '\n\n<< Program complete >>');
          resetInterpreter();
          resetStepUi(false);
        }
      }
    };
    runner();
  }, 1);
  return;
}
}   
  // ===================================================================================
  // JS-INTERPRETER CODE END

</script>