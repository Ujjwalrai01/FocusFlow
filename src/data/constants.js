// This file centralizes all static data and configurations.

export const THEMES = {
  cyber: { primary: 'cyan-400', secondary: 'purple-500', accent: 'pink-500', bg: 'from-cyan-900/20 to-purple-900/20' },
  matrix: { primary: 'green-400', secondary: 'lime-500', accent: 'emerald-400', bg: 'from-green-900/20 to-lime-900/20' },
  neon: { primary: 'yellow-400', secondary: 'orange-500', accent: 'red-400', bg: 'from-yellow-900/20 to-orange-900/20' },
  retro: { primary: 'pink-400', secondary: 'blue-500', accent: 'purple-400', bg: 'from-pink-900/20 to-blue-900/20' }
};

export const AMBIENT_SOUNDS = [
  { id: 'none', name: 'Silence', emoji: '🔇', category: 'minimal' },
  { id: 'rain', name: 'Rain Storm', emoji: '🌧️', category: 'nature' },
  { id: 'cafe', name: 'Coffee Shop', emoji: '☕', category: 'urban' },
  { id: 'ocean', name: 'Ocean Waves', emoji: '🌊', category: 'nature' },
  { id: 'forest', name: 'Forest Birds', emoji: '🌲', category: 'nature' },
  { id: 'fireplace', name: 'Crackling Fire', emoji: '🔥', category: 'cozy' },
  { id: 'synthwave', name: 'Synthwave', emoji: '🎵', category: 'music' },
  { id: 'lofi', name: 'Lo-Fi Hip Hop', emoji: '🎧', category: 'music' }
];

export const ACHIEVEMENTS = [
  { id: 'first-session', name: 'First Focus', desc: 'Complete your first session', icon: '🎯', rarity: 'common' },
  { id: 'streak-3', name: 'Getting Warmed Up', desc: '3 sessions in a row', icon: '🔥', rarity: 'common' },
  { id: 'streak-7', name: 'On Fire', desc: '7 day streak', icon: '🚀', rarity: 'rare' },
  { id: 'early-bird', name: 'Early Bird', desc: 'Focus before 6 AM', icon: '🌅', rarity: 'uncommon' },
  { id: 'night-owl', name: 'Night Owl', desc: 'Focus after 11 PM', icon: '🦉', rarity: 'uncommon' },
  { id: 'marathon', name: 'Marathon Runner', desc: '20 sessions in one day', icon: '🏃', rarity: 'legendary' },
  { id: 'centurion', name: 'Centurion', desc: '100 total sessions', icon: '💯', rarity: 'epic' },
  { id: 'zen-master', name: 'Zen Master', desc: '50 meditation sessions', icon: '🧘', rarity: 'rare' }
];