import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';
import { trackablelist } from '../store/stores';
import { globalplugin } from '../store/stores';
//import { TrackerStore } from "../../../../../store/tracker-store";

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly block representing the trackers avaialble
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */


//Let's first load all available trackers
let plugin;
const unsubscribe2 = globalplugin.subscribe((value) => plugin = value)
let trackerlist = [];
const unsubscribe = trackablelist.subscribe((value) => trackerlist = value)
trackerlist = loadTrackers;




Blockly.defineBlocksWithJsonArray([
  {
    "type": "s4e_trackers",
    "message0": "T: %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "Trackers",
        "options": trackerlist,
      }
    ],
    "inputsInline": false,
    "output": "Tracker",
    "colour": '0AB3F5',
    "tooltip": "",
    "helpUrl": ""
  
}]);

/**
 * TRACKER BLOCK code
 */
 Blockly.JavaScript['s4e_trackers'] = function(block) {
  var dropdown_trackers = block.getFieldValue('Trackers');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+dropdown_trackers+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//// ADITIONAL FUNCTION TO LOAD THE TRACKERS ////
function loadTrackers(){
  //console.log(plugin)
    return trackerlist

  }

  

  

  