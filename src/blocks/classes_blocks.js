import Blockly from 'blockly/core.js';

Blockly.Blocks['bi_new'] = {
  init: function() {
    this.appendValueInput('chain')
        .appendField('new')
        .setCheck(null);
    //this.setPreviousStatement(true, null);
    this.setOutput(true, null);
    this.setColour('A49F64');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_anonymous_class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput(''), 'NAME');
    this.appendDummyInput()
        .appendField('extends')
        .appendField(new Blockly.FieldTextInput(''), 'extends');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setHelpUrl('http://www.example.com/');
    this.setColour('A49F64');
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);
    this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput('Name'), 'NAME');
    this.appendDummyInput()
        .appendField('extends')
        .appendField(new Blockly.FieldTextInput(''), 'extends');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setHelpUrl('http://www.example.com/');
    this.setColour('A49F64');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_static'] = {
  init: function() {
    this.appendStatementInput('static')
        .setCheck(null)
        .appendField('static');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('A49F64');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_get'] = {
  init: function() {
    this.appendStatementInput('get')
        .setCheck(null)
        .appendField('get');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('A49F64');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_set'] = {
  init: function() {
    this.appendStatementInput('set')
        .setCheck(null)
        .appendField('set');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('A49F64');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['bi_new'] = function(block) {
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var chain = value_chain.trim();
  var code = "new "+chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_anonymous_class'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_extends = block.getFieldValue('extends');
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'class '+text_name
  if(text_extends !== '')
    code += ' extends '+text_extends
  code += '{\n'+statement_chain+'}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_class'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_extends = block.getFieldValue('extends');
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'class '+text_name
  if(text_extends !== '')
    code += ' extends '+text_extends
  code += '{\n'+statement_chain+'}\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_static'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'static');
  return 'static '+statement_chain
}

Blockly.JavaScript['bi_get'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'get');
  return 'get '+statement_chain
}

Blockly.JavaScript['bi_set'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'set');
  return 'set '+statement_chain
}