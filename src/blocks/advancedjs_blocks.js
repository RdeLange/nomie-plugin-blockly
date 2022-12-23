import Blockly from 'blockly/core.js';

Blockly.Blocks['bi_try_catch'] = {
  init: function() {
    this.appendStatementInput('try')
        .setCheck(null)
        .appendField('try');
    this.appendStatementInput('catch')
        .setCheck(null)
        .appendField('catch')
        .appendField(new Blockly.FieldTextInput(''), 'parameter');    
    this.appendStatementInput('finally')
        .setCheck(null)
        .appendField('finally');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_catch'] = {
  init: function() {
    this.appendStatementInput('catch')
        .setCheck(null)
        .appendField('catch')
        .appendField(new Blockly.FieldTextInput(''), 'parameter');    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_export'] = {
  init: function() {
    this.appendStatementInput('export')
        .setCheck(null)
        .appendField('export');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('import');
//    this.appendValueInput('import')
//        .setCheck(null)
//        .appendField('import');
    //this.appendAddSubGroup('', 'items',null,
    //                       '');
    this.itemCount_ = 2;
    //this.updateShape_();    
    this.appendValueInput('from')
        .setCheck(null)
        .appendField('from');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_import_as'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'input');
    this.appendDummyInput()
        .appendField('as')
        .appendField(new Blockly.FieldTextInput(''), 'as');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('comment');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('88A464');
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['bi_try_catch'] = function(block) {
  var statement_try = Blockly.JavaScript.statementToCode(block, 'try');
  var statement_catch = Blockly.JavaScript.statementToCode(block, 'catch');
  var statement_finally = Blockly.JavaScript.statementToCode(block, 'finally');
  var text_parameter = block.getFieldValue('parameter');
  var code = 'try{\n'+statement_try+'\n} catch('+text_parameter+'){\n'+statement_catch+'\n} finally{\n'+statement_finally+"}\n";
  return code;
};

Blockly.JavaScript['bi_catch'] = function(block) {
  var statement_catch = Blockly.JavaScript.statementToCode(block, 'catch');
  var text_parameter = block.getFieldValue('parameter');
  var code = 'catch('+text_parameter+'){\n'+statement_catch+'}\n';
  return code;
};

Blockly.JavaScript['bi_export'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'export');
  return 'export '+statement_chain
}

Blockly.JavaScript['bi_import'] = function(block) {
//  var value_import = Blockly.JavaScript.valueToCode(block, 'import', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';    
  }
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'import '
  if(block.itemCount_ === 2){
    code += codeArr[0]
  } else{
    code += '{'+codeArr.join(',')+'}'
  }
  code += ' from '+value_from+'\n'
  return code
}

Blockly.JavaScript['bi_import_as'] = function(block) {
  var text_import = block.getFieldValue('input');
  var text_as = block.getFieldValue('as');
  var code = text_import+' as '+text_as
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['bi_comment'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = ''; // '...;\n';
  return code;
};