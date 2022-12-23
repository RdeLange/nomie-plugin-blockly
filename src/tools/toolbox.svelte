<script context="module" lang="ts">
import type Blockly from 'blockly/core.js'; 

//////define toolbox

export const ntoolbox = (parent) => {return {
	kind: undefined,
		contents: [
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_LOGIC}',
				colour: '%{BKY_LOGIC_HUE}',
				contents: [
					{ kind: 'block', type: 'controls_if' },
					{
						kind: 'block',
						blockxml: `
							<block type="controls_if">
								<mutation else="1" />
							</block>`,
					},
					{
						kind: 'block',
						blockxml: `
							<block type="controls_if">
								<mutation elseif="1" else="1" />
							</block>`,
					},
					{ kind: 'block', type: 'logic_compare' },
					{ kind: 'block', type: 'logic_operation' },
					{ kind: 'block', type: 'logic_negate' },
					{ kind: 'block', type: 'logic_boolean' },
					{ kind: 'block', type: 'logic_null' },
					{ kind: 'block', type: 'logic_ternary' },
				] as Blockly.utils.toolbox.BlockInfo[],
			},
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_LOOPS}',
				colour: '%{BKY_LOOPS_HUE}',
				contents: [
					{ kind: 'block', type: 'controls_repeat_ext' },
					{ kind: 'block', type: 'controls_whileUntil' },
					{
						kind: 'block',
						blockxml: `
							<block type="controls_for">
								<field name="VAR">i</field>
								<value name="FROM">
									<block type="math_number">
										<field name="NUM">1</field>
									</block>
								</value>
								<value name="TO">
									<block type="math_number">
										<field name="NUM">10</field>
									</block>
								</value>
								<value name="BY">
									<block type="math_number">
										<field name="NUM">1</field>
									</block>
								</value>
							</block>`,
					},
					{ kind: 'block', type: 'controls_forEach' },
					{ kind: 'block', type: 'controls_flow_statements' },
				] as Blockly.utils.toolbox.BlockInfo[],
			},
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_MATH}',
				colour: '%{BKY_MATH_HUE}',
				contents: [
					{ kind: 'block', type: 'math_number' },
					{ kind: 'block', type: 'math_single' },
					{ kind: 'block', type: 'math_trig' },
					{ kind: 'block', type: 'math_constant' },
					{ kind: 'block', type: 'math_number_property' },
					{ kind: 'block', type: 'math_round' },
					{ kind: 'block', type: 'math_on_list' },
					{ kind: 'block', type: 'math_modulo' },
					{ kind: 'block', type: 'math_constrain' },
					{ kind: 'block', type: 'math_random_int' },
					{ kind: 'block', type: 'math_random_float' },
					{ kind: 'block', type: 'math_atan2' },
				] as Blockly.utils.toolbox.BlockInfo[],
			},
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_TEXT}',
				colour: 70,
				contents: [
					{ kind: 'block', type: 'text' } as Blockly.utils.toolbox.BlockInfo,
					{
						...(undefined as Blockly.utils.toolbox.BlockInfo),
						kind: 'block',
						blockxml: `<block type="text_join" inline="true" />`,
					},
					{ kind: 'block', type: 'text_append' },
					{ kind: 'block', type: 'text_length' },
					{ kind: 'block', type: 'text_isEmpty' },
					{ kind: 'block', type: 'text_indexOf' },
					{ kind: 'block', type: 'text_charAt' },
					{ kind: 'block', type: 'text_getSubstring' },
					{ kind: 'block', type: 'text_changeCase' },
					{ kind: 'block', type: 'text_trim' },
					{ kind: 'block', type: 'text_prompt_ext' },
				],
			},
			
			{ kind: 'sep' } as Blockly.utils.toolbox.SeparatorInfo,
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_VARIABLES}',
				custom: 'VARIABLE',
				colour: '%{BKY_VARIABLES_HUE}',
			},
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_FUNCTIONS}',
				custom: 'PROCEDURE',
				colour: '%{BKY_PROCEDURES_HUE}',
			},
			{
            ...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
            kind: 'category',
            name: 'Functions 2',
            colour: '%{BKY_PROCEDURES_HUE}',
            contents: [
                {
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_function"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_function_return"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_call"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_call_editable"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_call_editable_return"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_direct_call_editable"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_direct_call_editable_return"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_return"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_spread"></block>',
                },
			    
            ],
        },
			
			{
				...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: '%{BKY_CAT_LISTS}',
				colour: '%{BKY_LISTS_HUE}',
				contents: [
					{ kind: 'block', type: 'lists_create_empty' },
					{ kind: 'block', type: 'lists_create_with' },
					{ kind: 'block', type: 'lists_repeat' },
					{ kind: 'block', type: 'lists_length' },
					{ kind: 'block', type: 'lists_isEmpty' },
					{ kind: 'block', type: 'lists_indexOf' },
					{ kind: 'block', type: 'lists_getIndex' },
					{ kind: 'block', type: 'lists_setIndex' },
				] as Blockly.utils.toolbox.BlockInfo[],
			},
			{
            ...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
            kind: 'category',
            name: 'Objects',
            colour: 'F99EA3',
            contents: [
                {
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="object_create"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="object_keys"><value name="object_input"></value></block>',
					// blockxml: '<block type="object_keys"><value name="object_input"><shadow type="node_msg"> </shadow></value></block>'
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="object_from_json"><value name="JSON"><shadow type="text"></shadow></value></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="object_to_json"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="value_from_json_key"></block>',
                },
			    
            ],
        },
		
		{
            ...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
            kind: 'category',
            name: 'Classes',
            colour: 'A49F64',
            contents: [
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_new"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_anonymous_class"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_class"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_static"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_get"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_set"></block>',
                },
			],
		},
		{
            ...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
            kind: 'category',
            name: 'Advanced js',
            colour: '88A464',
            contents: [
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_try_catch"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_catch"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_export"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_import"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_import_as"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="bi_comment"></block>',
                },
		]
		},
		{
            ...(undefined as Blockly.utils.toolbox.StaticCategoryInfo),
            kind: 'category',
            name: parent,
            colour: 'E77761',
            contents: [
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4eblocklyframe"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_dayvalue"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_periodvalue"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_logvalue"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="pushto_console"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="pushto_webconsole"></block>',
                },
                {
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="wait_seconds"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_statspicker"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="display"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_daypicker"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_periodpicker"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_datepicker"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_trackers"></block>',
                },
				{
                    ...(undefined as Blockly.utils.toolbox.BlockInfo),
                    kind: 'block',
                    blockxml: '<block type="s4e_httprequest"></block>',
                },
			]
			},
		
		
		],
	}};

	
</script>