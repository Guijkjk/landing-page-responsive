'use strict';

// A página é progressiva: a navegação e os contatos funcionam sem JavaScript.
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');
const navigationLinks = [...document.querySelectorAll('.nav-link')];

function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('is-open', !expanded);
});
navigationLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

// Entrada suave de seções e indicação da seção atual.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -50% 0px' });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
}

const progressBar = document.querySelector('.page-progress span');
let scrollScheduled = false;
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollableHeight > 0 ? window.scrollY / scrollableHeight * 100 : 0}%`;
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollScheduled = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// Tecnologias: abas acessíveis por clique e pelas setas do teclado.
const technologies = {
  powerbi: { name: 'Power BI', number: '01', description: 'Meu ponto de encontro com a visualização de dados. Tenho experiência criando dashboards e sigo desenvolvendo a forma de apresentar indicadores com clareza.', topics: ['Dashboards', 'Indicadores', 'Visualização de dados'] },
  javascript: { name: 'JavaScript', number: '02', description: 'Estou aprendendo a dar vida às interfaces com lógica e interatividade. Meu foco é entender os fundamentos e experimentar comportamentos que tornem a navegação mais intuitiva.', topics: ['Lógica de programação', 'DOM', 'Interatividade'] },
  python: { name: 'Python', number: '03', description: 'Estou desenvolvendo minha base em Python e explorando como a linguagem pode apoiar a análise de dados, a organização de informações e a automação de tarefas.', topics: ['Fundamentos', 'Análise de dados', 'Automação'] },
  html: { name: 'HTML', number: '04', description: 'A estrutura é o começo de uma boa experiência. Estou aprendendo a organizar páginas com significado, usando elementos semânticos e atenção à acessibilidade.', topics: ['HTML semântico', 'Estrutura de páginas', 'Acessibilidade'] },
  css: { name: 'CSS', number: '05', description: 'Estou estudando como transformar estrutura em uma experiência visual. Layouts, tipografia e responsividade fazem parte da minha evolução na criação de interfaces.', topics: ['Layouts', 'Responsividade', 'Estilização'] }
};
const techTabs = [...document.querySelectorAll('.tech-tab')];
function selectTechnology(tab) {
  const technology = technologies[tab.dataset.tech];
  techTabs.forEach(button => {
    const selected = button === tab;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document.querySelector('#tech-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#tech-name').textContent = technology.name;
  document.querySelector('#tech-description').textContent = technology.description;
  document.querySelector('.panel-number').textContent = technology.number;
  document.querySelector('#tech-topics').replaceChildren(...technology.topics.map(topic => {
    const item = document.createElement('li');
    item.textContent = topic;
    return item;
  }));
}
techTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTechnology(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % techTabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + techTabs.length) % techTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = techTabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTechnology(techTabs[nextIndex]);
      techTabs[nextIndex].focus();
    }
  });
});

// Dados explicitamente fictícios para a demonstração do painel.
const dashboardData = {
  semestre: { revenue: 186400, growth: '18,4', count: 1248, satisfaction: 96, labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'], values: [21, 25, 24, 34, 37, 45] },
  trimestre: { revenue: 116000, growth: '12,7', count: 782, satisfaction: 97, labels: ['ABR', 'MAI', 'JUN'], values: [34, 37, 45] },
  mes: { revenue: 45000, growth: '21,6', count: 306, satisfaction: 98, labels: ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4'], values: [8, 10, 12, 15] }
};
const periodButtons = [...document.querySelectorAll('[data-period]')];
const svgNS = 'http://www.w3.org/2000/svg';
function updateDashboard(period) {
  const data = dashboardData[period];
  periodButtons.forEach(button => {
    const selected = button.dataset.period === period;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#metric-revenue').textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(data.revenue);
  document.querySelector('#metric-growth').textContent = `+${data.growth}% no período`;
  document.querySelector('#metric-count').textContent = data.count.toLocaleString('pt-BR');
  document.querySelector('#metric-satisfaction').textContent = `${data.satisfaction}%`;
  const points = data.values.map((value, index) => [55 + index * 800 / (data.values.length - 1), 192 - value * 3.4]);
  const line = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ');
  document.querySelector('#chart-line').setAttribute('d', line);
  document.querySelector('#chart-area').setAttribute('d', `${line} V192 H55 Z`);
  const dots = points.map(([x, y]) => {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', x); circle.setAttribute('cy', y); circle.setAttribute('r', 4);
    return circle;
  });
  const labels = points.map(([x], index) => {
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', x); label.setAttribute('y', 218); label.textContent = data.labels[index];
    return label;
  });
  document.querySelector('#chart-dots').replaceChildren(...dots);
  document.querySelector('#chart-labels').replaceChildren(...labels);
  document.querySelector('#chart-desc').textContent = `Receita fictícia em milhares de reais: ${data.labels.map((label, i) => `${label}: ${data.values[i]}`).join('; ')}.`;
}
periodButtons.forEach(button => button.addEventListener('click', () => updateDashboard(button.dataset.period)));
updateDashboard('semestre');

// Copiar contato com retorno acessível. Links diretos seguem funcionando em file://.
document.querySelector('#copy-phone').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('+55 92 98286-1754');
    status.textContent = 'Número copiado!';
  } catch {
    status.textContent = 'Meu número: +55 92 98286-1754';
  }
});
document.querySelector('#current-year').textContent = new Date().getFullYear();
