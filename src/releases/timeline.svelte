<style src="./timeline.scss"></style>

<script>
    import {onMount, afterUpdate} from 'svelte';
    import Release from './release.svelte';
    import ReleaseDetail from './release-detail.svelte';
    import {localeDateWithPad} from '../utils.js';

    const cmp = 'timeline';
    const today = new Date();
    let autoscroll = true;
    let slider;
    let allReleases = [];
    let visibileReleases = [];
    let showReleases = 1;
    let showNextReleaseInDetail = false;
    let timeout = null;
    let activeTimeout = null;
    let activeRelease = null;

    // reactive
    $: {
        visibileReleases = allReleases.slice(0, showReleases);
        if (showNextReleaseInDetail) {
            setActive(visibileReleases[visibileReleases.length - 1], true);
            showNextReleaseInDetail = false;
        }
    }

    // lifecycle
    onMount(async () => {
        const useLocal = false;
        const localUrl = "//localhost:8001/dist/json/versions.json";
        const distUrl = "https://trialstrackmap.sb-f.de/dist/json/versions.json";
        const res = await fetch(useLocal ? localUrl : distUrl);
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
        setActive(allReleases[0]);
    });

    afterUpdate(() => {
        if (autoscroll) {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                slider.scrollTo(slider.scrollWidth, 0);
            }, 50);
        } else {
            autoscroll = true;
        }
    });

    // actions
    function showMore(showDetail) {
        showReleases++;
        if (showDetail) {
            showNextReleaseInDetail = true;
        }
    }

    function showAll() {
        showReleases = allReleases.length;
        setActive(allReleases[allReleases.length - 1], true);
    }

    function scrollHorizontal(event) {
        const nextPx = 150;

        if (slider.doScroll) {
            slider.doScroll(event.wheelDelta > 0 ? 'left' : 'right');
        } else if ((event.wheelDelta || event.detail) > 0) {
            slider.scrollLeft += nextPx;
            showMore();
        } else {
            slider.scrollLeft -= nextPx;
        }

        autoscroll = false;
        event.preventDefault();
    }

    function setActive(release, doAutoscroll) {
        activeRelease = null;

        if (!doAutoscroll) {
            autoscroll = false;
        }

        if (activeTimeout !== null) {
            clearTimeout(activeTimeout);
        }

        activeTimeout = setTimeout(() => {
            activeRelease = release;
            if (!doAutoscroll) {
                autoscroll = false;
            }
        }, 500);
    }

    // misc
    function isFirst(index) {
        return index === 0;
    }

    function isLast(index) {
        return index === visibileReleases.length - 1;
    }
</script>

<div class={cmp} bind:this={slider} on:mousewheel={scrollHorizontal}>
    <div class="{cmp}__welcome">
        <h1>Trials Frontier Releases</h1>
        Today is the {localeDateWithPad(today)}
    </div>
    <div class="{cmp}__slider">
        {#each visibileReleases as release, i (release.version)}
            <Release
                    setActive={setActive}
                    release={release}
                    isFirst={isFirst(i)}
                    isLast={isLast(i)}
                    activeRelease={activeRelease}/>
        {:else}
            <span class="loader spin"></span>
        {/each}

        {#if visibileReleases.length > 0 && showReleases < allReleases.length}
            <div class="{cmp}__nav">
                <button class="{cmp}__more-btn" on:click={() => showMore(true)}>
                    >
                </button>
                <button class="{cmp}__more-btn" on:click={showAll}>
                    >|
                </button>
            </div>
        {/if}
    </div>
    <div class="{cmp}__detail">
        <ReleaseDetail
                today={today}
                release={activeRelease}/>
    </div>
</div>
