<style src="./release.scss"></style>

<script>
    export let release;
    export let isLast = false;
    const cmp = 'release';


</script>

<div class="{cmp}{release.fixfor ? ` ${cmp}--fixfor` : ''}{isLast ? ` ${cmp}--is-last` : ''}">
    <div class="{cmp}__dot" />
    <div class="{cmp}__date">{release.date}</div>
    <div class="{cmp}__label">{release.version}</div>
    <div class="{cmp}__content">
        {#if release.icon}
        <img
            class="{cmp}__icon"
            src={release.icon}
            alt="{release.version} - {release.date}" />
        {/if}


    </div>
</div>