import Blockly from 'blockly/core.js';
import { getPeriodTrackerValue } from '../tools/blockly_functions.svelte';
/**
 * @license 
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This block will gather the info needed to retrieve specific stats from a tracker for a specific day. 
 * Once the info is gathered the data will be fetched and made available
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */

 Blockly.defineBlocksWithJsonArray([{
  "type": "s4e_periodvalue",
  "message0": "Fetch Period Value %1 Trackable %2 Period %3 Statistic %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Trackable",
      "check": "Tracker" | "String"
    },
    {
      "type": "input_value",
      "name": "Period",
      "check": "Period"
    },
    {
      "type": "input_value",
      "name": "Statistics",
      "check": "Statistics"
    }
  ],
  "output": "Number",
  "colour": 'E77761',
  "tooltip": "",
  "helpUrl": ""
}]);

  /**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */

   Blockly.JavaScript['s4e_periodvalue'] = function(block) {
		var value_tracker = Blockly.JavaScript.valueToCode(block, 'Trackable', Blockly.JavaScript.ORDER_ATOMIC);
		var value_period = Blockly.JavaScript.valueToCode(block, 'Period', Blockly.JavaScript.ORDER_ATOMIC);
		var value_statistics = Blockly.JavaScript.valueToCode(block, 'Statistics', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'fetchPeriodValue('+value_tracker+','+value_period+','+value_statistics+')';
		return [code, Blockly.JavaScript.ORDER_NONE];
		};

  export function initInterpreterFetchPeriodValue(interpreter, globalObject) {
    // Ensure function name does not conflict with variable names.
    Blockly.JavaScript.addReservedWords('fetchPeriodValue');
  
    var wrapper = interpreter.createAsyncFunction(
        function(tracker,period,stats, callback) { 
          getPeriodTrackerValue(tracker,period,stats)
        .then(function(value) {
          callback(value);
        })
      }
    );
    interpreter.setProperty(globalObject, 'fetchPeriodValue', wrapper);
    }

    

    