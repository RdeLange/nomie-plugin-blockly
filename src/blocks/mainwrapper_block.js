import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This block is a wrapper for the s4e blockly scripts and is used to do some check an balance. 
 *
 */

 Blockly.defineBlocksWithJsonArray([{
  "type": "s4eblocklyframe",
  "message0": "Scheduler: %1 %2 Blockly Script %3 %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "No Schedule",
          "none"
        ],
        [
          "Daily",
          "daily"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "script"
    }
  ],
  "colour": 'f96e5b',
  "tooltip": "",
  "helpUrl": ""
}]);

  /**
 * Generator for main wrapper code block
 */

   Blockly.JavaScript['s4eblocklyframe'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var statements_script = Blockly.JavaScript.statementToCode(block, 'script');
    // TODO: Assemble JavaScript into code variable.
    var code = 's4eblocklyframe = "activated";\n';
    code = code + 'var schedule = "'+dropdown_name+'";\n';
    code = code + 'if (schedule == "daily") {\n' // start if schedule = daily
    code = code + 'var scheduler = scheduler_activated();\n';
    code = code + 'var schedulerstart = scheduler_start();\n';
    code = code + 'var schedulerend = scheduler_end();\n';
    code = code + '}\n'; // end if schedule = daily
    code = code + 'else {var scheduler = false;\nvar schedulerstart = new Date();\nvar schedulerend = new Date();}\n'
    code = code + 'var loop = new Date(schedulerstart);\nwhile(loop <= schedulerend){\n'
    code = code + statements_script;
    code = code + 'var newDate = loop.setDate(loop.getDate() + 1);\nloop = new Date(newDate);}\n'
     
    

    //code = code + statements_script;
    return code;
  };

