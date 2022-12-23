

export const workspaceTemplates  = [
  {
name: "starter",
displayName: "Kick Start",
description: "a very simple workspace to be used as a starter",
color: "#C47ADA",
emoji: "𓇬",
id: "",
active: true,
block : "",
workspaceBlocks: '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="Id^|ebDg)v~9]7OwAH0/">Meaning of Life</variable></variables><block type="variables_set" id="jq;8i6!`[5_Yur!a=RAA" x="-170" y="10"><field name="VAR" id="Id^|ebDg)v~9]7OwAH0/">Meaning of Life</field><value name="VALUE"><block type="math_arithmetic" id="o6xW$V!JjL?sI=ovZpf7"><field name="OP">ADD</field><value name="A"><block type="math_number" id="R9u3Hf3GKpCy))d_`V)y"><field name="NUM">40</field></block></value><value name="B"><block type="math_number" id=";hL)Id6A51S(.@IM$`3J"><field name="NUM">2</field></block></value></block></value></block></xml>',
workspacePosition: {"scrollX":148.5,"scrollY":208,"scale":0.8},
jscode: "Meaning-of_Life=42;",
latestrun: "",
schedule:"daily"
},
{
  name: "Retrieve Data Example",
  displayName: "Retrieve Data Example",
  description: "a very simple workspace showing how to retrieve data",
  color: "#FDF0A4",
  emoji: "↓",
  id: "",
  active: true,
  block : "",
  workspaceBlocks: "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <variables>\n    <variable id=\"*MzN.0o/sf7Z1iToAFtc\">Result</variable>\n  </variables>\n  <block type=\"s4eblocklyframe\" id=\"g6el^Wf4(dl(d_yF73c*\" x=\"-170\" y=\"-110\">\n    <field name=\"NAME\">none</field>\n    <statement name=\"script\">\n      <block type=\"variables_set\" id=\"r:g^PAEjvN!dHKBU1fW)\">\n        <field name=\"VAR\" id=\"*MzN.0o/sf7Z1iToAFtc\">Result</field>\n        <value name=\"VALUE\">\n          <block type=\"s4e_dayvalue\" id=\"1{{Qot-G05.[,_bAp4k(\">\n            <value name=\"Tracker\">\n              <block type=\"s4e_trackers\" id=\"0_nYdMD.r?lOL$s5RW,|\">\n                <field name=\"Trackers\">#mood</field>\n              </block>\n            </value>\n            <value name=\"Day\">\n              <block type=\"s4e_daypicker\" id=\"F^r;umKJ;g7KpgxEQ`HD\">\n                <field name=\"Day\">yesterday</field>\n              </block>\n            </value>\n            <value name=\"Statistics\">\n              <block type=\"s4e_statspicker\" id=\"7Xest:t/GF;vObaRsR4v\">\n                <field name=\"Stats\">avg</field>\n              </block>\n            </value>\n          </block>\n        </value>\n        <next>\n          <block type=\"display\" id=\"r%#Q;2tRTO2x$$.p@2AG\">\n            <value name=\"Value\">\n              <block type=\"text_join\" id=\"Izqv:;oqC}zHqkruaa_4\" inline=\"true\">\n                <mutation items=\"2\"></mutation>\n                <value name=\"ADD0\">\n                  <block type=\"text\" id=\"Mt:)`pagaT8,AT-}Px,Q\">\n                    <field name=\"TEXT\">Your average mood score yesterday was </field>\n                  </block>\n                </value>\n                <value name=\"ADD1\">\n                  <block type=\"variables_get\" id=\"N8n[M?(EBK|b4^CG.dNo\">\n                    <field name=\"VAR\" id=\"*MzN.0o/sf7Z1iToAFtc\">Result</field>\n                  </block>\n                </value>\n              </block>\n            </value>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>",
  workspacePosition: {
    "scrollX": 159.9231719970703,
    "scrollY": 219.38511657714844,
    "scale": 0.7390763408212112
  },
  jscode: "var Result;\n\n\nhighlightBlock('g6el^Wf4(dl(d_yF73c*');\ns4eblocklyframe = \"activated\";\nvar schedule = \"none\";\nif (schedule == \"daily\") {\nvar scheduler = scheduler_activated();\nvar schedulerstart = scheduler_start();\nvar schedulerend = scheduler_end();\n}\nelse {var scheduler = false;\nvar schedulerstart = new Date();\nvar schedulerend = new Date();}\nvar loop = new Date(schedulerstart);\nwhile(loop <= schedulerend){\n  highlightBlock('r:g^PAEjvN!dHKBU1fW)');\n  Result = (fetchDayValue((\"#mood\"),(getdate(\"yesterday\",loop)),(\"avg\")));\n  highlightBlock('r%#Q;2tRTO2x$$.p@2AG');\n  display(('Your average mood score yesterday was ' + String(Result)));var newDate = loop.setDate(loop.getDate() + 1);\nloop = new Date(newDate);}\n",
  latestrun: "",
  schedule:"daily"
  },
  {
    name: "Retrieve Statistics Example",
    displayName: "Retrieve Statistics Example",
    description: "a very simple workspace showing how to retrieve statistics over a longer period of time",
    color: "#EC9740",
    emoji: "↓",
    id: "",
    active: true,
    block : "",
    workspaceBlocks: "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <variables>\n    <variable id=\"*MzN.0o/sf7Z1iToAFtc\">Result</variable>\n  </variables>\n  <block type=\"s4eblocklyframe\" id=\"g6el^Wf4(dl(d_yF73c*\" x=\"-250\" y=\"-130\">\n    <field name=\"NAME\">none</field>\n    <statement name=\"script\">\n      <block type=\"variables_set\" id=\"r:g^PAEjvN!dHKBU1fW)\">\n        <field name=\"VAR\" id=\"*MzN.0o/sf7Z1iToAFtc\">Result</field>\n        <value name=\"VALUE\">\n          <block type=\"s4e_periodvalue\" id=\"Gmt[]W8GgSqJsgihEIhG\">\n            <value name=\"Trackable\">\n              <block type=\"text_prompt_ext\" id=\"M|RXr_e`,%m6Jvoo05Sq\">\n                <mutation type=\"TEXT\"></mutation>\n                <field name=\"TYPE\">TEXT</field>\n                <value name=\"TEXT\">\n                  <block type=\"text\" id=\"X`pq`OxTH5|`1)KaL/*e\">\n                    <field name=\"TEXT\">Which keyword would you like to search for?</field>\n                  </block>\n                </value>\n              </block>\n            </value>\n            <value name=\"Period\">\n              <block type=\"s4e_periodpicker\" id=\"CMAZ5HX+:wVlnj4+`8#~\">\n                <field name=\"Period\">LAST30DAYS</field>\n              </block>\n            </value>\n            <value name=\"Statistics\">\n              <block type=\"s4e_statspicker\" id=\"7Xest:t/GF;vObaRsR4v\">\n                <field name=\"Stats\">sum</field>\n              </block>\n            </value>\n          </block>\n        </value>\n        <next>\n          <block type=\"display\" id=\"r%#Q;2tRTO2x$$.p@2AG\">\n            <value name=\"Value\">\n              <block type=\"text_join\" id=\"s0fSxGd.wKxDh)Tp-aJu\" inline=\"true\">\n                <mutation items=\"2\"></mutation>\n                <value name=\"ADD0\">\n                  <block type=\"text\" id=\"Mt:)`pagaT8,AT-}Px,Q\">\n                    <field name=\"TEXT\">Your keyword was found in </field>\n                  </block>\n                </value>\n                <value name=\"ADD1\">\n                  <block type=\"text_join\" id=\"An/W)09/4.y(X.1}aMLI\" inline=\"true\">\n                    <mutation items=\"2\"></mutation>\n                    <value name=\"ADD0\">\n                      <block type=\"variables_get\" id=\"r*eaDdZ1xK}xiLs7HA#x\">\n                        <field name=\"VAR\" id=\"*MzN.0o/sf7Z1iToAFtc\">Result</field>\n                      </block>\n                    </value>\n                    <value name=\"ADD1\">\n                      <block type=\"text\" id=\"cHR%9rZB0M~#JqzJwrw*\">\n                        <field name=\"TEXT\"> log entries</field>\n                      </block>\n                    </value>\n                  </block>\n                </value>\n              </block>\n            </value>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>",
    workspacePosition: {
      "scrollX": 184.72891235351562,
      "scrollY": 219.49559020996094,
      "scale": 0.6063000196706313
    },
    jscode: "var Result;\n\n\nhighlightBlock('g6el^Wf4(dl(d_yF73c*');\ns4eblocklyframe = \"activated\";\nvar schedule = \"none\";\nif (schedule == \"daily\") {\nvar scheduler = scheduler_activated();\nvar schedulerstart = scheduler_start();\nvar schedulerend = scheduler_end();\n}\nelse {var scheduler = false;\nvar schedulerstart = new Date();\nvar schedulerend = new Date();}\nvar loop = new Date(schedulerstart);\nwhile(loop <= schedulerend){\n  highlightBlock('r:g^PAEjvN!dHKBU1fW)');\n  Result = (fetchPeriodValue((window.prompt('Which keyword would you like to search for?')),(\"LAST30DAYS\"),(\"sum\")));\n  highlightBlock('r%#Q;2tRTO2x$$.p@2AG');\n  display(('Your keyword was found in ' + String(String(Result) + ' log entries')));var newDate = loop.setDate(loop.getDate() + 1);\nloop = new Date(newDate);}\n",
    latestrun: "",
    schedule:"daily"
    },
    {
      name: "Get Temperature",
      displayName: "Retrieve Temperature",
      description: "a very simple workspace showing how to retrieve weatherdata from http://api.openweathermap.org",
      color: "#5E7ABC",
      emoji: "↓",
      id: "",
      active: true,
      block : "",
      workspaceBlocks: "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <variables>\n    <variable id=\"Mll_ehocPKpl*,j99rDv\">UVI</variable>\n    <variable id=\"%+R/Rg-V|tiC9f7#LU)O\">Value</variable>\n  </variables>\n  <block type=\"s4eblocklyframe\" id=\"2gL!0USa-$;~A}l9%ObA\" x=\"-550\" y=\"-450\">\n    <field name=\"NAME\">none</field>\n    <statement name=\"script\">\n      <block type=\"variables_set\" id=\"D,_9OcF,J0fd3mO*n:XW\">\n        <field name=\"VAR\" id=\"Mll_ehocPKpl*,j99rDv\">UVI</field>\n        <value name=\"VALUE\">\n          <block type=\"s4e_httprequest\" id=\"(,K~=?lJHyU4KtKU;3Xv\">\n            <value name=\"Value\">\n              <block type=\"text\" id=\"4#Dg15T(!zz/rP~V-ouA\">\n                <field name=\"TEXT\">https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&amp;APPID=171afc4ace2796c30471c8a140f31231&amp;lang=fr&amp;units=metric</field>\n              </block>\n            </value>\n          </block>\n        </value>\n        <next>\n          <block type=\"variables_set\" id=\"RN/on=49vX][VL*xb.I=\">\n            <field name=\"VAR\" id=\"%+R/Rg-V|tiC9f7#LU)O\">Value</field>\n            <value name=\"VALUE\">\n              <block type=\"value_from_json_key\" id=\"XJThhg_(RW.4+L+UI[T^\">\n                <value name=\"Key\">\n                  <block type=\"text\" id=\"MfFKirn/Fe)$Kg#=^53)\">\n                    <field name=\"TEXT\">temp</field>\n                  </block>\n                </value>\n                <value name=\"JSON object\">\n                  <block type=\"value_from_json_key\" id=\"JY]1Xxb*t!d1m18[8s8m\">\n                    <value name=\"Key\">\n                      <block type=\"text\" id=\"6a:y[#B%=*A3C]T`c}6s\">\n                        <field name=\"TEXT\">main</field>\n                      </block>\n                    </value>\n                    <value name=\"JSON object\">\n                      <block type=\"object_from_json\" id=\"J0qzls@i|QbhugCk3Heg\">\n                        <value name=\"JSON\">\n                          <shadow type=\"text\">\n                            <field name=\"TEXT\"></field>\n                          </shadow>\n                          <block type=\"variables_get\" id=\"`E`aft%Tx_j/sYWlXj^g\">\n                            <field name=\"VAR\" id=\"Mll_ehocPKpl*,j99rDv\">UVI</field>\n                          </block>\n                        </value>\n                      </block>\n                    </value>\n                  </block>\n                </value>\n              </block>\n            </value>\n            <next>\n              <block type=\"pushto_webconsole\" id=\"+d5L=OvH|3R3^QZ0.81s\">\n                <value name=\"Value\">\n                  <block type=\"variables_get\" id=\"rpa[TDS8w;I1]/ooKY?{\">\n                    <field name=\"VAR\" id=\"%+R/Rg-V|tiC9f7#LU)O\">Value</field>\n                  </block>\n                </value>\n                <next>\n                  <block type=\"display\" id=\"6jAJsn^y)9B./h6|2j{7\">\n                    <value name=\"Value\">\n                      <block type=\"text_join\" id=\"n63S.D)}Ka]1Vlzc~fE?\" inline=\"true\">\n                        <mutation items=\"2\"></mutation>\n                        <value name=\"ADD0\">\n                          <block type=\"text_join\" id=\"[SCP02QRlNXQ)ml}.me:\" inline=\"true\">\n                            <mutation items=\"2\"></mutation>\n                            <value name=\"ADD0\">\n                              <block type=\"text\" id=\"D}+NEjUV$*XH2,IhUqAW\">\n                                <field name=\"TEXT\">The temperature in Amsterdam is </field>\n                              </block>\n                            </value>\n                            <value name=\"ADD1\">\n                              <block type=\"variables_get\" id=\"X/ze=sVkT)389=$[v{D@\">\n                                <field name=\"VAR\" id=\"%+R/Rg-V|tiC9f7#LU)O\">Value</field>\n                              </block>\n                            </value>\n                          </block>\n                        </value>\n                        <value name=\"ADD1\">\n                          <block type=\"text\" id=\"wBs[CMqSW-QI-hCYFRoi\">\n                            <field name=\"TEXT\"> degrees</field>\n                          </block>\n                        </value>\n                      </block>\n                    </value>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>",
      workspacePosition: {
        "scrollX": 264.63006591796875,
        "scrollY": 233.31256103515625,
        "scale": 0.45947426705971206
      },
      jscode: "var UVI, Value;\n\n\nhighlightBlock('2gL!0USa-$;~A}l9%ObA');\ns4eblocklyframe = \"activated\";\nvar schedule = \"none\";\nif (schedule == \"daily\") {\nvar scheduler = scheduler_activated();\nvar schedulerstart = scheduler_start();\nvar schedulerend = scheduler_end();\n}\nelse {var scheduler = false;\nvar schedulerstart = new Date();\nvar schedulerend = new Date();}\nvar loop = new Date(schedulerstart);\nwhile(loop <= schedulerend){\n  highlightBlock('D,_9OcF,J0fd3mO*n:XW');\n  UVI = (httpRequest('https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&APPID=171afc4ace2796c30471c8a140f31231&lang=fr&units=metric'));\n  highlightBlock('RN/on=49vX][VL*xb.I=');\n  Value = (((JSON.parse(UVI))['main'])['temp']);\n  highlightBlock('+d5L=OvH|3R3^QZ0.81s');\n  consolelog(Value);\n  highlightBlock('6jAJsn^y)9B./h6|2j{7');\n  display((String('The temperature in Amsterdam is ' + String(Value)) + ' degrees'));var newDate = loop.setDate(loop.getDate() + 1);\nloop = new Date(newDate);}\n",
      latestrun: "",
      schedule:"daily"
      }
]
