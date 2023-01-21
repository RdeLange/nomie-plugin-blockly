import Blockly from 'blockly/core.js';


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly block to select day (today/yesterday) instead of specific date
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */




Blockly.defineBlocksWithJsonArray([
  {
    "type": "s4e_periodpicker",
    "message0": "Period %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "Period",
        "options": [
          [
            "Today",
            "TODAY"
          ],
          [
            "Last 7 Days",
            "LAST7DAYS"
          ],
          [
            "Last 30 Days",
            "LAST30DAYS"
          ],
          [
            "Last 60 Days",
            "LAST60DAYS"
          ],
          [
            "Last 90 Days",
            "LAST90DAYS"
          ]
        ]
      }
    ],
    "output": "Period",
    "colour": '0AB3F5',
    "tooltip": "",
    "helpUrl": ""
  }]);

/**
 * DAY BLOCK code
 */
Blockly.JavaScript['s4e_periodpicker'] = function(block) {
  var dropdown_period = block.getFieldValue('Period');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+dropdown_period+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

 
