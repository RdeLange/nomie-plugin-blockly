
<script>
	import { hslide } from './hslide.js';

  export let workspaces;
  export let lastcentralschedule = "01-01-1999";
  var countschedule =0;

  workspaces.forEach(element => {
    if (element.jscode.includes('s4eblocklyframe = "activated"') && !element.jscode.includes('var schedule = "none"')){
      countschedule = countschedule+1;
    }
  });

  //let lastrun = new Date(lastcentralschedule).toISOString.slice(0, 10);
	let lastrun = new Date(lastcentralschedule).toISOString();
	
	let slides = [
		{ content: 'Last Schedule', sub: lastrun ,bg: '#E77761' },
		{ content: 'Workspaces', sub: 'Total workspaces available: '+workspaces.length,bg: '#E77761' },
		{ content: 'Workspaces', sub: 'Total workspaces scheduled: '+countschedule,bg: '#E77761' },
	]
	
	let cur = 0;
	
	function changeSlide(slide) {
		cur = slide;
	}
	
	const clamp = (number, min, max) => Math.min(Math.max(number, min), max);
	const transition_args = {
		duration: 200,
	}
	
	function prev(e) {
		cur = clamp( --cur, 0, slides.length-1 )
	}
	
	function next(e) {
		cur = clamp( ++cur, 0, slides.length-1 )
	}
	
  const ARROW_LEFT = 37;
	const ARROW_RIGHT = 39;
	function handleShortcut(e) {
        if (e.keyCode === ARROW_LEFT ) {
						prev();
        }
		    if (e.keyCode === ARROW_RIGHT ) {
            next();
        }
    }

</script>

<svelte:window on:keyup={handleShortcut} />

<div class="extra-outer-wrapper">
	<div class="outer-wrapper">
		<div class="inner-wrapper">
			{#each slides as slide, id}
				{#if id === cur}
				<div
						 style="background:{slide.bg}; border-radius:10px"
						 class="slide"
						 in:hslide={transition_args}
						 out:hslide={transition_args}
				>
        <table>
          <tr>{slide.content}</tr>
					<tr><h4>{slide.sub}</h4></tr>
        </table>
        
      
        </div>
				{/if}
			{/each}
			<div class="controls">
				<button on:click="{()=>prev()}">
					&lt;
				</button>
				<button on:click="{()=>next()}">
					&gt;
				</button>
			</div>
		</div>
	</div>
</div>


<style>
	
	:global(html) {
		font-size: 62.5%;
	}
	
	:global(body) {
		font-size: 1.4rem;
	}

	button {
		background: transparent;
		color: #FFF;
		border-color: transparent;
		width: 3.2rem;
		height: 3.2rem;
	}
	
	button:hover,
	button:focus{
		background: rgba(0,0,0,0.5);
	}
	
	

	.extra-outer-wrapper {
		width: 95%;
		margin: 0 auto;
    height: 100%;
	}

	.outer-wrapper {
		width: 100%;
		position: relative;
    height: 100%
	}
	
	.inner-wrapper {
		height: 80%;
		width: 100%;
    height: 100%;
		display: flex;
		position: absolute;
	}

	.controls button:first-child {
		position: absolute;
		left: 0;
		top: calc(50% - 1.2rem);
	}
	
	.controls button:last-child {
		position: absolute;
		right: 0;
		top: calc(50% - 1.2rem);
	}
	
	.slide {
		flex: 1 0 auto;
		width: 100%;
		height: 100%;
		background: red;
	  align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
		font-weight: bold;
		font-size: 2rem;
		color: white;
	}
	
	.controls {
		text-align: center;
		width: 100%;
		display: block;
	}

  table, th, td {
  border: 1px solid;
}
</style>