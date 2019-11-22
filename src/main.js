import Releases from './releases/releases.svelte';

var app = new Releases({
	target: document.body,
  props: {
    answer: 42
  },
});

export default app;