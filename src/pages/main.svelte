<script>
    import { createEventDispatcher } from 'svelte';
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
        Tile,
    } from "carbon-components-svelte";
    import WorkspaceCard from "../components/workspacecard.svelte";
    import AddCard from "../components/addcard.svelte";
    
   
    export let pluginname;
    export let pluginemoji;
    export let workspaces = [];

    let amountofcards = workspaces.length;

    let open=true;
   
   const dispatch = createEventDispatcher();

   
    function deleteworkspace(id){
      dispatch("deleteworkspace",id)
    }

    function editworkspace(id){
      dispatch("editworkspace",id)
    }

    function showworkspaceinfo(id){
      dispatch("showworkspaceinfo",id)
    }

    function gotoworkspace(id){
      dispatch("gotoworkspace",id)
    }

    
</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">Loaded Succesfully</h5>
          <hr>
        </Column>
      </Row>
      <Row>
        <Column>
    <div class="container">    
      <div>
        
        <div class="workspaces-list">
          {#if workspaces.length === 0}
          <Tile>
            <p class="no-workspaces">
              No Blockly Workspaces? Oh dear, please add one to start practicing. 
            </p>
            
          </Tile>
          {:else}
            {#each workspaces as workspace}
              <WorkspaceCard
                workspace={workspace}
                deleteWorkspace={() => deleteworkspace(workspace.id)}
                editWorkspace={() => editworkspace(workspace.id)}
                showWorkspaceInfo={() => showworkspaceinfo(workspace.id)}
                gotoWorkspace={() => gotoworkspace(workspace.id)}
                />
            {/each}
          {/if}
          <AddCard bind:amountofcards={amountofcards} on:addnew={()=>{dispatch("addnew")}} on:addbytemplate={(event)=>{dispatch("addbytemplate",event)}}/>
          
  
        </div>
      </div>
    </div>
      </Column>
      </Row>

    </Grid>
  </Content>



  <style>
    h2 {
       margin: 0;
       padding: 0;
       font-size: 2.5em;
       font-weight: 400;
   }

   .workspaces-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.container {
		display: flex;
		justify-content: space-around;
		margin: 1rem auto auto auto;
	}
	@media screen and (max-width: 720px) {
		.container {
			flex-direction: column;
		}
	}

  .no-workspaces {
		padding: 1em;
    	border: 1px solid;
    	border-radius: 4px;
	}
 </style>

