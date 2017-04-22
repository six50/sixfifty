export default function() {
  const toRandomise = document.querySelectorAll('ul.randomise');
  for (const ul of toRandomise) {
    for (let i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
    }
  }
};
