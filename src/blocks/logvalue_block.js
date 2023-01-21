import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';
import { logDailyTrackerValue } from '../tools/blockly_functions.svelte';
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
  "type": "s4e_logvalue",
  "message0": "Log Value for Tracker %1 Value %2 to Tracker %3 On the following Date %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Value"
    },
    {
      "type": "input_value",
      "name": "Tracker",
      "check": "Tracker"
    },
    {
      "type": "input_value",
      "name": "Date",
      "check": "Day"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": '0AB3F5',
  "tooltip": "",
  "helpUrl": ""
}]);

  /**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */

   Blockly.JavaScript['s4e_logvalue'] = function(block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
    var value_tracker = Blockly.JavaScript.valueToCode(block, 'Tracker', Blockly.JavaScript.ORDER_ATOMIC);
    var value_date = Blockly.JavaScript.valueToCode(block, 'Date', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'logValue('+value_value+','+value_tracker+','+value_date+')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  export function initInterpreterLogValue(interpreter, globalObject) {
    // Ensure function name does not conflict with variable names.
    Blockly.JavaScript.addReservedWords('logValue');
  
    var wrapper = interpreter.createAsyncFunction(
        function(value,tracker,day, callback) { 
          logDailyTrackerValue(value,tracker,day)
        .then(function(value) {
          callback(interpreter.createPrimitive(value));
        })
      }
    );
    interpreter.setProperty(globalObject, 'logValue', wrapper);
    }

    

    