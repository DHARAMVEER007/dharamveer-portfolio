// JavaScript Interactivity for Dharamveer Singh Portfolio Landing Page

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSkillFilters();
  initScrollSpy();
  initModalListeners();
});

/* -------------------------------------------------------------
 * Theme Toggle (Dark / Light Mode)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  // Check persisted theme or OS preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  const toggleHandler = () => {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      showToast('Theme Changed', 'Switched to Dark Mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      showToast('Theme Changed', 'Switched to Light Mode');
    }
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleHandler);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleHandler);
}

/* -------------------------------------------------------------
 * Mobile Navigation Drawer
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });
}

/* -------------------------------------------------------------
 * Skills Category Filter
 * ------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * Copy to Clipboard with Toast Notification
 * ------------------------------------------------------------- */
function copyToClipboard(text, label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to Clipboard!', `${label}: ${text}`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Copied to Clipboard!', `${label}: ${text}`);
  } catch (err) {
    showToast('Copy Failed', 'Please select and copy manually');
  }
  document.body.removeChild(textArea);
}

function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

/* -------------------------------------------------------------
 * Project Architectural Modal
 * ------------------------------------------------------------- */
const projectDetailsData = {
  'quickbites': {
    title: 'QuickBites — Seamless Food Delivery Web Application',
    tagline: 'Production-ready full-stack online ordering platform',
    badges: ['Java Servlets', 'JSP', 'MySQL', 'JDBC', 'MVC Architecture', 'Responsive UI'],
    overview: 'QuickBites is an end-to-end food ordering and delivery management system architected using the Model-View-Controller (MVC) design pattern. It delivers secure multi-role access control, dynamic catalogue rendering, and live state updates for orders.',
    sections: [
      {
        heading: 'Architecture & System Design',
        content: 'Clear separation of concerns: Views handled by responsive JSP/HTML5/CSS templates; Controllers implemented via robust Java Servlets routing incoming requests; and Models backed by MySQL database with optimized JDBC connection pools.'
      },
      {
        heading: 'Core Features & Pipelines',
        bullets: [
          'User Authentication & Roles: Multi-tier security allowing separate portals for Customers, Restaurant Owners, and Delivery Drivers.',
          'Food Menu Engine: Restaurant admins can dynamically create, edit, activate/deactivate food categories and items with high-res photos and variable pricing.',
          'Cart & Checkout Flow: Session-persistent shopping carts, coupon application, order submission with transactional integrity.',
          'Real-time Tracking: Visual order status state machine (Order Received → In the Kitchen → Out for Delivery → Delivered).'
        ]
      },
      {
        heading: 'Engineering Highlights & Key Takeaways',
        bullets: [
          'Robust relational database schema design with normalized tables for Users, Restaurants, MenuItems, Orders, and OrderItems.',
          'Prevention of SQL injections using PreparedStatement query parameterization across all DAO classes.',
          'Responsive front-end experience built with vanilla JavaScript, modern CSS Grid/Flexbox, and asynchronous DOM updates.'
        ]
      }
    ]
  },
  'auth-suite': {
    title: 'Enterprise Microservices & REST API Suite',
    tagline: 'High-throughput distributed backend services & security pipeline',
    badges: ['Spring Boot', 'Spring Security', 'JWT Auth', 'RESTful APIs', 'Microservices'],
    overview: 'A robust microservices architecture demonstrating enterprise-grade security, stateless authentication using JSON Web Tokens (JWT), role-based authorization (RBAC), and centralized API gateway proxying.',
    sections: [
      {
        heading: 'Security Architecture',
        bullets: [
          'Configured Spring Security filters for intercepting and validating JWT bearer tokens.',
          'Fine-grained Method Security using @PreAuthorize annotations to safeguard critical enterprise endpoints.',
          'Bcrypt password hashing with salting and brute-force protection.'
        ]
      },
      {
        heading: 'Service Orchestration & Resilience',
        bullets: [
          'Modular decoupling of domain services communicating via high-performance RESTful APIs.',
          'Standardized global exception handling with structured RFC 7807 problem details payloads.',
          'Centralized request logging and correlation IDs for distributed tracing.'
        ]
      }
    ]
  },
  'db-engine': {
    title: 'Optimized JDBC & SQL Persistence Engine',
    tagline: 'High-efficiency database abstraction and query optimization pipeline',
    badges: ['MySQL', 'SQL Optimization', 'JDBC', 'HikariCP', 'Data Structures'],
    overview: 'A high-performance persistence engine built on MySQL and Java JDBC, engineered to minimize query latency, maximize connection throughput, and ensure ACID transactional guarantees under concurrent workloads.',
    sections: [
      {
        heading: 'Performance & Connection Optimization',
        bullets: [
          'Implemented HikariCP connection pooling to achieve sub-millisecond connection checkout times.',
          'Analyzed query execution plans using EXPLAIN and created composite B-Tree indexes on high-cardinality foreign keys.',
          'Batch processing for bulk inserts and updates, slashing database roundtrips by up to 80%.'
        ]
      },
      {
        heading: 'Database Integrity & Best Practices',
        bullets: [
          'Strict foreign key cascading rules and schema constraints ensuring referential integrity.',
          'Automated database migrations and schema version management.',
          'Adherence to strict HackerRank-certified SQL intermediate optimization guidelines.'
        ]
      }
    ]
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const data = projectDetailsData[projectId];

  if (!modal || !modalContent || !data) return;

  let badgesHtml = data.badges.map(b => `<span class="tech-chip">${b}</span>`).join(' ');
  
  let sectionsHtml = data.sections.map(sec => {
    let bulletsHtml = '';
    if (sec.bullets) {
      bulletsHtml = `<ul class="space-y-2 mt-2">
        ${sec.bullets.map(b => `
          <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
            <i class="fa-solid fa-check text-indigo-400 mt-1 shrink-0"></i>
            <span>${b}</span>
          </li>
        `).join('')}
      </ul>`;
    }
    return `
      <div class="mb-6">
        <h4 class="font-display font-bold text-base text-white mb-1.5 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          ${sec.heading}
        </h4>
        ${sec.content ? `<p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${sec.content}</p>` : ''}
        ${bulletsHtml}
      </div>
    `;
  }).join('');

  modalContent.innerHTML = `
    <div class="mb-6 pr-8">
      <span class="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider block mb-1">Architecture Specification</span>
      <h3 class="font-display font-bold text-2xl text-white mb-2">${data.title}</h3>
      <p class="text-sm text-slate-400 mb-4">${data.tagline}</p>
      <div class="flex flex-wrap gap-2 mb-4">${badgesHtml}</div>
    </div>

    <div class="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
      ${data.overview}
    </div>

    <div class="border-t border-white/10 pt-6">
      ${sectionsHtml}
    </div>

    <div class="pt-4 border-t border-white/10 flex items-center justify-between">
      <a href="https://www.linkedin.com/in/dharamveersinghhere/" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5">
        <i class="fa-brands fa-linkedin"></i>
        <span>Discuss on LinkedIn</span>
      </a>
      <button onclick="closeProjectModal()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors">
        Close Window
      </button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

/* -------------------------------------------------------------
 * Contact Form Simulation
 * ------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successBox = document.getElementById('form-success');
  const nameVal = document.getElementById('name').value;

  if (!form || !submitBtn || !successBox) return;

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <i class="fa-solid fa-circle-notch fa-spin text-sm"></i>
    <span>Sending message...</span>
  `;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    form.reset();
    successBox.classList.remove('hidden');
    showToast('Message Dispatched', `Thank you ${nameVal}, your message has been sent to Dharamveer.`);

    setTimeout(() => {
      successBox.classList.add('hidden');
    }, 6000);
  }, 1200);
}

/* -------------------------------------------------------------
 * Active Nav Highlighting (ScrollSpy)
 * ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-nav');
      }
    });
  });
}
