const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation-links');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(isOpen));
  navigation.classList.toggle('open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();

// Explanatory workflows, not a live system or customer records.
const workflows = {
  reading: {
    steps: [
      ['Scheduled worker', 'Start a reading synchronization job', '↗'],
      ['Metering integration', 'Retrieve readings from the external system', '⇄'],
      ['Application data', 'Synchronize the reading and its timestamp', '≡'],
      ['Operational visibility', 'Surface reading status for follow-up', '✓']
    ],
    insight: 'A missing or delayed reading is an operational state that needs to stay visible.'
  },
  commands: {
    steps: [
      ['Requested operation', 'Receive a connect or disconnect request', '↗'],
      ['Command record', 'Track the requested operation and its status', '≡'],
      ['Metering integration', 'Send the operation to the external system', '⇄'],
      ['Status follow-up', 'Track completion, timeout or failure', '↳']
    ],
    insight: 'A submitted command and a confirmed meter state are different things. Follow-up matters.'
  },
  balance: {
    steps: [
      ['Billing inputs', 'Read the data used by existing financial rules', '≡'],
      ['Business calculations', 'Apply the established balance calculation', '∑'],
      ['Database workflow', 'Support the application’s data access and queries', '⇄'],
      ['Operational output', 'Make balance information available to the application', '✓']
    ],
    insight: 'Performance work must preserve the financial calculation. Correctness comes first.'
  }
};
const flowTabs = [...document.querySelectorAll('[data-flow]')];
const flowPanel = document.getElementById('workflow-content');
function selectFlow(tab) {
  const flow = workflows[tab.dataset.flow];
  flowTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  flowPanel.setAttribute('aria-labelledby', tab.id);
  flowPanel.innerHTML = `<div class="workflow-path">${flow.steps.map(([title, description, symbol], index) => `${index ? '<div class="flow-connector" aria-hidden="true"></div>' : ''}<div class="flow-node ${index === flow.steps.length - 1 ? 'flow-node-last' : ''}"><span class="node-number">0${index + 1}</span><div><strong>${title}</strong><span>${description}</span></div><span class="node-glyph" aria-hidden="true">${symbol}</span></div>`).join('')}</div><div class="flow-insight"><span aria-hidden="true">↳</span><p>${flow.insight}</p></div>`;
}
flowTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFlow(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % flowTabs.length;
    if (event.key === 'ArrowLeft') next = (index + flowTabs.length - 1) % flowTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = flowTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectFlow(flowTabs[next]);
      flowTabs[next].focus();
    }
  });
});

const caseStudies = {
  utility: {
    kicker: '01 / UTILITY SYSTEMS',
    title: 'Automated billing & meter operations',
    role: 'TCee · IT Team Lead & Senior Full Stack .NET Engineer · Oct 2025–Present',
    lead: 'I work on electricity and water utility platforms where .NET applications, financial workflows, databases and external metering systems meet.',
    sections: [
      ['The engineering problem', '<p>Reading synchronization, charging, balances and meter operations span several layers. The application needs to represent what has been requested, what has completed and what needs follow-up, while preserving established billing rules.</p>'],
      ['My responsibilities', '<ul><li>Build and maintain .NET backend services, APIs and database workflows for utility applications.</li><li>Develop scheduled workers, retries and status synchronization for automated-billing operations.</li><li>Support external metering integrations and meter-operation workflows.</li><li>Investigate production issues across the application, database and integration layers.</li></ul>'],
      ['Where the technical work happens', '<p>Background processing coordinates scheduled work. Integration code exchanges information with external metering systems. The application and database layers support financial and operational workflows. Logging and status follow-up help trace what happened when a job or command needs investigation.</p>'],
      ['What this work demonstrates', '<p>Experience delivering across the backend, data-access and operational layers of a domain with complex business rules. The workflow on the page is a conceptual explanation of these responsibilities, not a production screenshot.</p>']
    ],
    takeaway: 'Reliable operations need an explicit path for missing data, timeouts and failed integrations.',
    stack: ['C# / .NET', 'Background workers', 'Oracle', 'SQL Server', 'REST integrations']
  },
  performance: {
    kicker: '02 / DATA & PERFORMANCE',
    title: 'Query performance in financial workflows',
    role: 'Utility, HR and inventory applications · Database and data-access work',
    lead: 'My performance work includes investigating data-access bottlenecks and complex queries in systems where a faster response must still return the correct business result.',
    sections: [
      ['The engineering problem', '<p>Operational screens and financial workflows can depend on complex joins and calculations. A performance change has to be assessed alongside the rules and results that the application already relies on.</p>'],
      ['My responsibilities', '<ul><li>Analyze SQL Server execution plans and investigate query behavior.</li><li>Review joins, indexing and relational data access when tracing bottlenecks.</li><li>Tune queries used by utility, automated-billing, HR and inventory workflows.</li><li>Troubleshoot database issues together with the surrounding .NET application.</li></ul>'],
      ['The constraint that guides the work', '<p>Preserve established financial and operational business rules. Query performance is part of the problem; changes also need to be checked against the application’s expected results and behavior.</p>'],
      ['What this work demonstrates', '<p>Hands-on database investigation alongside application development, including the ability to follow a slow request across API, data-access and query boundaries.</p>']
    ],
    takeaway: 'The right optimization makes an existing workflow more efficient without changing what its numbers mean.',
    stack: ['SQL Server', 'Oracle', 'Execution plans', 'Query tuning', 'Indexing', '.NET data access']
  },
  architecture: {
    kicker: '03 / ARCHITECTURE & DEVELOPER GUIDANCE',
    title: 'Application structure the team can maintain',
    role: 'IDEAL Software Design · Full Stack Developer & Technical Lead · Mar 2023–Oct 2025',
    lead: 'At IDEAL, I designed an Islamic platform’s application architecture and helped developers translate the structure into day-to-day backend implementation.',
    sections: [
      ['The engineering problem', '<p>A layered application needs clear responsibilities and implementation patterns that developers can apply consistently. Architecture choices affect code organization, service boundaries, data access and how the team makes changes.</p>'],
      ['My responsibilities', '<ul><li>Design the application architecture and guide separation of concerns.</li><li>Help developers reason about dependency injection and service lifetimes.</li><li>Guide DbContext scoping and usage in the backend.</li><li>Review implementations and mentor developers on maintainable patterns.</li><li>Create reusable Razor administration foundations and project templates for business applications.</li></ul>'],
      ['Teaching as part of delivery', '<p>I designed and delivered a six-month backend training program covering C#, OOP, SOLID, MVC, Web API, Entity Framework, LINQ, authentication and authorization. This complemented hands-on code reviews and developer guidance.</p>'],
      ['What this work demonstrates', '<p>Experience combining architecture and implementation with the practical work of helping a team understand and maintain the software it builds.</p>']
    ],
    takeaway: 'A useful architecture shows up in everyday implementation decisions, not only in a diagram.',
    stack: ['ASP.NET', 'Entity Framework', 'SOLID', 'Dependency injection', 'Code reviews', 'Technical training']
  }
};
const dialog = document.getElementById('case-dialog');
const dialogBody = document.getElementById('dialog-body');
let lastTrigger;
document.querySelectorAll('[data-case]').forEach(button => {
  button.addEventListener('click', () => {
    const study = caseStudies[button.dataset.case];
    lastTrigger = button;
    document.getElementById('dialog-kicker').textContent = study.kicker;
    dialogBody.innerHTML = `<h2 id="dialog-title">${study.title}</h2><p class="dialog-role">${study.role}</p><p class="dialog-lead">${study.lead}</p><div class="tags">${study.stack.map(item => `<span>${item}</span>`).join('')}</div>${study.sections.map(([heading, text]) => `<section class="dialog-section"><h3>${heading}</h3>${text}</section>`).join('')}<div class="dialog-highlight"><span class="small-label">ENGINEERING TAKEAWAY</span><p>${study.takeaway}</p></div>`;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastTrigger) lastTrigger.focus();
});
