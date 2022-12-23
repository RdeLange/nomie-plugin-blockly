import Blockly from 'blockly/core.js';

Blockly.Blocks['bi_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['function', 'function '], ['generator', 'function* '], ['method', '']]), 'function_type')
        .appendField(new Blockly.FieldTextInput('name'), 'name')
        .appendField('(')
        .appendField(new Blockly.FieldTextInput('arg1, arg2, etc'), 'args')
        .appendField(')');
    this.appendStatementInput('chain')
        .setCheck(null);
    //this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_function_return'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['function', 'function'], ['generator', 'function*']]), 'function_type')
        .appendField(new Blockly.FieldTextInput(''), 'name')
        .appendField('(')
        .appendField(new Blockly.FieldTextInput('arg1, arg2, etc'), 'args')
        .appendField(')');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_call'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('call1'), 'NAME')
        .appendField('(');
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(290);
   // this.appendAddSubNamed('', 'items',
   //                        null,
   //                        '');
    this.itemCount_ = 1;
  //  this.updateShape_();
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null);  // (['Method', 'Field']);
    this.setInputsInline(true);
    //this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  }
};

Blockly.Blocks['bi_call_editable'] = {
  /**
   * Block for ...
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('fcall1'), 'NAME')
        .appendField('(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
   // this.appendAddSubGroup('', 'items',
   //                          null,
   //                          '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
   // this.updateShape_();
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); // 'Method');
    this.setNextStatement(true, null); // 'Method');
    //this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_call_editable_return'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('fcall1'), 'NAME')
        .appendField('(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
   // this.appendAddSubGroup('', 'items',
   //                          null,
   //                          '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
    // this.updateShape_();
    this.setInputsInline(true);
    //this.setPreviousStatement(true, null); // 'Method');
    //this.setNextStatement(true, null); // 'Method');
    this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_direct_call_editable'] = {
  /**
   * Block for building anonymous call
   * @this Blockly.Block
   */
  init: function() {
    this.appendValueInput('function')
        .appendField('(');
    this.appendDummyInput()
        .appendField(')(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
  //  this.appendAddSubGroup('', 'items',
  //                           null,
  //                           '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
    // this.updateShape_();
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); // 'Method');
    this.setNextStatement(true, null); // 'Method');
    //this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};


Blockly.Blocks['bi_direct_call_editable_return'] = {
  /**
   * Block for building anonymous call with return
   * @this Blockly.Block
   */
  init: function() {
    this.appendValueInput('function')
        .appendField('(');
    this.appendDummyInput()
        .appendField(')(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
  //  this.appendAddSubGroup('', 'items',
  //                           null,
  //                           '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
   // this.updateShape_();
    this.setInputsInline(true);
    //this.setPreviousStatement(true, null); // 'Method');
    //this.setNextStatement(true, null); // 'Method');
    this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_return'] = {
  init: function() {
    this.appendValueInput('ret')
        .setCheck(null)
        .appendField('return')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_spread'] = {
  init: function() {
    this.appendValueInput('arg_array')
        .setCheck(null)
        .appendField('...');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['bi_function'] = function(block) {
  var text_name = block.getFieldValue('name');
  var function_type = block.getFieldValue('function_type');
  var text_args = block.getFieldValue('args');
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var chain = statements_chain;
  var code = function_type+text_name+'(';    
  code += text_args + '){\n' + chain +'}\n';
  return code;
};


Blockly.JavaScript['bi_function_return'] = function(block) {
  //var text_name = block.getFieldValue('name');
  var function_type = block.getFieldValue('function_type');
  var text_name = block.getFieldValue('name');
  var text_args = block.getFieldValue('args');
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var chain = statements_chain;
  var code = function_type+text_name+'(';
  code += text_args + '){\n' + chain +'}\n';

  //return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_call'] = function(block) {
  // Create a list with any number of elements of any type.
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain !== ""){
    chain = "."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_call_editable'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain !== ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_call_editable_return'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain !== ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_direct_call_editable'] = function(block) {
  var value_function = Blockly.JavaScript.valueToCode(block, 'function', Blockly.JavaScript.ORDER_ATOMIC);
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain !== ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = '(' + value_function + ')(' + codeArr.join(', ') + ')' + chain+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_direct_call_editable_return'] = function(block) {
  var value_function = Blockly.JavaScript.valueToCode(block, 'function', Blockly.JavaScript.ORDER_ATOMIC);
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain !== ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = '(' + value_function + ')(' + codeArr.join(', ') + ')' + chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_return'] = function(block) {
  var value_ret = Blockly.JavaScript.valueToCode(block, 'ret', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'return '+value_ret+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_spread'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'arg_array', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '...'+value_name;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return [code, Blockly.JavaScript.ORDER_NONE];
  //return code;
};

