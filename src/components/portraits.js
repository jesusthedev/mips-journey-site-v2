// src/components/portraits.js
const base = import.meta.env.BASE_URL; // "/" locally, "/mips-journey-site-v2/" on Pages

export const portraits = [
  { id:'abhishek', src:`${base}portraits/abhishek_portrait.png`, alt:'Portrait Abhishek' },
  { id:'jesus',    src:`${base}portraits/jesus_portrait.png`,    alt:'Portrait Jesus' },
  { id:'thai',     src:`${base}portraits/thai_portrait.png`,     alt:'Portrait Thai' },
  { id:'saily',    src:`${base}portraits/saily_portrait.png`,    alt:'Portrait Saily' },
  { id:'niki',     src:`${base}portraits/niki_portrait.png`,     alt:'Portrait Niki' },
  { id:'luis',     src:`${base}portraits/luis_portrait.png`,     alt:'Portrait Luis' },
  { id:'jerome',   src:`${base}portraits/jerome_portrait.png`,   alt:'Portrait Jerome' },
];
