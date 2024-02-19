<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { playState } from '$lib/stores';


  let isLoading = true;
  let canAccess = false;

  const start = () => {
    canAccess = true;

    setTimeout(() => {
      playState.subscribe((e) => {
        if (!(e.audio && e.video)) return;

        setTimeout(() => {
          e.audio?.play();
          e.video?.play();
        }, 1000)

      });
    }, 500)
  }

  onMount(() => {
    isLoading = false;
    playState.update((e) => {
      e.audio = new Audio('/stream/bgm');
      e.audio.loop = true;
      e.audio.volume = .3;
      return e;
    });
  });
</script>

<main class="relative flex w-screen min-h-screen font-sans select-none">
  <div
    class="absolute top-0 left-0 flex justify-center items-center
          w-screen min-h-screen z-10 font-bold text-[4vw] text-white
          bg-gradient-to-r from-[#41396F] to-[#776cb5] leading-[3.5vw]
          {!canAccess ? 'block' : 'fade-screen'}"
  >
    <div class="relative w-max {isLoading ? 'opacity-100 z-10' : 'opacity-0 -z-10'}">
      <div class="animate-pulse">
        Hayase Yuuka
      </div>
      <div class="absolute left-0 -bottom-[1vw] -z-10 bg-[#362b70] w-full h-[2vh]"/>
    </div>
  </div>

  <div class="absolute flex justify-center items-end w-screen h-screen p-[1vw] transition
    duration-1000 {!isLoading ? 'opacity-100 z-10' : '-z-10 opacity-0'} {canAccess ? 'fade-screen': ''}">
    <div
      class="absolute top-0 left-0 bg-cover bg-center w-screen h-screen brightness-75"
      style="background-image: url(/img/loading.png);"
    />
    <button
      on:click={start}
      class="z-10 bottom-text px-[.5vw] text-[2vw] text-[#7887AE] animate-pulse
            text-center font-semibold uppercase w-[calc(100%-30vw)]"
    >
      Click to start
    </button>
  </div>

  {#if canAccess}
    <slot />
  {/if}
</main>

<style>
  .bottom-text {
    background-image: linear-gradient(90deg, #ffffff00 0%, #ffffffe2 30%, #ffffffe2 70%, #ffffff00 100%);
  }

  .fade-screen {
    animation-name: fade-loading;
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: initial;
    animation-delay: 1000ms;
  }

  @keyframes fade-loading {
    80% {
      @apply opacity-0;
    }
    100% {
      @apply opacity-0 hidden;
    }
  }
</style>
