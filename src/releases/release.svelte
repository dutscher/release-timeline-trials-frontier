<style src="./release.scss"></style>

<script type="ts">
    import {onMount} from 'svelte';
    import {tweened} from 'svelte/motion';
    import {fade} from 'svelte/transition';
    import {cubicOut} from 'svelte/easing';
    import {bm} from '../utils';
    // @ts-ignore
    import {Release} from './_interfaces.ts';

    export let release;
    export let isFirst = false;
    export let isLast = false;
    let iconLoaded = false;

    const bubble = tweened(0, {
        delay: 500,
    });
    const stroke = tweened(0, {
        easing: cubicOut,
    });
    export let activeRelease: Release;
    export let setActive = () => {
    };
    const cmp = 'release';

    onMount(() => {
        bubble.set(1, {});
    });

    $: {
        if (!isLast) {
            stroke.set(1.1, {});
        }
    }
</script>

<div class="{bm(cmp, release.fixfor && 'fixfor', isFirst && 'is-first', isLast && 'is-last', activeRelease == release && 'is-active')}"
     on:click="{() => setActive(release)}">
    <div class="{cmp}__dot">
        <div class="{cmp}__dot__bubble" style="transform: scale({ $bubble });"></div>
        <div class="{cmp}__dot__stroke" style="width: { Math.round($stroke * 100) }%;"></div>
    </div>
    <div class="{cmp}__date" transition:fade="{{ delay: 1000 }}">{release.date}</div>
    <div class="{cmp}__label" transition:fade="{{ delay: 1000 }}">{release.version}</div>
    <div class="{cmp}__content">
        {#if release.icon}
            <img
                    class="{cmp}__icon{iconLoaded ? ' is-loaded' : ''}"
                    src={release.icon}
                    on:load="{() => iconLoaded = true}"
                    alt="{release.version} - {release.date}"/>
        {/if}
    </div>
</div>