<script>
	let name = 'world';
	const img = 'https://i.imgur.com/2msZ6mJ.jpg';
	let string = `this string contains some <strong>HTML!!!</strong>`;

	let count = 0;
	let doubled = 0;
    $: if (count >= 10) {
    	alert(`count is dangerously high!`);
    	doubled = 9;
    }

	function handleClick() {
    	count += 1;
    }
</script>

<style>
	h1 {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<h1>Hello {name} word!</h1>

<img src={img} alt="latest release" />

<p>{@html string}</p>

<button on:click={handleClick}>Clicked {count} time{count !== 1 ? 's' : ''} {doubled}</button>