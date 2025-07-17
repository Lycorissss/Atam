<script setup lang="ts">
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'

const box = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { duration: 1, ease: 'power1.inOut' },
  })

  tl.to(box.value, { x: 250, rotation: 260 })
    .to(box.value, { x: 0, rotation: -260 })
})
</script>

<template>
  <div class="relative min-h-screen bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_50%,_#10b981_50%,_#10b981_100%)] dark:bg-[linear-gradient(to_bottom,_#000_0%,_#000_50%,_#10b981_50%,_#10b981_100%)] overflow-hidden px-6">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div class="grid grid-cols-4 gap-4">
          <AtamCard class="col-span-3" severity="orange">
            <template #content>
              <div class="flex gap-8">
                <img
                  src="https://img.freepik.com/free-photo/pleased-brunette-woman-with-eastern-appearance-wears-loose-sweater-embraces-herself-smiles-pleasantly-enjoys-listening-favorite-music-via-electronic-headphones_273609-45213.jpg"
                  alt="" class="w-2xs rounded-2xl hover:shadow[5px_5px_0_#000]"
                >
                <div class="flex flex-col gap-3 ">
                  <h2>Lorem ipsum dolor</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae voluptatibus amet dolorum
                    doloribus quia commodi accusamus ab enim itaque incidunt nulla error corporis eveniet odit quae,
                    illum inventore sed.
                  </p>
                  <AtamButton :hover="true">
                    EAsThim
                  </AtamButton>
                </div>
              </div>
            </template>
          </AtamCard>
          <AtamCard class="" severity="purple">
            <template #content>
              <div class="text-center">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod recusandae voluptatibus amet dolorum
                  doloribus quia commodi accusamus ab enim itaque incidunt nulla error corporis eveniet odit quae, illum
                  inventore sed.
                </p>
              </div>
            </template>
          </AtamCard>
        </div>
      </div>
      <AtamCard severity="purple">
        <template #content>
          <h2>Please Subscribe</h2>
          <p>
            this page home atams wellcome <span class="uppercase font-bold">Wellcome demon king </span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo iste expedita optio qui ratione harum,
            distinctio quaerat ea quis fugiat alias libero id nulla architecto quidem, mollitia similique ipsum dicta!
          </p>
        </template>
        <template #footer>
          <div class="text-end">
            <AtamButton :hover="true">
              EAsThim
            </AtamButton>
          </div>
        </template>
      </AtamCard>
      <AtamCard severity="orange">
        <template #content>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nesciunt, delectus sed libero ut eaque
            voluptatem tenetur ad quas, excepturi omnis nihil quaerat consequatur dicta quisquam? Facilis magni earum
            ipsa.
          </p>
          <div ref="box" class="w-20 h-20 bg-blue-500 rounded-lg mx-auto mt-5" />
        </template>
      </AtamCard>
      <div class="col-span-2">
        <div class="grid grid-cols-4 gap-4">
          <AtamCard severity="primary" class="rounded-full" :hover="true">
            <template #content>
              <div class="flex gap-2 justify-center items-center">
                <span><i class="i-mdi-treasure-chest text-2xl" /></span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </template>
          </AtamCard>

          <AtamCard severity="primary" class="rounded-full" :hover="true">
            <template #content>
              <div class="flex gap-2 justify-center items-center">
                <span><i class="i-mdi-treasure-chest text-2xl" /></span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </template>
          </AtamCard>

          <AtamCard severity="primary" class="rounded-full" :hover="true">
            <template #content>
              <div class="flex gap-2 justify-center items-center">
                <span><i class="i-mdi-treasure-chest text-2xl" /></span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </template>
          </AtamCard>

          <AtamCard severity="primary" class="rounded-full" :hover="true">
            <template #content>
              <div class="flex gap-2 justify-center items-center">
                <span><i class="i-mdi-treasure-chest text-2xl" /></span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </template>
          </AtamCard>
        </div>
      </div>
    </div>
  </div>
</template>
