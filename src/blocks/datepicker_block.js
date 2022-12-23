import Blockly from 'blockly/core.js';
import Interpreter from 'js-interpreter';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Datepicker Block for blockly addon. 
 * needs to be installed seperately via npm: npm install @blockly/field-date --save 
 * 
 */

 Blockly.defineBlocksWithJsonArray([{
  "type": "s4e_datepicker",
    "message0": "date: %1",
    "args0": [
        {
            "type": "field_date",
            "name": "Date",
            "date": "2021-08-02"
        }
    ],
    "inputsInline": false,
    "output": "Day",
    "colour": 'E77761',
    "tooltip": "",
    "helpUrl": ""
  }]);

  /**
 * Generator for wait block creates call to new method
 * <code>waitForSeconds()</code>.
 */

   Blockly.JavaScript['s4e_datepicker'] = function(block) {
		var date = block.getFieldValue('Date');
		// TODO: Assemble JavaScript into code variable.
		var code = "'"+date+"'";
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};
