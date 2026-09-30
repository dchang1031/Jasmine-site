/**
 * All media must go through Vite (import.meta.url) so files are emitted into
 * dist/ with correct hashed paths under the GitHub Pages base URL.
 */
export const media = {
  hero1: new URL('./images/hero_jasmine_portrait_1790733232771.jpg', import.meta.url).href,
  hero2: new URL('./images/hero_jasmine_2.jpg', import.meta.url).href,
  hero3: new URL('./images/hero_jasmine_3.jpg', import.meta.url).href,
  work1: new URL('./images/work1.jpg', import.meta.url).href,
  work2: new URL('./images/work2.jpg', import.meta.url).href,
  work3: new URL('./images/work3.jpg', import.meta.url).href,
  mitsuri: new URL('./images/Mitsuri.mp4', import.meta.url).href,
  oogway: new URL('./images/oogway.mp4', import.meta.url).href,
  bioMic: new URL('./images/bio_studio_microphone_1790733243013.jpg', import.meta.url).href,
  hobbyCosplay: new URL('./images/hobby_cosplay_craft_1790733281092.jpg', import.meta.url).href,
  hobbyDnd: new URL('./images/hobby_dnd_dice_table_1790733271911.jpg', import.meta.url).href,
  sampleAnim: new URL('./images/sample_animation_reel_1790733253456.jpg', import.meta.url).href,
  sampleScifi: new URL('./images/sample_scifi_game_1790733263207.jpg', import.meta.url).href,
} as const;
