<script setup>
import gsap from "gsap";

const chars = "FANTASTIC 5".split("");
const container = useTemplateRef("container");

const REPEAT_COUNT = 8;
const ROLL_DURATION = 0.5;
const TOTAL_DURATION = 4;

let ctx;
const lever = useTemplateRef("lever");
const spinning = ref(false);

function startSpin() {
  if (spinning.value) return;
  spinning.value = true;

  ctx?.revert();
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ paused: true });

    gsap.utils.toArray(".char:not(.space)").forEach((charEl, i) => {
      const originalText = charEl.querySelector(".original-text");
      const cloneText = charEl.querySelector(".clone-text");
      const dirUp = i % 2 === 0;

      gsap.set(cloneText, {
        yPercent: dirUp ? -100 : 100,
      });

      tl.add(
        gsap.to([originalText, cloneText], {
          yPercent: dirUp ? "+=100" : "-=100",
          duration: ROLL_DURATION,
          ease: "none",
          repeat: REPEAT_COUNT,
        }),
        0,
      );
    });

    tl.tweenTo(tl.duration(), {
      duration: TOTAL_DURATION,
      ease: "power4.inOut",
      onComplete: () => {
        spinning.value = false;
      },
    });
  }, container.value);
}

function pullLever() {
  if (spinning.value) return;

  gsap.to(lever.value, {
    rotation: 45,
    duration: 0.3,
    ease: "power2.in",
    transformOrigin: "bottom center",
    onComplete: () => {
      startSpin();
      gsap.to(lever.value, {
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    },
  });
}

async function initAnimation() {
  await document.fonts.ready;

  gsap.to(container.value, { opacity: 1, duration: 0.5 });
  startSpin();
}

onMounted(() => {
  initAnimation();
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="container"
    style="opacity: 0"
    class="flex h-screen w-full items-center justify-center text-white"
  >
    <!-- Машина -->
    <div class="flex flex-col items-center gap-6">
      <!-- Верхня панель -->
      <div class="font-body text-sm tracking-[0.3em] text-[#C0C0C0] opacity-60">
        ◆ FANTASTIC 5 SLOT MACHINE ◆
      </div>

      <!-- Барабани + Важіль -->
      <div class="flex items-center gap-3 sm:gap-6">
        <div
          class="flex gap-0.5 rounded-2xl border border-[#C0C0C0]/20 bg-black/80 p-2 shadow-[0_0_60px_rgba(192,192,192,0.15)] sm:gap-2 sm:p-4"
        >
          <h1 class="font-display flex text-[clamp(1.5rem,6vw,9rem)] uppercase">
            <template v-for="(char, i) in chars" :key="i">
              <!-- Пробіл -->
              <span
                v-if="char === ' '"
                class="char space w-1.5 sm:w-4 lg:w-8"
              ></span>

              <!-- Барабан -->
              <span
                v-else
                class="char relative mx-px overflow-hidden rounded-lg border border-[#C0C0C0]/30 bg-linear-to-b from-neutral-900 to-black px-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_0_12px_rgba(192,192,192,0.05)] sm:mx-1 sm:px-2 md:px-3"
              >
                <!-- Лінія підсвітки зверху -->
                <span
                  class="absolute top-0 right-0 left-0 h-px bg-[#C0C0C0]/20"
                ></span>
                <!-- Лінія підсвітки знизу -->
                <span
                  class="absolute right-0 bottom-0 left-0 h-px bg-[#C0C0C0]/10"
                ></span>

                <span
                  class="original-text block bg-linear-to-b from-white via-[#C0C0C0] to-[#707070] bg-clip-text text-transparent"
                  >{{ char }}</span
                >
                <span
                  class="clone-text absolute top-0 left-0 block bg-linear-to-b from-white via-[#C0C0C0] to-[#707070] bg-clip-text px-1 text-transparent sm:px-2 md:px-3"
                  >{{ char }}</span
                >
              </span>
            </template>
          </h1>
        </div>

        <!-- Важіль -->
        <div
          ref="lever"
          class="flex cursor-pointer flex-col items-center"
          :class="{ 'pointer-events-none': spinning }"
          style="transform-origin: bottom center"
          @click="pullLever"
        >
          <!-- Куля -->
          <div
            class="h-4 w-4 rounded-full bg-linear-to-br from-white to-[#C0C0C0] shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:h-6 sm:w-6 md:h-8 md:w-8"
          ></div>

          <!-- Стійка -->
          <div
            class="h-10 w-1 rounded-full bg-linear-to-b from-[#C0C0C0] to-[#707070] sm:h-16 sm:w-1.5 md:h-24 md:w-2"
          ></div>
        </div>
      </div>

      <!-- Нижня панель -->
      <div class="font-body text-xs tracking-[0.5em] text-[#C0C0C0]/40">
        ALL IN · DOTA 2
      </div>
    </div>
  </section>
</template>
