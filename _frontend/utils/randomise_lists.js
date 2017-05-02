export default function() {
  const toRandomise = document.querySelectorAll('ul.randomise');
  for (const ul of toRandomise) {
    for (let i = 0; i < ul.children.length; i++) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
    }
  }
};
