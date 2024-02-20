<script lang="ts">
  import { browser } from '$app/environment';
  import { playState } from '$lib/stores';
  import { onDestroy, onMount } from 'svelte';
  import CloudIcons from '../components/CloudIcons.svelte';

  let video: HTMLVideoElement;
  let audio: HTMLAudioElement;
  let isPlaying = false;
  let currentIndex = 0;
  let autoplay = false;
  let ended = false;

  const data = [
    {
      text: 'Sensei! seseorang memberikan surat ini untukmu. Aku bacakan ya?',
      audio: '/audio/birthday/ask-for-read.wav',
      delay: 0,
      choices: [
        {
          text: 'Ya, bacakan untukku Yuuka!',
          selected: false
        }
      ]
    },
    {
      text: 'Dia bilang... "Selamat ulang tahun yang ke-22, feylynn! Semoga hari ini kamu dalam kondisi yang sehat dan berbahagia ya!"',
      audio: '/audio/birthday/hbd-1-2.wav',
      delay: 1200,
      choices: []
    },
    {
      text: '"Semoga di tahun ini kamu diberi kesehatan, kebahagiaan dan semoga lancar dalam perkuliahan kamu!"',
      audio: '/audio/birthday/hbd-2.wav',
      delay: 500,
      choices: []
    },
    {
      text: '"Dan semoga cita-cita kamu cepat tercapai ya! dan semoga berkah untuk umur kamu yang ke-22 ini!"',
      audio: '/audio/birthday/hbd-3.wav',
      delay: 500,
      choices: []
    },
    {
      text: '"Dan... semoga kamu makin cantik dan manis ya! ehehe."',
      audio: '/audio/birthday/hbd-4-2.wav',
      delay: 800,
      choices: []
    },
    {
      text: '"Teman tercinta kamu, Kiizuha, sekali lagi mengucapkan selamat ulang tahun padamu!"',
      audio: '/audio/birthday/hbd-5.wav',
      delay: 500,
      choices: []
    },
    {
      text: '"-- dari Kiizuha."',
      audio: '/audio/birthday/epilogue.wav',
      delay: 500,
      choices: []
    }
  ];

  const autoplayDialogueAudio = () => {
    ended = false;

    if (!autoplay || data[currentIndex].choices.length) return;

    if (currentIndex === data.length - 1) {
      isPlaying = false;

      playState.update((e) => {
        e.audio!.volume = 0.3;
        return e;
      });

      return;
    }

    currentIndex++;
    audio.src = data[currentIndex].audio;

    setTimeout(() => {
      audio.play();
    }, data[currentIndex].delay);
  };

  const autoDialogue = () => {
    autoplay = !autoplay;

    if (data[currentIndex].choices.length) return;

    if (autoplay) {
      if (!audio?.ended) return;

      currentIndex++;
      audio!.src = data[currentIndex].audio;
      ended = false;
      audio?.play();
      audio?.addEventListener('ended', autoplayDialogueAudio);
    } else {
      audio?.addEventListener('ended', setEnded);
    }
  };

  const dialoguePlay = () => {
    if (isPlaying) return;

    currentIndex = 0;
    audio = new Audio(data[currentIndex].audio);
    isPlaying = true;
    ended = false;

    audio.addEventListener('ended', autoplayDialogueAudio);
    audio.addEventListener('ended', setEnded);

    setTimeout(() => {
      playState.update((e) => {
        e.audio!.volume = 0.02;
        return e;
      });

      audio.play();
    }, 1000);
  };

  const setEnded = () => {
    ended = true;
  };

  const next = () => {
    if (currentIndex === data.length - 1) {
      isPlaying = false;

      playState.update((e) => {
        e.audio!.volume = 0.3;
        return e;
      });

      return;
    }

    currentIndex++;
    audio.src = data[currentIndex].audio;
    audio.play();
    ended = false;
  };

  const nextDialogue = () => {
    if (!audio.ended || data[currentIndex].choices.length) return;

    next();
  };

  onMount(() => {
    playState.update((e) => {
      e.video = video;
      return e;
    });
  });

  onDestroy(() => {
    if (!browser || !audio) return;
    audio.removeEventListener('ended', autoplayDialogueAudio);
    audio.removeEventListener('ended', setEnded);
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="relative left-0 top-0 w-screen h-screen">
  <video
    bind:this={video}
    loop
    preload="metadata"
    class="absolute top-0 left-0 h-screen w-screen object-cover brightness-[80%]"
  >
    <track kind="captions" />
    <source src="/stream/l2d" />
  </video>

  <div class="absolute right-0 top-0 w-screen px-[1.5vw] pt-[1vw] z-20">
    <div class="flex justify-end">
      <button
        on:click={autoDialogue}
        class="{autoplay ? 'bg-yellow-400' : 'bg-white'}
              rounded-[.5vw] skew-x-[-8deg] text-[1.1vw] text-[#2d354b]
              p-[.5vw] font-extrabold uppercase shadow-md shadow-gray-800"
      >
        <div class="px-[1vw]">Auto</div>
      </button>
    </div>
  </div>

  <div
    on:click={dialoguePlay}
    class="absolute left-0 top-0 w-screen h-screen {!isPlaying ? 'z-10' : 'z-0'}"
  >
    <div class="relative flex justify-center min-h-screen p-[1vw]">
      <div class="flex justify-center items-end w-screen">
        <div
          class="bottom-text px-[.5vw] text-[2vw] text-[#7887AE]
                text-center font-semibold uppercase w-[calc(100%-30vw)]"
        >
          {#if !isPlaying}
            Click on the screen to play.
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="absolute top-0 left-0 h-screen w-screen">
    <div class="flex justify-center items-center min-h-screen">
      {#if isPlaying && currentIndex !== data.length}
        <div class="chat">
          <div on:click={nextDialogue} class="flex flex-col chat-bubble shader">
            <div class="font-semibold">
              {data[currentIndex].text}
            </div>
            {#if ended}
              <div class="flex justify-end mt-[1vw]">
                <div class="bottom-arrow mb-[.5vw] mr-[.5vw] animate-bounce" />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div
    class="absolute top-0 left-0 h-screen w-screen
    {isPlaying && data[currentIndex].choices.length && ended ? 'block' : 'hidden'}"
  >
    <div class="flex justify-center items-end pb-[1.5vw] min-h-screen">
      <div class="flex flex-col gap-[.5vw]">
        {#each data[currentIndex].choices as choice}
          <button
            on:click={next}
            class="flex items-center gap-[.5vw] px-[1vw] py-[.5vw] rounded-[2vw]
                  bg-white/70 text-neutral-800 text-[1.2vw] font-semibold
                  border-[.1vw] border-neutral-800/50 shader"
          >
            <div class="text-neutral-800 -scale-x-100 w-[2vw] h-[2vw]">
              <CloudIcons />
            </div>
            <div>
              {choice.text}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .bottom-text {
    background-image: linear-gradient(
      90deg,
      #ffffff00 0%,
      #ffffffe2 30%,
      #ffffffe2 70%,
      #ffffff00 100%
    );
  }

  .shader {
    filter: drop-shadow(0 0.3vw 0.2vw rgb(0 0 0 / 0.07))
      drop-shadow(0 0.1vw 0.1vw rgb(0 0 0 / 0.06));
  }

  .chat {
    @apply grid gap-x-[.6vw] py-[.5vw] fixed left-[calc(55%)] top-[35vh];
  }

  .chat-bubble {
    @apply relative block px-[1vw] py-[.5vw] max-w-[calc(30vw)] rounded-[1vw]
    min-h-[1vh] min-w-[1vw] bg-white/70 text-neutral-800 text-[1.2vw];
  }

  .chat-bubble::before {
    @apply absolute bottom-0 h-[1vh] w-[1vw] bg-inherit content-[""];
  }

  .chat .chat-bubble {
    @apply col-start-2;
  }

  .chat .chat-bubble::before {
    @apply content-[""] -left-[.675vw] top-[.8vw] bg-transparent;
    width: 0;
    height: 0;
    border-top: 0.6vw solid transparent;
    border-bottom: 0.6vw solid transparent;
    border-right: 0.7vw solid rgb(255 255 255 / 0.7);
  }

  .bottom-arrow {
    width: 0;
    height: 0;
    border-left: 0.5vw solid transparent;
    border-right: 0.5vw solid transparent;
    border-top: 0.7vw solid rgb(56 189 248);
  }
</style>
