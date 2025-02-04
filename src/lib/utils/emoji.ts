/**
 * This function for demo purposes only
 */
export const getRandomEmoji = (): string => {
  const emojis = [
    '😀', '😂', '🥰', '😎', '🤔', '😢', '😡', '🤯', '🥳',
    '😴', '😇', '😋', '😜', '🤪', '🤓', '🧐', '😱', '😨',
    '😰', '😥', '😓', '🤤', '😪', '😵', '🤠', '😷', '🤒',
    '🤕', '🤑', '🤧', '😈', '👿', '👹', '👺', '💀', '👻',
    '👽', '👾', '🤖', '🎃'
  ];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};
