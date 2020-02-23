<style src="./release-detail.scss"></style>

<script lang="ts">
    // @ts-ignore
    import {Release} from './_interfaces.ts';
    export let today;
    export let release: Release;
    const cmp = 'release-detail';

    function imgurThumb(src: string): string {
        // original: https://i.imgur.com/ZszZMYo.jpg
        // small square: https://i.imgur.com/ZszZMYos.jpg
        const fileExt = src.split('.').pop();
        return src.replace('.' + fileExt, 's.' + fileExt);
    }

    function countDaysAgo(date: string): number {
        // data: 22.02.2020
        // today: new Date()
        const parts = date.split('.').map(int => parseInt(int));
        const releaseDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const diffTime = today.getTime() - releaseDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        return Math.round(diffDays);
    }
</script>

{#if release}
    <div class={cmp}>
        {#if release.event}
            <div class="{cmp}__name">
                {release.event.name}
                {#if release.event.type}(type: {release.event.type}){/if}
                {#if release.anniversary}Anniversary: #{release.anniversary}{/if}
            </div>
        {/if}
        {#if release.fixfor}
            <div class="{cmp}__fixfor">This is a fix for {release.fixfor}</div>
        {/if}
        <div class="{cmp}__meta">
            {release.version}
            from {release.date} (days ago: {countDaysAgo(release.date)})
        </div>
        {#if release.notes}
            <p class="{cmp}__notes">{release.notes}</p>
        {/if}
        <div class="{cmp}__links">{#if release.forum}
            <a href="{release.forum}" target="_blank">Offical forum thread</a>
        {/if}{#if release.event && release.event.guide}
            <a href="{release.event.guide}" target="_blank">Guide forum thread</a>
        {/if}{#if release.event && release.event.category}
            <a href="https://trialstrackmap.sb-f.de/#filterCatViaID={release.event.category}" target="_blank">Show event tracks</a>
        {/if}{#if release.youtube}
            <a href="{release.youtube}" target="_blank">Offical youtube video</a>
        {/if}</div>
        {#if release.event}
            <div class="{cmp}__img">
                {#if Array.isArray(release.event.img)}
                    {#each release.event.img as img}
                        <a href="{img}" target="_blank"><img src="{imgurThumb(img)}" alt=""/></a>
                    {/each}
                {:else}
                    {#if release.event.img}
                        <a href="{release.event.img}" target="_blank"><img src="{imgurThumb(release.event.img)}"
                                                                           alt=""/></a>
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
{/if}
