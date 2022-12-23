import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';
import { getDailyTrackerValue } from '../tools/blockly_functions.svelte';
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
  "type": "s4e_dayvalue",
  "message0": "Fetch Day Value %1 Tracker %2 Day %3 Statistic %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Tracker",
      "check": "Tracker"
    },
    {
      "type": "input_value",
      "name": "Day",
      "check": "Day"
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

   Blockly.JavaScript['s4e_dayvalue'] = function(block) {
		var value_tracker = Blockly.JavaScript.valueToCode(block, 'Tracker', Blockly.JavaScript.ORDER_ATOMIC);
		var value_day = Blockly.JavaScript.valueToCode(block, 'Day', Blockly.JavaScript.ORDER_ATOMIC);
		var value_statistics = Blockly.JavaScript.valueToCode(block, 'Statistics', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = 'fetchDayValue('+value_tracker+','+value_day+','+value_statistics+')';
		return [code, Blockly.JavaScript.ORDER_NONE];
		};

  export function initInterpreterFetchDayValue(interpreter, globalObject) {
    // Ensure function name does not conflict with variable names.
    Blockly.JavaScript.addReservedWords('fetchDayValue');
  
    var wrapper = interpreter.createAsyncFunction(
        function(tracker,day,stats, callback) { 
          getDailyTrackerValue(tracker,day,stats)
        .then(function(value) {
          callback(interpreter.createPrimitive(value));
        })
      }
    );
    interpreter.setProperty(globalObject, 'fetchDayValue', wrapper);
    }

    

    