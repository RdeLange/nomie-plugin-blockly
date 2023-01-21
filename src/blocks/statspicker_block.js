import Blockly from 'blockly/core.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blockly block to select statistics (min/max/avg/sum) to apply on the query
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */




Blockly.defineBlocksWithJsonArray([
  {
    "type": "s4e_statspicker",
    "message0": "Statistics %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "Stats",
        "options": [
          [
            "Average",
            "avg"
          ],
          [
            "Sum",
            "sum"
          ],
          [
            "Maximum",
            "Max"
          ],
          [
            "Minimum",
            "Min"
          ]
        ]
      }
    ],
    "output": "Statistics",
    "colour": '0AB3F5',
    "tooltip": "",
    "helpUrl": ""
  }]);

/**
 * STATS BLOCK code
 */
 Blockly.JavaScript['s4e_statspicker'] = function(block) {
  var dropdown_stats = block.getFieldValue('Stats');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+dropdown_stats+'"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

