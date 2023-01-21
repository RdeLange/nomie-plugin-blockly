import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';
import { getValueLocal } from '../tools/localfunction.svelte';

/**
 * @license 
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Example "test" block that will try to get data from a Promise. Because waiting for a Promise is a blocking behavior, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */

 Blockly.defineBlocksWithJsonArray([{
    "type": "tracker",
    "message0": "trackervalue %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Input1",
            "Value1"
          ],
          [
            "Input2",
            "Value2"
          ],
          [
            "Input3",
            "Value3"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": "attribute",
    "colour": '0AB3F5',
    "tooltip": "",
    "helpUrl": ""
  }]);

  /**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */

   Blockly.JavaScript['tracker'] = function(block) {
    var selectedtracker = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'getPromise("'+selectedtracker+'")';
    //var code = 'getPromise(' + selectedtracker + ');\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  export function initInterpreterGetPromise(interpreter, globalObject) {
    // Ensure function name does not conflict with variable names.
    Blockly.JavaScript.addReservedWords('getPromise');
  
    var wrapper = interpreter.createAsyncFunction(
        function(tracker, callback) { 
        getValueLocal(tracker)
        .then(function(value) {
          callback(interpreter.createPrimitive(value));
        })
      }
    );
    interpreter.setProperty(globalObject, 'getPromise', wrapper);
    }

    //////////////////////
    async function getValue(tracker){
    let trackerprocessed = tracker+" processed";
    return trackerprocessed;
}

    