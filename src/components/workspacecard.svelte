<script>
    import { createEventDispatcher } from 'svelte'; 
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import Edit from "carbon-icons-svelte/lib/Edit.svelte";
    import Information from "carbon-icons-svelte/lib/Information.svelte";
export let workspace = {
                id: "",
				name : "",
				description: "",
                color: "",
                displayName:"",
                emoji: "",
                active: "",
                block : "",
                workspaceBlocks: "",
                workspacePosition: "",
                jscode: "",
                latestrun: "",
                schedule:"",
    }
    export let deleteWorkspace;
    export let editWorkspace;
    export let showWorkspaceInfo;
    export let gotoWorkspace;

const dispatch = createEventDispatcher();

</script>

<div class="workspace" style="background-color: {workspace.color}; color:black;" on:click={gotoWorkspace}>
  <div class="row">
      <div class="column"><div class="info">
          <span on:click|preventDefault|stopPropagation={showWorkspaceInfo}><Information size={20} /></span>
      </div></div>
      <div class="column"><div class="actions">
          <span on:click|preventDefault|stopPropagation={editWorkspace}><Edit size={20} /></span>
          <span on:click|preventDefault|stopPropagation={deleteWorkspace}><TrashCan size={20} /></span>
  </div></div>
    </div> 
  
  
  <span hidden>{workspace.id}</span>
  <div class="title">
   <h5 style="text-align:center"><b>{workspace.emoji} {workspace.displayName}</b></h5>
  </div> 
  <div class="description">
      <p hidden>{workspace.description}</p>
  </div>
  </div>

  <style>
   h3 {
        margin: 0;
        padding: 0;
		font-size: 1.5em;
		font-weight: 400;
        
	}

   
    .workspace {
        padding: 0.3rem;
        margin: 0.7rem;
        border: 0px solid #ececec;
        border-radius: .5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }

    .actions {
        justify-content: flex-end;
        display: flex;
    }

    .actions span {
        padding: 0 0 0 .5rem;
        cursor: pointer;
    }

    .info {
        justify-content: flex-start;
        display: flex;
    }
    .info span {
        padding: 0 0 0 .5rem;
        cursor: pointer;
    }
   

    .description {
        height:0.9em;
        text-align:center;
    }

    .title{
        height:2em;
        text-align:center;
    }
    
    
    .column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>