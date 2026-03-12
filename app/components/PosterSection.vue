<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section = useTemplateRef("section");
const card = useTemplateRef("card");
const shadow = useTemplateRef("shadow");

let ctx;

function startLevitation() {
  gsap.to(card.value, {
    y: -20,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  gsap.to(shadow.value, {
    scale: 1.15,
    opacity: 0.4,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

onMounted(() => {
  ctx = gsap.context(() => {
    // scrub-driven fade in (opacity + scale only)
    gsap.from(card.value, {
      opacity: 0,
      scale: 0.85,
      scrollTrigger: {
        trigger: section.value,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        onEnter: () => startLevitation(),
      },
    });
  }, section.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="section"
    class="flex h-screen w-full items-center justify-center"
  >
    <div class="relative flex flex-col items-center">
      <!-- Card -->
      <div
        ref="card"
        class="relative w-72 overflow-hidden rounded-2xl border border-[#C0C0C0]/20 shadow-[0_0_40px_rgba(192,192,192,0.15)] md:w-96 lg:w-105"
      >
        <img
          src="/images/poster.jpg"
          alt="Fantastic 5 team poster"
          class="block w-full"
        />
      </div>

      <!-- Shadow -->
      <div
        ref="shadow"
        class="mt-8 h-4 w-48 rounded-full bg-white/10 blur-xl md:w-64"
      ></div>
    </div>
  </section>
</template>
