<script>
import Download from "carbon-icons-svelte/lib/Download.svelte";
import Upload from "carbon-icons-svelte/lib/Upload.svelte";
import { createEventDispatcher } from 'svelte';

export let Workspaces;
const dispatch = createEventDispatcher();



//Workspaces = [{
//		  name: "Rinaldo",
//		  email: "rin@mail.com",
//		  website: "www.s4e.com"
//		},
//      {
//		  name: "Rinaldo2",
//		  email: "rin2@mail.com",
//		  website: "www.s4e2.com"
//		}];

function SaveFile(fileName, contentType) {
    console.log("Placeholder Save File");
	fileName = Workspaces[0].id+".wsp";
    let content = JSON.stringify(Workspaces);

        const a = document.createElement("a");
		  const file = new Blob([content], { type: contentType });
		  a.href = URL.createObjectURL(file);
		  a.download = fileName;
		  a.click();
   
}


async function LoadFile() {
    console.log("Placeholder Load File");
	document.querySelector("#file-input").value = null;
    document.querySelector("#file-input").click();
    var awaitfile = setInterval(function() {
  		if (document.querySelector("#file-input").files[0]) {
			importFile(document.querySelector("#file-input").files[0]);
    		clearInterval(awaitfile);
  		}
	}, 1000);

}

function importFile(file) {
	//let file = document.querySelector("#file-input").files[0];
		let reader = new FileReader();
		reader.addEventListener('load', function(e) {
	    		let text = e.target.result;
				var obj = JSON.parse(text);
				dispatch("uploadws",obj);

		});
		reader.readAsText(file);
}
</script>


<span on:click={()=>{SaveFile("yourfile.json", "text/plain")}}><Upload size={32} style="cursor: pointer;"/></span>
<span on:click={()=>{LoadFile()}}><Download size={32} style="cursor: pointer;"/></span>
<input hidden={true} type="file" id="file-input" accept=".wsp"/>

