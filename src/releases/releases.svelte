<style src="./releases.scss"></style>

<script>
	import { onMount, afterUpdate } from 'svelte';
	import Release from './release.svelte';

	const cmp = 'releases';
	const nextPx = 150;
	const today = new Date();
	let autoscroll = true;
	let slider;
	let allReleases = [];
	let visibileReleases = [];
	let showReleases = 1;
	let timeout = null;

	// lifecycle
    onMount(async () => {
        const res = await fetch(`/build/versions.json`);
        const json = await res.json();
        allReleases = Object.entries(json.releases)
        // remove empty where releaseVersion !== ''
        .filter((_release) => _release[0] !== '')
        // convert app into object
        .map((_release) => {
          const release = _release[1];
          release.version = _release[0];
          return release;
        });
    });

    afterUpdate(() => {
          if(autoscroll) {
            if(timeout !== null){
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                slider.scrollTo(slider.scrollWidth, 0);
            }, 50);
          } else {
            autoscroll = true;
          }
        });

	// reactive
    $: visibileReleases = allReleases.slice(0, showReleases);

	// actions
	function showMore() {
      showReleases++;
    }
	function showAll() {
      showReleases = allReleases.length;
    }
    function scrollHorizontal(event){
        if (slider.doScroll) {
            slider.doScroll(event.wheelDelta > 0 ? 'left' : 'right');
        } else if ((event.wheelDelta || event.detail) > 0) {
            slider.scrollLeft -= nextPx;
        } else {
            slider.scrollLeft += nextPx;
            showMore();
        }

        autoscroll = false;
        event.preventDefault();
    }

    // misc
	function isLast(index){
	  return index === visibileReleases.length - 1;
	}
	function hrDate(timestamp){
	  return timestamp.toLocaleDateString();
	}
</script>

<div class={cmp} bind:this={slider} on:mousewheel={scrollHorizontal}>
    <div class="{cmp}__welcome">
        <h1>Trials Frontier Releases</h1>
        Today is the {hrDate(today)}
    </div>
    <div class="{cmp}__slider">
    {#each visibileReleases as release, i (release.version)}
        <Release
            release={release}
            isLast={isLast(i)} />
    {:else}
        <p>loading...</p>
    {/each}

    {#if visibileReleases.length > 0 && showReleases < allReleases.length}
        <div class="{cmp}__nav">
            <button class="{cmp}__more-btn" on:click={showMore}>
                >
            </button><button class="{cmp}__more-btn" on:click={showAll}>
                >|
            </button>
        </div>
    {/if}
    </div>
</div>
