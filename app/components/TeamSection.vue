<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const players = [
  {
    name: "Андрей",
    description:
      "Дизайнер. Он же капитан команды. В жизни - спокоен. В игре - берегись. Характер двойной. Женат.",
    image: "/images/team/andrey.jpg",
  },
  {
    name: "Глеб",
    description:
      "Фронтенд тимлид. Саппорт команды в Дота 2. Любит шахматы. По утрам делает йогу. Характер терпеливый. Женат.",
    image: "/images/team/gleb.JPG",
  },
  {
    name: "Виталиус",
    description:
      "Frontend (Миньон Валеры). Любит вино, пиво и салат. Характер как у твоего лучшего друга. Женат.",
    image: "/images/team/vitalik.JPG",
  },
  {
    name: "Вова",
    description:
      "Казино менеджер. Любит риск и красивые цифры на балансе. Умеет ставить олл-ин - и в казино, и в Доте. Характер хладнокровный. Не женат.",
    image: "/images/team/vlad.JPG",
    imageObjectPosition: "object-[50%_55%] md:object-bottom",
  },
  {
    name: "Юрий",
    description:
      "Email Marketing. В жизни - спорт, аниме и мотоциклы. В Доте - союзник которого не ждёшь. Характер неизвестный. Не женат.",
    image: "/images/team/yura.jpg",
    imageObjectPosition: "object-[50%_40%] md:object-center",
  },
];

const section = useTemplateRef("section");
let ctx;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray(".card");

    gsap.set(cards, {
      x: (i) => i * -3,
      y: window.innerHeight + 100,
      zIndex: (i) => i,
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 2,
        // markers: true,
      },
    });

    cards.forEach((card, i) => {
      const img = card.querySelector(".img-wrapper");

      tl.to(card, {
        y: i * 6,
        scale: 1 - i * 0.01,
        duration: 1,
        ease: "power4.inOut",
      });

      tl.to(
        card,
        {
          rotation: i % 2 === 0 ? 2 : -2,
          duration: 0.8,
          ease: "sine.inOut",
        },
        ">-0.1",
      );

      tl.fromTo(
        img,
        {
          clipPath: "inset(50% 50% 50% 50%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
        },
        "<",
      );
    });
  }, section.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="section" class="main-section relative h-screen overflow-hidden">
    <div
      class="card-container absolute top-1/2 left-1/2 h-125 w-65 -translate-1/2 sm:w-87.5 md:h-82.5 md:w-172.5"
    >
      <div
        v-for="player in players"
        :key="player.name"
        class="card invisible absolute inset-0 flex flex-col gap-5 rounded-xl border border-[#C0C0C0]/20 bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] will-change-transform md:flex-row"
      >
        <div
          class="content flex flex-col items-start justify-center md:justify-around md:pt-0 md:pr-3"
        >
          <div class="player-info mt-5 md:mt-0">
            <h1
              class="font-display bg-linear-to-b from-white via-[#C0C0C0] to-[#707070] bg-clip-text text-3xl text-transparent md:text-5xl"
            >
              {{ player.name }}
            </h1>

            <div class="my-3 h-px w-8 bg-[#C0C0C0]/30"></div>

            <p
              class="font-body text-sm leading-relaxed tracking-wide text-[#C0C0C0]/70 md:text-base"
            >
              {{ player.description }}
            </p>
          </div>
        </div>

        <div
          class="img-wrapper mx-auto mt-auto h-48 min-w-full bg-[#f3f4f7] bg-linear-[315deg,#f3f4f7_0%,#caccd1_74%] will-change-transform [clip-path:inset(50%_50%_50%_50%)] md:h-full md:min-w-57.5"
        >
          <img
            class="block h-full w-full object-cover"
            :class="player.imageObjectPosition || 'object-top'"
            :src="player.image"
            :alt="player.name"
          />
        </div>
      </div>
    </div>
  </section>
</template>
