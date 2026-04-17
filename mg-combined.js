(function() {
  /* ══════════════════════════════════════════════════════════════
     mg-combined.js v1.0.0 — Mentorship Guide page injection.
     Strategy: hide Webflow's native V2 Nav Light + Footer V2 (the
     Mentor Guide HTML ships with its own self-contained chrome), then
     inject the entire Mentorship Guide HTML/CSS into a scoped #mg-root.
     All CSS is scoped with --mg- prefix variables and #mg-root selectors.
     Source HTML: tparis7/Mentorship-Guide/index.html
     GitHub reference: https://tparis7.github.io/Mentorship-Guide/
     ══════════════════════════════════════════════════════════════ */

  // Guard against double execution
  if (document.getElementById('mg-root')) return;

  // ═══ 0. CANCEL WEBFLOW IX2 BODY ANIMATION ═══
  function cancelBodyAnimations() {
    if (document.body && document.body.getAnimations) {
      document.body.getAnimations().forEach(function(a) { a.cancel(); });
    }
    if (document.body) document.body.style.setProperty('opacity', '1', 'important');
  }
  cancelBodyAnimations();
  document.addEventListener('DOMContentLoaded', cancelBodyAnimations);
  window.addEventListener('load', cancelBodyAnimations);
  setTimeout(cancelBodyAnimations, 100);
  setTimeout(cancelBodyAnimations, 500);
  setTimeout(cancelBodyAnimations, 1500);

  // ═══ 1. ASSET URLS (Webflow-hosted brand assets) ═══
  var LOGO = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b04a49d86c8d9ea145304a_p3-logo-horizontal.png';
  var HERO_VIDEO = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7%2F69b04a6712d5fdbe9b4e51f8_p3-hero-bg_mp4.mp4';
  var IPHONE_MOCKUP = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b04a4965cafd702dffba43_iphone-mockup-v2.png';

  // ═══ 2. INJECT CSS — scoped to #mg-root with --mg- prefix ═══
  var style = document.createElement('style');
  style.setAttribute('data-mg-css', '1');
  style.innerHTML = `
/* ─── Root vars (scoped) ─── */
#mg-root {
  --mg-crimson: #D93A3A;
  --mg-maroon: #6B1D1D;
  --mg-dark: #1a1a2e;
  --mg-dark2: #16213e;
  --mg-white: #ffffff;
  --mg-gray-50: #f8f9fa;
  --mg-gray-100: #f0f1f3;
  --mg-gray-200: #e2e4e8;
  --mg-gray-300: #c5c8ce;
  --mg-gray-600: #6b7280;
  --mg-gray-700: #4a4a5a;
  --mg-warm-bg: #fdf8f6;
  --mg-blue-link: #2563eb;
  --mg-accent-gold: #f59e0b;
  --mg-cream-bg: #f5f0eb;
  --mg-shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --mg-shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --mg-shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --mg-radius: 12px;
  --mg-radius-lg: 16px;
  --mg-transition: 0.25s ease;
}

/* ─── Hide Webflow native chrome while Mentor Guide is active ─── */
body.mg-active { background: var(--mg-white); margin: 0; padding: 0; opacity: 1 !important; overflow-x: hidden; }
body.mg-active > *:not(#mg-root):not(.mg-modal-overlay):not(script):not(style):not(link):not(noscript):not([data-mg-keep]) { display: none !important; }
html.mg-active { scroll-behavior: smooth; scroll-padding-top: 72px; }

/* ─── Universal reset inside #mg-root ─── */
#mg-root *, #mg-root *::before, #mg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
#mg-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: var(--mg-dark); background: var(--mg-white); line-height: 1.6; -webkit-font-smoothing: antialiased; }
#mg-root img, #mg-root svg, #mg-root video { max-width: 100%; height: auto; display: block; }
#mg-root a { color: inherit; text-decoration: none; }
#mg-root button { font-family: inherit; }
#mg-root ul { list-style: none; }

/* ─── NAV ─── */
#mg-root .nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--mg-gray-200); padding: 0 20px; }
#mg-root .nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 64px; }
#mg-root .nav-logo { height: 36px; width: auto; }
#mg-root .nav-links { display: flex; gap: 6px; align-items: center; }
#mg-root .nav-links a { text-decoration: none; color: var(--mg-gray-700); font-size: 14px; font-weight: 500; padding: 6px 12px; border-radius: 8px; transition: var(--mg-transition); }
#mg-root .nav-links a:hover, #mg-root .nav-links a.active { color: var(--mg-crimson); background: rgba(217,58,58,0.06); }
#mg-root .hamburger { display: none; background: none; border: none; cursor: pointer; width: 36px; height: 36px; flex-direction: column; justify-content: center; align-items: center; gap: 5px; padding: 0; }
#mg-root .hamburger span { display: block; width: 22px; height: 2px; background: var(--mg-dark); border-radius: 2px; transition: var(--mg-transition); }
#mg-root .mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 24px; z-index: 99; overflow-y: auto; }
#mg-root .mobile-menu.open { display: block; }
#mg-root .mobile-menu a { display: block; padding: 14px 16px; font-size: 16px; font-weight: 500; color: var(--mg-dark); text-decoration: none; border-radius: 10px; border-bottom: 1px solid var(--mg-gray-100); }
#mg-root .mobile-menu a:hover { background: var(--mg-gray-50); color: var(--mg-crimson); }

/* ─── HERO ─── */
#mg-root .hero { position: relative; overflow: hidden; color: var(--mg-white); text-align: center; padding: 64px 20px 56px; min-height: 460px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
#mg-root .hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.55); z-index: 1; }
#mg-root .hero video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
#mg-root .hero-content { position: relative; z-index: 2; }
#mg-root .hero-badge { display: inline-block; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; margin-bottom: 20px; text-transform: uppercase; color: var(--mg-white); }
#mg-root .hero h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 700; margin-bottom: 16px; line-height: 1.15; color: var(--mg-white); }
#mg-root .hero p { font-size: clamp(15px, 2.5vw, 18px); opacity: 0.85; max-width: 600px; margin: 0 auto 28px; color: var(--mg-white); }
#mg-root .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
#mg-root .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none; transition: var(--mg-transition); cursor: pointer; border: none; }
#mg-root .btn-primary { background: var(--mg-white); color: var(--mg-crimson); }
#mg-root .btn-primary:hover { background: var(--mg-gray-100); transform: translateY(-1px); }
#mg-root .btn-outline { background: transparent; color: var(--mg-white); border: 1.5px solid rgba(255,255,255,0.4); }
#mg-root .btn-outline:hover { border-color: var(--mg-white); background: rgba(255,255,255,0.1); }

/* ─── PARTNER TICKER ─── */
#mg-root .partner-ticker { background: var(--mg-maroon); color: var(--mg-white); padding: 14px 20px; overflow: hidden; position: relative; }
#mg-root .ticker-content { display: flex; gap: 40px; align-items: center; animation: mg-scroll 20s linear infinite; white-space: nowrap; }
#mg-root .ticker-item { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; flex-shrink: 0; }
@keyframes mg-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* ─── SECTION ─── */
#mg-root .section { padding: 24px 20px; max-width: 1100px; margin: 0 auto; }
#mg-root .section-alt { background: var(--mg-gray-50); }
#mg-root .section-warm { background: var(--mg-warm-bg); }
#mg-root .section-dark { background: var(--mg-dark); color: var(--mg-white); }
#mg-root .section-dark .section-header h2 { color: var(--mg-white); }
#mg-root .section-dark .section-header p { color: rgba(255,255,255,0.7); }
#mg-root .section-dark .section-label { color: #ef4444; }
#mg-root .section-convo { background: #2d2d3a; color: var(--mg-white); }
#mg-root .section-convo .section-header h2 { color: var(--mg-white); }
#mg-root .section-convo .section-header p { color: rgba(255,255,255,0.7); }
#mg-root .section-convo .section-label { color: #ef4444; }
#mg-root .section-convo .topic-item { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.92); border-color: rgba(255,255,255,0.08); }
#mg-root .section-convo .phase-badge.phase-1 { background: rgba(59,130,246,0.2); color: #93c5fd; }
#mg-root .section-convo .phase-badge.phase-2 { background: rgba(16,185,129,0.2); color: #6ee7b7; }
#mg-root .section-convo .phase-badge.phase-3 { background: rgba(245,158,11,0.2); color: #fcd34d; }
#mg-root .section-convo .topic-item.phase-1 { border-left-color: #60a5fa; }
#mg-root .section-convo .topic-item.phase-2 { border-left-color: #34d399; }
#mg-root .section-convo .topic-item.phase-3 { border-left-color: #fbbf24; }
#mg-root .section-maroon { background: linear-gradient(135deg, var(--mg-maroon) 0%, #3d1111 100%); color: var(--mg-white); }
#mg-root .section-maroon .section-header h2 { color: var(--mg-white); }
#mg-root .section-maroon .section-header p { color: rgba(255,255,255,0.7); }
#mg-root .section-maroon .section-label { color: #fca5a5; }
#mg-root .section-maroon .card { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); color: var(--mg-white); }
#mg-root .section-maroon .card p { color: rgba(255,255,255,0.7); }
#mg-root .section-header { text-align: center; margin-bottom: 16px; }
#mg-root .section-header h2 { font-size: clamp(22px, 4vw, 30px); font-weight: 700; color: var(--mg-dark); margin-bottom: 4px; }
#mg-root .section-header p { color: var(--mg-gray-600); font-size: 14px; max-width: 600px; margin: 0 auto; }
#mg-root .section-label { display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--mg-crimson); margin-bottom: 8px; }

/* ─── WELCOME LAYOUT ─── */
#mg-root .welcome-layout { display: grid; grid-template-columns: 1fr 280px; gap: 24px; align-items: center; margin-bottom: 12px; }
#mg-root .welcome-layout img.app-mockup { width: 100%; height: auto; border-radius: 12px; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.15)); }

/* ─── CARDS ─── */
#mg-root .card-grid { display: grid; gap: 12px; }
#mg-root .card-grid-2 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
#mg-root .card-grid-3 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
#mg-root .card-grid-4 { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
#mg-root .card { background: var(--mg-white); border-radius: var(--mg-radius); padding: 12px; border: 1px solid var(--mg-gray-200); transition: var(--mg-transition); cursor: default; }
#mg-root .card:hover { box-shadow: var(--mg-shadow-md); border-color: var(--mg-gray-300); }
#mg-root .card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 8px; }
#mg-root .card h3 { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
#mg-root .card p { font-size: 13px; color: var(--mg-gray-600); line-height: 1.4; }
#mg-root .card ul { margin: 0; padding-left: 16px; list-style: disc; }
#mg-root .card li { font-size: 13px; color: var(--mg-gray-700); margin-bottom: 3px; line-height: 1.4; }

/* ─── SCREENS GRID ─── */
#mg-root .screens-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
#mg-root .screen-card { background: var(--mg-white); border: 1px solid var(--mg-gray-200); border-radius: var(--mg-radius); padding: 16px; text-align: center; transition: var(--mg-transition); }
#mg-root .screen-card:hover { box-shadow: var(--mg-shadow-md); border-color: var(--mg-crimson); }
#mg-root .screen-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
#mg-root .screen-preview { border-radius: 10px; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 140px; margin-bottom: 8px; }
#mg-root .screen-card h4 { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
#mg-root .screen-card p { font-size: 11px; color: var(--mg-gray-600); }

/* ─── STEPS ─── */
#mg-root .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; counter-reset: step; }
#mg-root .step { text-align: center; position: relative; counter-increment: step; }
#mg-root .step-num { width: 44px; height: 44px; border-radius: 50%; background: var(--mg-crimson); color: var(--mg-white); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; margin: 0 auto 14px; }
#mg-root .step-num::before { content: counter(step); }
#mg-root .step h4 { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
#mg-root .step p { font-size: 13px; color: var(--mg-gray-600); }

/* ─── TIMELINE ─── */
#mg-root .timeline-h { display: flex; align-items: flex-start; justify-content: center; gap: 0; margin: 0 auto; max-width: 900px; }
#mg-root .tl-step { display: flex; flex-direction: column; align-items: center; text-align: center; flex: 0 0 auto; width: 140px; }
#mg-root .tl-dot { width: 48px; height: 48px; border-radius: 50%; background: var(--mg-crimson); color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 3px 12px rgba(217,58,58,0.3); }
#mg-root .tl-label { margin-top: 10px; }
#mg-root .tl-label strong { display: block; font-size: 13px; margin-bottom: 2px; }
#mg-root .tl-label span { display: block; font-size: 11px; color: var(--mg-gray-600); line-height: 1.3; }
#mg-root .tl-label em { display: block; font-size: 10px; color: var(--mg-crimson); font-weight: 600; font-style: normal; margin-top: 3px; }
#mg-root .tl-line { flex: 1; height: 3px; background: linear-gradient(90deg, var(--mg-crimson), var(--mg-maroon)); border-radius: 2px; margin-top: 23px; min-width: 30px; }

/* ─── ACCORDION ─── */
#mg-root .accordion { max-width: 760px; margin: 0 auto; }
#mg-root .accordion-item { border: 1px solid var(--mg-gray-200); border-radius: var(--mg-radius); margin-bottom: 6px; overflow: hidden; background: var(--mg-white); }
#mg-root .accordion-btn { width: 100%; background: none; border: none; cursor: pointer; padding: 14px 16px; text-align: left; font-size: 15px; font-weight: 600; color: var(--mg-dark); display: flex; justify-content: space-between; align-items: center; }
#mg-root .accordion-btn::after { content: '+'; font-size: 20px; font-weight: 300; color: var(--mg-gray-600); transition: var(--mg-transition); }
#mg-root .accordion-item.open .accordion-btn::after { content: '−'; color: var(--mg-crimson); }
#mg-root .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; padding: 0 20px; }
#mg-root .accordion-item.open .accordion-content { max-height: 600px; padding-bottom: 18px; }
#mg-root .accordion-content p { font-size: 14px; color: var(--mg-gray-600); line-height: 1.65; }

/* ─── PHASES / TOPICS ─── */
#mg-root .phase-badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
#mg-root .phase-1 { background: #dbeafe; color: #1e40af; }
#mg-root .phase-2 { background: #d1fae5; color: #065f46; }
#mg-root .phase-3 { background: #fef3c7; color: #92400e; }
#mg-root .topic-list { list-style: none; padding: 0; display: grid; gap: 8px; }
#mg-root .topic-item { padding: 12px 14px; border-left: 4px solid; background: var(--mg-white); border-radius: 0 8px 8px 0; font-size: 14px; border: 1px solid var(--mg-gray-200); border-left: 4px solid; }
#mg-root .topic-item.phase-1 { border-left-color: #3b82f6; }
#mg-root .topic-item.phase-2 { border-left-color: #10b981; }
#mg-root .topic-item.phase-3 { border-left-color: #f59e0b; }
#mg-root .section-dark .topic-item { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }
#mg-root .section-dark .phase-badge.phase-1 { background: rgba(59,130,246,0.2); color: #93c5fd; }
#mg-root .section-dark .phase-badge.phase-2 { background: rgba(16,185,129,0.2); color: #6ee7b7; }
#mg-root .section-dark .phase-badge.phase-3 { background: rgba(245,158,11,0.2); color: #fcd34d; }
#mg-root .section-dark .topic-item.phase-1 { border-left-color: #60a5fa; }
#mg-root .section-dark .topic-item.phase-2 { border-left-color: #34d399; }
#mg-root .section-dark .topic-item.phase-3 { border-left-color: #fbbf24; }

/* ─── TABS ─── */
#mg-root .tabs { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 24px; justify-content: center; }
#mg-root .tab-btn { padding: 10px 18px; border-radius: 8px; border: 1.5px solid var(--mg-gray-200); background: var(--mg-white); font-size: 13px; font-weight: 500; cursor: pointer; transition: var(--mg-transition); color: var(--mg-gray-700); }
#mg-root .tab-btn:hover { border-color: var(--mg-crimson); color: var(--mg-crimson); }
#mg-root .tab-btn.active { background: var(--mg-crimson); color: var(--mg-white); border-color: var(--mg-crimson); }
#mg-root .tab-panel { display: none; }
#mg-root .tab-panel.active { display: block; }

/* ─── MENTEE QUESTIONS ─── */
#mg-root .mq-categories-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
#mg-root .mq-category-card { background: var(--mg-white); border: 2px solid var(--mg-gray-200); border-radius: var(--mg-radius); padding: 10px 10px 12px; cursor: pointer; transition: var(--mg-transition); text-align: center; position: relative; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
#mg-root .mq-category-card:hover { border-color: var(--mg-crimson); box-shadow: var(--mg-shadow-md); transform: translateY(-2px); }
#mg-root .mq-category-card.active { border-color: var(--mg-crimson); background: rgba(217,58,58,0.03); }
#mg-root .mq-cat-icon { width: 100%; height: auto; max-height: 120px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 8px; }
#mg-root .mq-cat-name { font-size: 12px; font-weight: 700; color: var(--mg-dark); line-height: 1.2; display: block; }
#mg-root .mq-questions-panel { display: none; background: var(--mg-gray-50); border-radius: var(--mg-radius); padding: 12px; }
#mg-root .mq-questions-panel.active { display: block; }
#mg-root .mq-questions-list { list-style: none; padding: 0; display: grid; gap: 4px; }
#mg-root .mq-question-item { background: var(--mg-white); padding: 6px 10px; border-left: 3px solid var(--mg-crimson); border-radius: 0 6px 6px 0; font-size: 13px; color: var(--mg-gray-700); line-height: 1.3; }

/* ─── PATHWAYS ─── */
#mg-root .pathway-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
#mg-root .pathway-card { background: var(--mg-white); border: 1px solid var(--mg-gray-200); border-radius: var(--mg-radius); padding: 16px; cursor: pointer; transition: var(--mg-transition); position: relative; overflow: hidden; }
#mg-root .pathway-card:hover { box-shadow: var(--mg-shadow-md); transform: translateY(-2px); border-color: var(--mg-crimson); }
#mg-root .pathway-card .pw-icon { font-size: 24px; margin-bottom: 6px; display: block; }
#mg-root .pathway-card h3 { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
#mg-root .pathway-card p { font-size: 13px; color: var(--mg-gray-600); }
#mg-root .pathway-card .pw-arrow { position: absolute; top: 24px; right: 20px; font-size: 18px; color: var(--mg-gray-300); transition: var(--mg-transition); }
#mg-root .pathway-card:hover .pw-arrow { color: var(--mg-crimson); transform: translateX(3px); }

/* ─── MODAL (body-level overlay) ─── */
.mg-modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 200; justify-content: center; align-items: flex-start; padding: 20px; overflow-y: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
.mg-modal-overlay.open { display: flex; }
.mg-modal-overlay * { box-sizing: border-box; }
.mg-modal-overlay .mg-modal { background: #fff; border-radius: 16px; max-width: 720px; width: 100%; margin: 40px auto; max-height: calc(100vh - 80px); overflow-y: auto; box-shadow: 0 8px 30px rgba(0,0,0,0.12); position: relative; }
.mg-modal-overlay .mg-modal-header { position: sticky; top: 0; background: #fff; padding: 20px 24px 16px; border-bottom: 1px solid #f0f1f3; display: flex; justify-content: space-between; align-items: center; z-index: 1; }
.mg-modal-overlay .mg-modal-header h2 { font-size: 20px; font-weight: 700; margin: 0; color: #1a1a2e; }
.mg-modal-overlay .mg-modal-close { width: 36px; height: 36px; border-radius: 50%; border: none; background: #f0f1f3; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: 0.25s ease; color: #1a1a2e; }
.mg-modal-overlay .mg-modal-close:hover { background: #e2e4e8; }
.mg-modal-overlay .mg-modal-body { padding: 24px; color: #1a1a2e; }
.mg-modal-overlay .mg-modal-body h3 { font-size: 16px; font-weight: 600; margin: 24px 0 10px; color: #D93A3A; }
.mg-modal-overlay .mg-modal-body h3:first-child { margin-top: 0; }
.mg-modal-overlay .mg-modal-body p { font-size: 14px; color: #4a4a5a; margin-bottom: 12px; line-height: 1.6; }
.mg-modal-overlay .mg-modal-body ul { padding-left: 20px; margin-bottom: 12px; list-style: disc; }
.mg-modal-overlay .mg-modal-body li { font-size: 14px; color: #4a4a5a; margin-bottom: 6px; }
.mg-modal-overlay .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
@media (max-width: 500px) { .mg-modal-overlay .info-grid { grid-template-columns: 1fr; } }
.mg-modal-overlay .info-box { background: #f8f9fa; border-radius: 10px; padding: 16px; border: 1px solid #f0f1f3; }
.mg-modal-overlay .info-box h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px; }
.mg-modal-overlay .info-box li { font-size: 13px; margin-bottom: 4px; }
.mg-modal-overlay .salary-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 14px; }
.mg-modal-overlay .salary-table td { padding: 8px 12px; border-bottom: 1px solid #f0f1f3; }
.mg-modal-overlay .salary-table td:first-child { font-weight: 500; color: #6b7280; }
.mg-modal-overlay .salary-table td:last-child { font-weight: 600; }
.mg-modal-overlay .reflection-list, .mg-modal-overlay .discussion-list { list-style: none; padding: 0; }
.mg-modal-overlay .reflection-list li, .mg-modal-overlay .discussion-list li { padding: 10px 14px; font-size: 14px; border-left: 3px solid #D93A3A; background: #f8f9fa; margin-bottom: 6px; border-radius: 0 8px 8px 0; }
.mg-modal-overlay .discussion-list li { border-left-color: #f59e0b; }

/* ─── RESOURCE FILTERS ─── */
#mg-root .resource-filters { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; align-items: center; }
#mg-root .filter-industry { flex: 1; min-width: 200px; max-width: 100%; }
#mg-root .filter-industry select { width: 100%; padding: 8px 12px; border: 1.5px solid var(--mg-gray-200); border-radius: 8px; font-size: 14px; cursor: pointer; background: var(--mg-white); color: var(--mg-dark); transition: var(--mg-transition); font-family: inherit; }
#mg-root .filter-industry select:hover, #mg-root .filter-industry select:focus { border-color: var(--mg-crimson); outline: none; }
#mg-root .filter-type { display: flex; gap: 6px; flex-wrap: nowrap; flex: 1; }
#mg-root .filter-btn { padding: 6px 14px; border-radius: 20px; border: 1.5px solid var(--mg-gray-200); background: var(--mg-white); font-size: 12px; font-weight: 500; cursor: pointer; transition: var(--mg-transition); color: var(--mg-dark); }
#mg-root .filter-btn:hover { border-color: var(--mg-crimson); color: var(--mg-crimson); }
#mg-root .filter-btn.active { background: var(--mg-crimson); color: var(--mg-white); border-color: var(--mg-crimson); }
#mg-root .resource-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px; }
#mg-root .resource-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--mg-white); border: 1px solid var(--mg-gray-200); border-radius: 10px; transition: var(--mg-transition); text-decoration: none; color: var(--mg-dark); }
#mg-root .resource-item:hover { border-color: var(--mg-crimson); box-shadow: var(--mg-shadow-sm); }
#mg-root .resource-type-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
#mg-root .resource-type-icon.book { background: #ede9fe; }
#mg-root .resource-type-icon.web { background: #dbeafe; }
#mg-root .resource-type-icon.course { background: #d1fae5; }
#mg-root .resource-type-icon.tutorial { background: #fef3c7; }
#mg-root .resource-type-icon.cert { background: #fce7f3; }
#mg-root .resource-info h4 { font-size: 14px; font-weight: 500; line-height: 1.3; }
#mg-root .resource-info span { font-size: 11px; color: var(--mg-gray-600); text-transform: uppercase; letter-spacing: 0.5px; }
#mg-root .resource-count { text-align: center; color: var(--mg-gray-600); font-size: 14px; margin-top: 10px; }

/* ─── ADDL TABLE ─── */
#mg-root .addl-table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: var(--mg-radius); overflow: hidden; border: 1px solid var(--mg-gray-200); }
#mg-root .addl-table th { background: var(--mg-dark); color: var(--mg-white); padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; }
#mg-root .addl-table td { padding: 12px 16px; border-bottom: 1px solid var(--mg-gray-100); font-size: 14px; }
#mg-root .addl-table tr:last-child td { border-bottom: none; }
#mg-root .addl-table a { color: var(--mg-blue-link); text-decoration: none; }
#mg-root .addl-table a:hover { text-decoration: underline; }
#mg-root .section-maroon .addl-table { border-color: rgba(255,255,255,0.15); }
#mg-root .section-maroon .addl-table th { background: rgba(0,0,0,0.3); }
#mg-root .section-maroon .addl-table td { border-bottom-color: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); }
#mg-root .section-maroon .addl-table a { color: #fca5a5; }

/* ─── FOOTER ─── */
#mg-root .footer { background: var(--mg-dark); color: rgba(255,255,255,0.7); padding: 28px 20px 18px; text-align: center; }
#mg-root .footer a { color: var(--mg-crimson); text-decoration: none; }
#mg-root .footer a:hover { color: #ef4444; }
#mg-root .footer-logo { height: 32px; margin: 0 auto 16px; filter: brightness(0) invert(1); }
#mg-root .footer p { font-size: 13px; margin-bottom: 6px; }

/* ─── HELPERS ─── */
#mg-root .text-crimson { color: var(--mg-crimson); }
#mg-root .text-center { text-align: center; }
#mg-root .mt-24 { margin-top: 24px; }
#mg-root .mb-16 { margin-bottom: 16px; }
#mg-root .max-w-800 { max-width: 800px; margin-left: auto; margin-right: auto; }
#mg-root .hidden { display: none !important; }
#mg-root .fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
#mg-root .fade-up.visible { opacity: 1; transform: translateY(0); }

/* ─── MOBILE (≤768px) ─── */
@media (max-width: 768px) {
  #mg-root .nav-links { display: none; }
  #mg-root .hamburger { display: flex; }

  #mg-root .hero { min-height: auto; padding: 36px 16px 28px; }
  #mg-root .hero h1 { font-size: 24px; }
  #mg-root .hero p { font-size: 14px; margin-bottom: 18px; }
  #mg-root .hero-badge { font-size: 11px; padding: 5px 12px; margin-bottom: 14px; }
  #mg-root .btn { padding: 10px 18px; font-size: 13px; }

  #mg-root .section { padding: 20px 16px; }
  #mg-root .section-header { margin-bottom: 12px; }
  #mg-root .section-header h2 { font-size: 20px; }
  #mg-root .section-header p { font-size: 13px; }
  #mg-root .section-label { font-size: 11px; margin-bottom: 4px; }

  #mg-root .welcome-layout { grid-template-columns: 1fr; gap: 16px; }
  #mg-root .welcome-layout .app-mockup { max-width: 220px; margin: 0 auto; display: block; }

  #mg-root .card { padding: 10px; }
  #mg-root .card h3 { font-size: 14px; }
  #mg-root .card p { font-size: 12px; }
  #mg-root .card li { font-size: 12px; }
  #mg-root .card-grid-2 { grid-template-columns: 1fr; gap: 8px; }
  #mg-root .card-grid-3 { grid-template-columns: repeat(3, 1fr); gap: 6px; }
  #mg-root .card-grid-3 .card { padding: 8px 6px; }
  #mg-root .card-grid-3 .card p { font-size: 11px; }
  #mg-root .card-grid-3 .card div[style*="font-size:24px"] { font-size: 20px !important; margin-bottom: 4px !important; }

  #mg-root .screens-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  #mg-root .screen-card { padding: 8px; }
  #mg-root .screen-preview { height: 90px; padding: 12px; }
  #mg-root .screen-preview svg { width: 16px; height: 16px; }
  #mg-root .screen-preview div[style*="width: 36px"] { width: 28px !important; height: 28px !important; }
  #mg-root .screen-preview div[style*="font-size: 10px"] { font-size: 8px !important; }
  #mg-root .screen-card h4 { font-size: 11px; margin-bottom: 1px; }
  #mg-root .screen-card p { font-size: 9px; }

  #mg-root .steps { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  #mg-root .step-num { width: 32px; height: 32px; font-size: 14px; margin-bottom: 6px; }
  #mg-root .step h4 { font-size: 12px; margin-bottom: 2px; }
  #mg-root .step p { font-size: 11px; }

  #mg-root .timeline-h { flex-direction: column; align-items: stretch; gap: 0; padding: 0 16px; max-width: 340px; margin: 0 auto; }
  #mg-root .tl-step { flex-direction: row; width: 100%; gap: 14px; text-align: left; align-items: center; }
  #mg-root .tl-dot { width: 44px; height: 44px; min-width: 44px; font-size: 18px; flex-shrink: 0; }
  #mg-root .tl-label { margin-top: 0; flex: 1; }
  #mg-root .tl-label strong { font-size: 14px; }
  #mg-root .tl-label span { font-size: 12px; }
  #mg-root .tl-label em { font-size: 11px; }
  #mg-root .tl-line { width: 3px; height: 16px; min-width: 3px; margin: 0 0 0 20px; flex: none; }

  #mg-root .topic-list { gap: 5px; }
  #mg-root .topic-item { padding: 8px 10px; font-size: 12px; }
  #mg-root .phase-badge { font-size: 9px; padding: 2px 6px; margin-right: 6px !important; }

  #mg-root .mq-categories-grid { grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 12px; }
  #mg-root .mq-category-card { padding: 6px 4px 8px; }
  #mg-root .mq-cat-icon { max-height: 60px; margin-bottom: 2px !important; }
  #mg-root .mq-cat-name { font-size: 10px; }
  #mg-root .mq-questions-panel { padding: 10px; }
  #mg-root .mq-question-item { padding: 6px 8px; font-size: 12px; }
  #mg-root .mq-questions-list { gap: 3px; }

  #mg-root .pathway-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  #mg-root .pathway-card { padding: 10px; }
  #mg-root .pathway-card .pw-icon { font-size: 20px; margin-bottom: 4px; }
  #mg-root .pathway-card h3 { font-size: 13px; margin-bottom: 2px; }
  #mg-root .pathway-card p { font-size: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  #mg-root .pathway-card .pw-arrow { display: none; }

  .mg-modal-overlay .mg-modal { margin: 8px; max-height: calc(100vh - 16px); border-radius: 10px; }
  .mg-modal-overlay .mg-modal-header { padding: 12px 14px 10px; }
  .mg-modal-overlay .mg-modal-header h2 { font-size: 16px; }
  .mg-modal-overlay .mg-modal-body { padding: 14px; }
  .mg-modal-overlay .mg-modal-body h3 { font-size: 14px; margin: 14px 0 6px; }
  .mg-modal-overlay .mg-modal-body p, .mg-modal-overlay .mg-modal-body li { font-size: 12px; }
  .mg-modal-overlay .info-grid { grid-template-columns: 1fr; gap: 8px; }

  #mg-root .resource-filters { flex-direction: column; align-items: stretch; gap: 6px; margin-bottom: 10px; }
  #mg-root .filter-industry, #mg-root .filter-type { width: 100%; }
  #mg-root .filter-industry select { font-size: 13px; padding: 8px 10px; }
  #mg-root .filter-type { flex-wrap: wrap; gap: 4px; }
  #mg-root .filter-btn { padding: 5px 8px; font-size: 10px; flex: 1; min-width: 0; text-align: center; }
  #mg-root .resource-grid { grid-template-columns: 1fr; gap: 5px; }
  #mg-root .resource-item { padding: 8px 10px; gap: 8px; }
  #mg-root .resource-type-icon { width: 30px; height: 30px; font-size: 14px; border-radius: 8px; }
  #mg-root .resource-info h4 { font-size: 12px; }
  #mg-root .resource-info span { font-size: 10px; }

  #mg-root .addl-table { font-size: 11px; }
  #mg-root .addl-table th, #mg-root .addl-table td { padding: 7px 8px; }

  #mg-root .accordion { max-width: 100%; }
  #mg-root .accordion-item { margin-bottom: 4px; }
  #mg-root .accordion-btn { padding: 12px 14px; font-size: 13px; }
  #mg-root .accordion-content p { font-size: 12px; }

  #mg-root .footer { padding: 24px 16px 16px; }
  #mg-root .footer-logo { height: 26px; margin-bottom: 10px; }
  #mg-root .footer p { font-size: 12px; }

  #mg-root .ticker-content { gap: 20px; animation-duration: 12s; }
  #mg-root .ticker-item { font-size: 11px; }

  #mg-root .max-w-800 { padding: 0; }
}

/* ─── MOBILE SMALL (≤400px) ─── */
@media (max-width: 400px) {
  #mg-root .hero { padding: 28px 12px 20px; }
  #mg-root .hero h1 { font-size: 20px; line-height: 1.2; }
  #mg-root .hero p { font-size: 13px; }
  #mg-root .hero-badge { font-size: 10px; }
  #mg-root .btn { padding: 8px 14px; font-size: 12px; }

  #mg-root .section { padding: 14px 10px; }
  #mg-root .section-header h2 { font-size: 18px; }

  #mg-root .welcome-layout .app-mockup { max-width: 180px; }

  #mg-root .card-grid-3 { grid-template-columns: repeat(2, 1fr); }
  #mg-root .screens-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  #mg-root .screen-preview { height: 70px; padding: 8px; }
  #mg-root .screen-card h4 { font-size: 10px; }

  #mg-root .steps { grid-template-columns: 1fr 1fr; gap: 8px; }
  #mg-root .step-num { width: 28px; height: 28px; font-size: 12px; }
  #mg-root .step h4 { font-size: 11px; }
  #mg-root .step p { font-size: 10px; }

  #mg-root .mq-categories-grid { grid-template-columns: repeat(2, 1fr); gap: 5px; }
  #mg-root .mq-cat-icon { max-height: 50px; }
  #mg-root .mq-cat-name { font-size: 9px; }

  #mg-root .pathway-grid { grid-template-columns: 1fr; gap: 5px; }
  #mg-root .pathway-card { padding: 8px; display: flex; align-items: center; gap: 8px; }
  #mg-root .pathway-card .pw-icon { font-size: 18px; margin-bottom: 0; flex-shrink: 0; }
  #mg-root .pathway-card h3 { font-size: 12px; margin-bottom: 0; }
  #mg-root .pathway-card p { display: none; }

  #mg-root .topic-item { padding: 7px 8px; font-size: 11px; }
  #mg-root .phase-badge { font-size: 8px; padding: 2px 5px; }

  #mg-root .timeline-h { padding: 0 8px; }
  #mg-root .tl-step { gap: 12px; }
  #mg-root .tl-dot { width: 40px; height: 40px; min-width: 40px; font-size: 16px; }
  #mg-root .tl-label strong { font-size: 13px; }
  #mg-root .tl-label span { font-size: 11px; }
  #mg-root .tl-line { margin-left: 18px; }

  #mg-root .accordion-btn { padding: 10px 12px; font-size: 12px; }
  .mg-modal-overlay .mg-modal { margin: 4px; }
  .mg-modal-overlay .mg-modal-body { padding: 12px; }

  #mg-root .filter-btn { font-size: 9px; padding: 4px 6px; }

  #mg-root .addl-table th, #mg-root .addl-table td { padding: 6px 6px; font-size: 10px; }
}
`;
  document.head.appendChild(style);

  // ═══ 3. ACTIVATE BODY + HTML ═══
  document.documentElement.classList.add('mg-active');
  document.body.classList.add('mg-active');

  // ═══ 4. BUILD #mg-root CONTENT ═══
  var root = document.createElement('div');
  root.id = 'mg-root';
  root.innerHTML = `
<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <img src="${LOGO}" alt="P3 Logo" class="nav-logo">
    <div class="nav-links">
      <a href="#welcome">Welcome</a>
      <a href="#getting-started">Get Started</a>
      <a href="#discussion">Topics</a>
      <a href="#pathways">Pathways</a>
      <a href="#mentee-questions">Questions</a>
      <a href="#resources">Learning</a>
      <a href="#faq">FAQ</a>
    </div>
    <button class="hamburger" onclick="mgToggleMenu()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mg-mobileMenu">
  <a href="#welcome" onclick="mgCloseMenu()">Welcome</a>
  <a href="#getting-started" onclick="mgCloseMenu()">Getting Started</a>
  <a href="#discussion" onclick="mgCloseMenu()">Topics</a>
  <a href="#pathways" onclick="mgCloseMenu()">Industry Pathways</a>
  <a href="#mentee-questions" onclick="mgCloseMenu()">Mentee Questions</a>
  <a href="#resources" onclick="mgCloseMenu()">Learning</a>
  <a href="#faq" onclick="mgCloseMenu()">FAQ</a>
</div>

<!-- HERO -->
<section class="hero" id="welcome">
  <video autoplay muted loop playsinline>
    <source src="${HERO_VIDEO}" type="video/mp4">
  </video>
  <div class="hero-content">
    <div class="hero-badge">Mentor Starter Pack</div>
    <h1>Onboarding Handbook to<br>Maximize Your Impact</h1>
    <p>Your roadmap to success as a P3 mentor. Whether this is your first mentoring experience or your fifteenth &mdash; your voice matters here.</p>
    <div class="hero-actions">
      <a href="#getting-started" class="btn btn-primary">Get Started ↓</a>
      <a href="#pathways" class="btn btn-outline">Explore Pathways</a>
    </div>
  </div>
</section>

<!-- PARTNER LOGOS TICKER -->
<div class="partner-ticker">
  <div class="ticker-content">
    <span class="ticker-item">Google</span>
    <span class="ticker-item">NYU</span>
    <span class="ticker-item">Obama Foundation</span>
    <span class="ticker-item">LSU</span>
    <span class="ticker-item">U of Michigan</span>
    <span class="ticker-item">UT Austin</span>
    <span class="ticker-item">Chicago Public Schools</span>
    <span class="ticker-item">UNT</span>
    <span class="ticker-item">Xavier University</span>
    <span class="ticker-item">Lurie Children's</span>
    <span class="ticker-item">Gilead</span>
    <span class="ticker-item">3Advance</span>
    <span class="ticker-item">Chicago State University</span>
    <span class="ticker-item">Langston University</span>
    <span class="ticker-item">100 Black Men</span>
    <span class="ticker-item">MBK Chicago</span>
    <span class="ticker-item">CHAMPS Mentoring</span>
    <span class="ticker-item">Project H.O.O.D.</span>
  </div>
</div>

<!-- MENTORSHIP FOR THE NEXT GENERATION -->
<section class="section" id="welcome-section">
  <div class="section-header">
    <span class="section-label">Welcome</span>
    <h2>Mentorship for the Next Generation</h2>
    <p>The Pulse of Perseverance Project (P3) is a non-profit committed to breaking down barriers for young people by offering mentorship, scholarships, and professional development opportunities.</p>
  </div>

  <div class="fade-up">
    <div class="welcome-layout">
      <div>
        <p style="font-size: 14px; color: var(--mg-gray-700); line-height: 1.5; margin-bottom: 12px;">Welcome to the Pulse of Perseverance Mentorship Community! We are honored to have you join a network of passionate professionals dedicated to helping young people of color access pathways to opportunity. This handbook is your roadmap to success as a P3 mentor whether this is your first mentoring experience or your fifteenth: your voice matters here.</p>
        <p style="font-size: 14px; color: var(--mg-gray-700); line-height: 1.5; margin-bottom: 14px;">Our new mobile app connects students with experienced mentors through an engaging, accessible, and culturally relevant experience. Founded by three Black doctors who personally navigated their own journeys from underserved backgrounds to professional success, P3 ensures that our initiatives don't just serve disadvantaged communities &mdash; they are built, led, and continuously shaped by them.</p>
        <div style="background: linear-gradient(135deg, var(--mg-crimson), var(--mg-maroon)); border-radius: 10px; padding: 14px 16px; color: white; display: flex; gap: 14px; align-items: flex-start;">
          <svg width="38" height="38" viewBox="0 0 100 100" fill="none" style="flex-shrink: 0;">
            <rect x="32" y="12" width="36" height="76" rx="4" stroke="white" stroke-width="6" fill="none"/>
            <circle cx="18" cy="50" r="10" fill="white" opacity="0.9"/>
            <circle cx="12" cy="30" r="5" fill="white" opacity="0.6"/>
            <circle cx="22" cy="72" r="6" fill="white" opacity="0.7"/>
            <circle cx="8" cy="62" r="4" fill="white" opacity="0.5"/>
            <circle cx="60" cy="38" r="7" fill="white" opacity="0.8"/>
            <circle cx="72" cy="55" r="9" fill="white" opacity="0.9"/>
            <circle cx="80" cy="35" r="5" fill="white" opacity="0.6"/>
            <circle cx="88" cy="65" r="7" fill="white" opacity="0.7"/>
            <circle cx="55" cy="65" r="5" fill="white" opacity="0.6"/>
          </svg>
          <div>
          <p style="font-size: 13px; font-weight: 600; margin-bottom: 3px; color: white;">National Mentor Portal</p>
          <p style="font-size: 12px; margin-bottom: 8px; color: rgba(255,255,255,0.85); line-height: 1.4;">View, share, and manage your public mentor profile.</p>
          <a href="https://mentors.pulseofp3.org" target="_blank" rel="noopener" style="display: inline-block; background: white; color: var(--mg-crimson); font-size: 12px; font-weight: 600; padding: 7px 16px; border-radius: 6px; text-decoration: none;">mentors.pulseofp3.org &rarr;</a>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: center;">
        <img src="${IPHONE_MOCKUP}" alt="P3 Mobile App" class="app-mockup">
      </div>
    </div>
  </div>
</section>

<!-- NEW TO MENTORSHIP -->
<div class="section-alt">
  <section class="section">
    <div class="section-header">
      <span class="section-label">For New Mentors</span>
      <h2>New to Mentorship?</h2>
      <p>Mentorship is a trusted relationship in which a more experienced individual provides guidance, knowledge, support, and encouragement.</p>
    </div>
    <div class="max-w-800 fade-up">
      <p style="font-size:15px; color:var(--mg-gray-700); margin-bottom:18px;">Mentees bring energy, insight, and questions. In many cases, you may learn from them as well. Mentorship is about walking alongside someone &mdash; not directing their path, but illuminating it. We honor the lived experience of all mentors. Whether you're an executive or early-career professional, your journey matters.</p>

      <div class="card-grid card-grid-3" style="margin-bottom:16px;">
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">🎤</div>
          <p style="font-size:13px;">Be authentic, not scripted (storytelling)</p>
        </div>
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">💬</div>
          <p style="font-size:13px;">Use clear, jargon-free language</p>
        </div>
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">🤝</div>
          <p style="font-size:13px;">Share real experiences, successes and failures</p>
        </div>
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">🔍</div>
          <p style="font-size:13px;">Offer insight and transparency about your field</p>
        </div>
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">🎬</div>
          <p style="font-size:13px;">Focus each video on one prompt</p>
        </div>
        <div class="card" style="text-align:center; padding:14px 10px;">
          <div style="font-size:24px; margin-bottom:8px;">📣</div>
          <p style="font-size:13px;">Encourage mentees to reach out or reflect</p>
        </div>
      </div>

      <div class="card-grid card-grid-2">
        <div class="card" style="border-top: 3px solid var(--mg-crimson);">
          <h3>Your Responsibilities</h3>
          <ul style="font-size:14px; color:var(--mg-gray-700); padding-left:18px; margin-top:6px;">
            <li>Support their development with feedback and advice</li>
            <li>Respond to mentee questions via the P3 app</li>
            <li>Encourage self-reflection and independence</li>
            <li>Offer insight into your career and field</li>
            <li>Maintain trust and confidentiality</li>
            <li>Add relevant opportunities to keep them engaged</li>
          </ul>
        </div>
        <div class="card" style="border-top: 3px solid var(--mg-accent-gold);">
          <h3>Mentee Responsibilities</h3>
          <ul style="font-size:14px; color:var(--mg-gray-700); padding-left:18px; margin-top:6px;">
            <li>Come prepared with questions and goals</li>
            <li>Accept feedback with openness</li>
            <li>Take ownership of their growth</li>
            <li>Follow through on action steps</li>
            <li>Select &amp; request connections on the P3 app</li>
          </ul>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <h3 style="text-align: center; font-size: 15px; font-weight: 600; margin-bottom: 14px;">Your Engagement Journey</h3>
        <div class="timeline-h">
          <div class="tl-step">
            <div class="tl-dot">📹</div>
            <div class="tl-label"><strong>Record Videos</strong><span>Share your authentic story</span><em>2-4 / month</em></div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-step">
            <div class="tl-dot">💬</div>
            <div class="tl-label"><strong>Answer Questions</strong><span>Direct mentee feedback</span><em>Within 3-5 days</em></div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-step">
            <div class="tl-dot">📝</div>
            <div class="tl-label"><strong>Give Feedback</strong><span>Refine skills &amp; confidence</span><em>Monthly</em></div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-step">
            <div class="tl-dot">🚀</div>
            <div class="tl-label"><strong>Share Opportunities</strong><span>Accelerate access to jobs</span><em>As available</em></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- GETTING STARTED -->
<section class="section" id="getting-started">
  <div class="section-header">
    <span class="section-label">Get Started</span>
    <h2>How Our Mobile App Works</h2>
    <p>The P3 platform is designed to make mentorship easy, engaging, and impactful. Here's how you'll connect with mentees.</p>
  </div>

  <div class="screens-grid">
    <div class="screen-card">
      <div class="screen-preview" style="background: linear-gradient(180deg, #D93A3A 0%, #6B1D1D 40%, #1a1a2e 100%);">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        </div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.9); font-weight: 600; letter-spacing: 0.5px;">MY VIDEOS</div>
        <div style="margin-top: 8px; width: 80%; display: flex; flex-direction: column; gap: 4px;">
          <div style="height: 6px; background: rgba(255,255,255,0.15); border-radius: 3px;"></div>
          <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; width: 60%;"></div>
        </div>
      </div>
      <h4>Share</h4>
      <p>Record mentor videos</p>
    </div>
    <div class="screen-card">
      <div class="screen-preview" style="background: linear-gradient(180deg, #2563eb 0%, #1e40af 40%, #1a1a2e 100%);">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.9); font-weight: 600; letter-spacing: 0.5px;">MILESTONES</div>
        <div style="margin-top: 8px; width: 80%; display: flex; flex-direction: column; gap: 4px;">
          <div style="height: 6px; background: rgba(255,255,255,0.15); border-radius: 3px;"></div>
          <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; width: 70%;"></div>
        </div>
      </div>
      <h4>Track</h4>
      <p>Help achieve milestones</p>
    </div>
    <div class="screen-card">
      <div class="screen-preview" style="background: linear-gradient(180deg, #059669 0%, #065f46 40%, #1a1a2e 100%);">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.9); font-weight: 600; letter-spacing: 0.5px;">QUESTIONS</div>
        <div style="margin-top: 8px; width: 80%; display: flex; flex-direction: column; gap: 4px;">
          <div style="height: 6px; background: rgba(255,255,255,0.15); border-radius: 3px;"></div>
          <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; width: 50%;"></div>
        </div>
      </div>
      <h4>Guide</h4>
      <p>Answer questions</p>
    </div>
    <div class="screen-card">
      <div class="screen-preview" style="background: linear-gradient(180deg, #d97706 0%, #92400e 40%, #1a1a2e 100%);">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/></svg>
        </div>
        <div style="font-size: 10px; color: rgba(255,255,255,0.9); font-weight: 600; letter-spacing: 0.5px;">OPPORTUNITIES</div>
        <div style="margin-top: 8px; width: 80%; display: flex; flex-direction: column; gap: 4px;">
          <div style="height: 6px; background: rgba(255,255,255,0.15); border-radius: 3px;"></div>
          <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; width: 65%;"></div>
        </div>
      </div>
      <h4>Kickstart</h4>
      <p>Share opportunities</p>
    </div>
  </div>

  <div class="steps" style="margin-top: 12px;">
    <div class="step">
      <div class="step-num"></div>
      <h4>Share Your Story</h4>
      <p>Record videos answering targeted prompts about your career, lessons, and advice.</p>
    </div>
    <div class="step">
      <div class="step-num"></div>
      <h4>Connect with Mentees</h4>
      <p>Get matched with driven students who align with your expertise and interests.</p>
    </div>
    <div class="step">
      <div class="step-num"></div>
      <h4>Guide &amp; Support</h4>
      <p>Answer questions, provide feedback, and help shape their career journey via the app.</p>
    </div>
    <div class="step">
      <div class="step-num"></div>
      <h4>Kickstart Opportunities</h4>
      <p>Share internships, scholarships, and career-building resources with your mentees.</p>
    </div>
  </div>
</section>

<!-- DISCUSSION TOPICS -->
<div class="section-convo"><section class="section" id="discussion" style="padding-top: 40px;">
  <div class="section-header">
    <span class="section-label">Conversation Starters</span>
    <h2>13 Discussion Topics to Guide Mentorship</h2>
    <p>Use these topics to spark meaningful conversations with your mentee. They are grouped by phase to help guide your mentorship journey.</p>
  </div>

  <div class="topic-list">
    <div class="topic-item phase-1"><span class="phase-badge phase-1" style="margin-right:8px;">Phase 1</span> Can you describe your overall career journey and what inspired it?</div>
    <div class="topic-item phase-1"><span class="phase-badge phase-1" style="margin-right:8px;">Phase 1</span> What does a typical day look like in your role?</div>
    <div class="topic-item phase-1"><span class="phase-badge phase-1" style="margin-right:8px;">Phase 1</span> What are the most important skills you've developed over time?</div>
    <div class="topic-item phase-1"><span class="phase-badge phase-1" style="margin-right:8px;">Phase 1</span> What challenges did you face early in your career and how did you overcome them?</div>
    <div class="topic-item phase-2"><span class="phase-badge phase-2" style="margin-right:8px;">Phase 2</span> What role did education play in shaping your professional path?</div>
    <div class="topic-item phase-2"><span class="phase-badge phase-2" style="margin-right:8px;">Phase 2</span> How have mentors impacted your journey and in what ways?</div>
    <div class="topic-item phase-2"><span class="phase-badge phase-2" style="margin-right:8px;">Phase 2</span> What are some key lessons you've learned that you wish you knew starting out?</div>
    <div class="topic-item phase-2"><span class="phase-badge phase-2" style="margin-right:8px;">Phase 2</span> How do you stay motivated and continue to grow professionally?</div>
    <div class="topic-item phase-3"><span class="phase-badge phase-3" style="margin-right:8px;">Phase 3</span> What advice would you give to someone interested in following your path?</div>
    <div class="topic-item phase-3"><span class="phase-badge phase-3" style="margin-right:8px;">Phase 3</span> How do you define success in your career and life?</div>
    <div class="topic-item phase-3"><span class="phase-badge phase-3" style="margin-right:8px;">Phase 3</span> How do you handle work-life balance or stress in your profession?</div>
    <div class="topic-item phase-3"><span class="phase-badge phase-3" style="margin-right:8px;">Phase 3</span> What soft skills have been most valuable in your professional development?</div>
    <div class="topic-item phase-3"><span class="phase-badge phase-3" style="margin-right:8px;">Phase 3</span> What is one thing you think every young professional should focus on?</div>
  </div>
</section></div>

<!-- INDUSTRY PATHWAYS -->
<div class="section-alt"><section class="section" id="pathways">
  <div class="section-header">
    <span class="section-label">Career Exploration</span>
    <h2>Industry Pathways</h2>
    <p>This provides added structure if your mentee (or yourself) has a passion for a specific sector.</p>
  </div>

  <div class="pathway-grid">
    <div class="pathway-card" onclick="mgShowPathway('exec')"><span class="pw-icon">👔</span><h3>Executive Leadership</h3><p>C-suite, directors, strategic planning, and organizational leadership roles.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('tech')"><span class="pw-icon">💻</span><h3>Tech</h3><p>Software engineering, IT, cybersecurity, data science, and infrastructure.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('healthcare')"><span class="pw-icon">⚕️</span><h3>Healthcare</h3><p>Medicine, nursing, clinical research, healthcare management, and public health.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('legal')"><span class="pw-icon">⚖️</span><h3>Legal</h3><p>Law, litigation, corporate legal, public interest, and policy advocacy.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('banking')"><span class="pw-icon">🏦</span><h3>Banking &amp; Finance</h3><p>Investment banking, corporate finance, wealth management, and financial analysis.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('business')"><span class="pw-icon">📊</span><h3>Business</h3><p>Marketing, operations, entrepreneurship, consulting, and strategic management.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('education')"><span class="pw-icon">🎓</span><h3>Education</h3><p>K-12 teaching, higher education, instructional design, and EdTech innovation.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('sports')"><span class="pw-icon">⚽</span><h3>Sports &amp; Athletics</h3><p>Coaching, sports management, athletic training, analytics, and event operations.</p><span class="pw-arrow">→</span></div>
    <div class="pathway-card" onclick="mgShowPathway('iteng')"><span class="pw-icon">🔧</span><h3>IT &amp; Engineering</h3><p>Software, systems, mechanical, electrical, civil, and infrastructure engineering.</p><span class="pw-arrow">→</span></div>
  </div>
</section></div>

<!-- TYPICAL MENTEE QUESTIONS -->
<div class="section-warm"><section class="section" id="mentee-questions">
  <div class="section-header">
    <span class="section-label">Mentee Resources</span>
    <h2>Typical Mentee Questions</h2>
    <p>Explore questions organized by topic area. These are the conversations your mentees want to have with you.</p>
  </div>

  <div class="mq-categories-grid">
    <div class="mq-category-card active" onclick="mgSelectMQCategory(this, 'skills')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/1f-ZXm8FtRgkNtT7b9gM0NVdRg-wyHZgT=w200" alt="Skills"><span class="mq-cat-name">Skills &amp; Professional<br>Development</span></div>
    <div class="mq-category-card" onclick="mgSelectMQCategory(this, 'journey')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/1CI0nxcL8ZW_PEzLXhCGpMy4UVj4vcrPD=w200" alt="Career Journey"><span class="mq-cat-name">Career Journey &amp;<br>Inspiration</span></div>
    <div class="mq-category-card" onclick="mgSelectMQCategory(this, 'routine')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/16pBaU8d9UQvDUdoGRtzK2kOCpu16Arz3=w200" alt="Work Routine"><span class="mq-cat-name">Work Routine &amp;<br>Productivity</span></div>
    <div class="mq-category-card" onclick="mgSelectMQCategory(this, 'challenges')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/18PCVMieWWYi09HzgRvjRMs53TKirkxm_=w200" alt="Challenges"><span class="mq-cat-name">Challenges, Resilience<br>&amp; Growth</span></div>
    <div class="mq-category-card" onclick="mgSelectMQCategory(this, 'networking')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/1Lj5F7WcEXIOl1gytC_HOVlZtVTBMrF6y=w200" alt="Networking"><span class="mq-cat-name">Networking &amp;<br>Relationships</span></div>
    <div class="mq-category-card" onclick="mgSelectMQCategory(this, 'advice')"><img class="mq-cat-icon" src="https://lh3.googleusercontent.com/d/1yVa2cG5EWpuhHSV4E2OSGOikDGD0d_x2=w200" alt="Career Advice"><span class="mq-cat-name">Career Advice &amp;<br>Industry Insight</span></div>
  </div>
  <p style="text-align:center; font-size:12px; color:var(--mg-gray-600); margin-bottom:16px;">Tap a category to see questions</p>

  <div class="mq-questions-panel active" id="mg-mq-skills"><ul class="mq-questions-list">
    <li class="mq-question-item">What skills are most critical to your success?</li>
    <li class="mq-question-item">Which of these skills did you have to develop on the job?</li>
    <li class="mq-question-item">How do you continue to sharpen these skills?</li>
    <li class="mq-question-item">Which skill do you think is most underrated in your field?</li>
    <li class="mq-question-item">What are the must-know tools or software in your field?</li>
    <li class="mq-question-item">Which ones are essential for entry-level roles?</li>
    <li class="mq-question-item">Are there certifications or training you recommend?</li>
    <li class="mq-question-item">What resources did you use to learn them?</li>
  </ul></div>

  <div class="mq-questions-panel" id="mg-mq-journey"><ul class="mq-questions-list">
    <li class="mq-question-item">What inspired you to pursue this career?</li>
    <li class="mq-question-item">Was there a defining moment or person who influenced your decision?</li>
    <li class="mq-question-item">Did your original plan differ from where you ended up?</li>
    <li class="mq-question-item">How did your upbringing or environment shape your career interest?</li>
  </ul></div>

  <div class="mq-questions-panel" id="mg-mq-routine"><ul class="mq-questions-list">
    <li class="mq-question-item">Can you describe your typical workday?</li>
    <li class="mq-question-item">What tasks do you handle in the morning vs. afternoon?</li>
    <li class="mq-question-item">How much of your time is spent on collaboration vs. individual work?</li>
    <li class="mq-question-item">How has your daily routine changed as you've advanced in your role?</li>
  </ul></div>

  <div class="mq-questions-panel" id="mg-mq-challenges"><ul class="mq-questions-list">
    <li class="mq-question-item">What challenges did you face early on?</li>
    <li class="mq-question-item">How did you overcome your biggest obstacle?</li>
    <li class="mq-question-item">What would you do differently now?</li>
    <li class="mq-question-item">Were there moments you considered quitting? What kept you going?</li>
    <li class="mq-question-item">How do you handle failure or setbacks in your profession?</li>
    <li class="mq-question-item">Can you share a specific time you bounced back from failure?</li>
    <li class="mq-question-item">What coping strategies have helped you stay resilient?</li>
    <li class="mq-question-item">How do you shift your mindset after a major disappointment?</li>
  </ul></div>

  <div class="mq-questions-panel" id="mg-mq-networking"><ul class="mq-questions-list">
    <li class="mq-question-item">How did you find your first mentor?</li>
    <li class="mq-question-item">What made them a good mentor for you?</li>
    <li class="mq-question-item">What advice did they give you that still resonates?</li>
    <li class="mq-question-item">How did you maintain that relationship over time?</li>
    <li class="mq-question-item">What networking tips do you have for beginners?</li>
    <li class="mq-question-item">How do you maintain relationships with your contacts?</li>
    <li class="mq-question-item">What was your most valuable networking experience?</li>
    <li class="mq-question-item">What's a common mistake people make when networking?</li>
  </ul></div>

  <div class="mq-questions-panel" id="mg-mq-advice"><ul class="mq-questions-list">
    <li class="mq-question-item">What's something you wish you had known starting out?</li>
    <li class="mq-question-item">How would that knowledge have changed your approach?</li>
    <li class="mq-question-item">What common misconception did you have?</li>
    <li class="mq-question-item">What do you wish someone had told you in your first job?</li>
    <li class="mq-question-item">What advice would you give your younger self?</li>
    <li class="mq-question-item">What mindset would you encourage?</li>
    <li class="mq-question-item">What should they not stress about?</li>
    <li class="mq-question-item">How would you prepare emotionally for the career journey?</li>
    <li class="mq-question-item">What's your best piece of advice for long-term career growth?</li>
    <li class="mq-question-item">How do you set career goals?</li>
    <li class="mq-question-item">What's the role of mentorship or sponsorship in growth?</li>
    <li class="mq-question-item">What mindset helps you navigate long-term uncertainty?</li>
  </ul></div>
</section></div>

<!-- INDUSTRY RESOURCES / RESOURCE LIBRARY -->
<div class="section-alt"><section class="section" id="resources">
  <div class="section-header">
    <span class="section-label">Learning Library</span>
    <h2>Industry Resources</h2>
    <p>Curated books, courses, websites, and certifications to help you and your mentees continue learning.</p>
  </div>

  <div class="resource-filters">
    <div class="filter-industry">
      <select id="mg-industryFilter" onchange="mgFilterResources()">
        <option value="">All Industries</option>
        <option value="Executive Leadership">Executive Leadership</option>
        <option value="Tech">Tech</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Legal">Legal</option>
        <option value="Banking">Banking</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Sports">Sports</option>
        <option value="IT">IT</option>
        <option value="Engineering">Engineering</option>
      </select>
    </div>
    <div class="filter-type">
      <button class="filter-btn active" onclick="mgFilterByType('all', this)">All</button>
      <button class="filter-btn" onclick="mgFilterByType('Books', this)">Books</button>
      <button class="filter-btn" onclick="mgFilterByType('Websites', this)">Websites</button>
      <button class="filter-btn" onclick="mgFilterByType('LinkedIn Courses', this)">LinkedIn</button>
      <button class="filter-btn" onclick="mgFilterByType('Coursera', this)">Coursera</button>
      <button class="filter-btn" onclick="mgFilterByType('Tutorials', this)">Tutorials</button>
      <button class="filter-btn" onclick="mgFilterByType('Certificates/University Courses', this)">Certs</button>
    </div>
  </div>

  <div class="resource-grid" id="mg-resourceGrid"></div>
  <div class="resource-count" id="mg-resourceCount"></div>
</section></div>

<!-- ADDITIONAL MENTOR RESOURCES -->
<div class="section-maroon"><section class="section">
  <div class="section-header">
    <span class="section-label">Mentor Toolkit</span>
    <h2>Additional Mentor Resources</h2>
    <p>Materials designed to support the personal and professional growth of P3 mentors.</p>
  </div>

  <div style="overflow-x: auto; margin-top: 24px;">
    <table class="addl-table">
      <thead><tr><th>Resource</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><strong>Books</strong></td><td></td></tr>
        <tr><td>&ldquo;The Mentor Leader&rdquo; by Tony Dungy</td><td>Servant leadership and mentoring from a values-based perspective.</td></tr>
        <tr><td>&ldquo;Dare to Lead&rdquo; by Bren&eacute; Brown</td><td>Leading with vulnerability, courage, and empathy.</td></tr>
        <tr><td>&ldquo;Lean In&rdquo; by Sheryl Sandberg</td><td>Mentoring lessons around leadership and overcoming workplace barriers.</td></tr>
        <tr><td>&ldquo;Atomic Habits&rdquo; by James Clear</td><td>Small, consistent changes mentees can apply for long-term success.</td></tr>
        <tr><td><strong>YouTube &amp; Podcasts</strong></td><td></td></tr>
        <tr><td><a href="https://podcasts.apple.com/us/podcast/mentorship-matters/id1551" target="_blank" rel="noopener">Mentorship Matters Podcast</a></td><td>The landscape of leaders and inclusive mentorship.</td></tr>
        <tr><td><a href="https://www.ted.com/talks/rita_pierson_every_kid_needs_a_champion" target="_blank" rel="noopener">Every Kid Needs a Champion</a></td><td>TED Talk by Rita Pierson — impactful for those mentoring young adults.</td></tr>
        <tr><td><a href="https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action" target="_blank" rel="noopener">Start With Why</a></td><td>TED Talk by Simon Sinek on purpose-driven mentorship.</td></tr>
        <tr><td><strong>LinkedIn Courses</strong></td><td></td></tr>
        <tr><td><a href="https://www.linkedin.com/learning/being-a-good-mentor" target="_blank" rel="noopener">Being A Good Mentor</a></td><td>Practical guide for new and experienced mentors.</td></tr>
        <tr><td><a href="https://www.linkedin.com/learning/coaching-and-developing-employees" target="_blank" rel="noopener">Coaching and Developing Employees</a></td><td>Key mentorship strategies using coaching models.</td></tr>
        <tr><td><a href="https://www.linkedin.com/learning/developing-executive-presence" target="_blank" rel="noopener">Developing Executive Presence</a></td><td>Great for mentees interested in leadership development.</td></tr>
        <tr><td><a href="https://www.linkedin.com/learning/being-a-good-mentee" target="_blank" rel="noopener">Being a Good Mentee</a></td><td>Helps mentees maximize their mentoring relationships.</td></tr>
        <tr><td><strong>P3 Resources</strong></td><td></td></tr>
        <tr><td><a href="https://www.pulseofp3.org" target="_blank" rel="noopener">P3 Overview Deck</a></td><td>Origins of P3 and student/partner solutions.</td></tr>
        <tr><td><a href="https://www.pulseofp3.org" target="_blank" rel="noopener">P3 Mobile App</a></td><td>Overview of the mobile app UX for mentors and mentees.</td></tr>
      </tbody>
    </table>
  </div>
</section></div>

<!-- FAQ -->
<section class="section section-alt" id="faq">
  <div class="section-header">
    <span class="section-label">Help &amp; Support</span>
    <h2>Frequently Asked Questions</h2>
    <p>Got questions? We've got answers. Browse common mentoring questions below.</p>
  </div>

  <div class="accordion">
    <div class="accordion-item open">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>How often should I communicate with my mentee?</span></button>
      <div class="accordion-content"><p>We recommend responding to mentee questions within 3–5 days and checking in monthly. You can also record videos (2–4 per month) to keep the relationship active. Quality matters more than frequency — show up authentically when you do engage.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>What if I don't know the answer to a mentee's question?</span></button>
      <div class="accordion-content"><p>Be honest! Mentorship isn't about having all the answers. You can share how you would approach finding the answer, introduce them to someone in your network who can help, or research it together. This models growth mindset and problem-solving skills.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>How do I share opportunities with my mentee?</span></button>
      <div class="accordion-content"><p>Use the Kickstart section of the P3 app to share internships, scholarships, volunteer roles, conferences, or networking events. Include context about why you think it's a good fit for them and how they can apply. Personal recommendations carry weight!</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>What topics should I record videos about?</span></button>
      <div class="accordion-content"><p>Use our Discussion Topics section as a guide (13 core prompts across three phases). Focus on your unique story, journey, skills, challenges, and advice. Each video should target one clear topic. Share real experiences — authenticity resonates most with mentees.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>How do I know if my mentee is making progress?</span></button>
      <div class="accordion-content"><p>Look for engagement signals: they're asking thoughtful questions, taking action on your advice, applying for opportunities you share, and showing growth in their reflections. Use the Impact Metrics dashboard in the mentor toolkit to track milestones and celebrate wins together.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>What if I need to take a break from mentoring?</span></button>
      <div class="accordion-content"><p>Life happens! If you need to step back, communicate with your mentee and the P3 team in advance. If you know it's temporary, you can pause your mentee matching. If you need to exit completely, we can help transition your mentee to another mentor. We value honesty and care about sustaining healthy relationships.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>Can I mentor multiple mentees?</span></button>
      <div class="accordion-content"><p>Yes! Many of our mentors work with 2–3 mentees simultaneously. However, prioritize quality over quantity. Make sure you can give each relationship genuine attention and follow through on your commitments.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>How is my information kept confidential?</span></button>
      <div class="accordion-content"><p>P3 takes privacy seriously and complies with all FERPA regulations. Your personal contact information is not shared with mentees unless you choose to share it. All in-app communications are secure and confidential. Review our full privacy policy for more details.</p></div>
    </div>

    <div class="accordion-item">
      <button class="accordion-btn" onclick="mgToggleAccordion(this)"><span>How do I give feedback to P3?</span></button>
      <div class="accordion-content"><p>We'd love your input! You can submit feedback via the Settings section of the P3 app, email us at mentorsupport@pulseofp3.org, or reach out to your P3 partnership lead. Your insights help us improve the platform and mentor experience.</p></div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <img src="${LOGO}" alt="P3 Logo" class="footer-logo">
  <p>&copy; 2026 Pulse of Perseverance Project. All rights reserved.</p>
  <p style="font-size: 12px; margin-top: 12px;"><a href="/app-terms-conditions">Terms &amp; Conditions</a> &nbsp;|&nbsp; <a href="/about/in-the-press">Press</a> &nbsp;|&nbsp; <a href="/partner#contact">Contact Us</a></p>
</footer>
`;

  // ═══ 5. BUILD MODAL (body-level sibling so it overlays everything) ═══
  var modalWrap = document.createElement('div');
  modalWrap.className = 'mg-modal-overlay';
  modalWrap.id = 'mg-pathwayModal';
  modalWrap.innerHTML = `
    <div class="mg-modal">
      <div class="mg-modal-header">
        <h2 id="mg-modalTitle"></h2>
        <button class="mg-modal-close" onclick="mgClosePathway()" aria-label="Close">&times;</button>
      </div>
      <div class="mg-modal-body" id="mg-modalBody"></div>
    </div>`;

  // Mount: #mg-root then modal overlay
  document.body.appendChild(root);
  document.body.appendChild(modalWrap);

  // ═══ 6. PATHWAYS DATA ═══
  var pathways = {
    exec: {
      title: 'Executive Leadership',
      overview: 'Executive leadership encompasses C-suite roles, directors, and senior management positions that shape organizational strategy, culture, and impact. Core responsibilities include strategic planning, stakeholder management, team building, and driving results. The path to executive roles typically involves 10–20+ years of progressive responsibility.',
      roles: [
        { title: 'Chief Executive Officer (CEO)', desc: 'The highest-ranking executive who sets organizational vision, strategy, and culture. Reports to the board and is ultimately responsible for company performance.' },
        { title: 'Chief Operating Officer (COO)', desc: 'Oversees day-to-day operations, implements strategy, optimizes processes, and manages operational teams.' },
        { title: 'Director / Vice President', desc: 'Mid-level executives who lead functional areas (e.g., VP of Sales, VP of Product, Director of Operations) and report to C-suite.' },
        { title: 'Manager / Team Lead', desc: 'Entry point to leadership roles. Builds and develops teams, sets performance expectations, and translates strategy into action.' }
      ],
      education: ['MBA (highly valued)', 'Bachelor in Business, Economics, or related field', 'Executive Leadership Certificates', 'Advanced degrees in specialized areas (e.g., MBA Finance)'],
      skills: ['Strategic thinking', 'Emotional intelligence', 'Decision-making under uncertainty', 'Team building', 'Communication', 'Financial acumen', 'Change management'],
      salary: { entry: '$120,000 - $180,000', mid: '$200,000 - $400,000', senior: '$500,000+' },
      tips: 'Take on stretch projects early in your career; seek mentors in senior roles; develop financial literacy and P&L understanding; join leadership development programs; read business classics (Good to Great, Leaders Eat Last); present in front of large groups to build executive presence; pursue an MBA if aligned with your goals; build a strong professional network across industries.',
      reflection: ['What leadership qualities do I want to develop?', 'Who are my leadership role models and why?', 'What kind of organization culture do I want to build?'],
      discussion: ['What does leadership mean to you?', 'Describe your leadership philosophy and key principles.', 'How do you make strategic decisions?', 'What is your approach to building and developing teams?', 'How do you handle conflict or difficult conversations?', 'Tell us about a major initiative you led and lessons learned.', 'How do you stay informed and anticipate market changes?', 'What mentors or leaders have shaped you?', 'How do you balance financial results with people and culture?', 'What is your vision for the future of your industry?', 'How do you drive innovation and empower others?', 'What advice would you give aspiring leaders?', 'How do you navigate complex stakeholder dynamics?']
    },
    tech: {
      title: 'Tech',
      overview: 'Tech encompasses software engineering, IT operations, cybersecurity, data science, AI/ML, and infrastructure roles. The sector evolves rapidly with new languages, frameworks, and paradigms. Strong technical foundation + continuous learning is essential. Remote work and flexible arrangements are common.',
      roles: [
        { title: 'Software Engineer / Developer', desc: 'Designs, codes, tests, and maintains software applications. Specializations include frontend, backend, full-stack, mobile, and embedded systems.' },
        { title: 'Data Scientist / Analyst', desc: 'Extracts insights from data using statistics, machine learning, and programming. Focuses on informed decision-making.' },
        { title: 'DevOps / Cloud Engineer', desc: 'Manages infrastructure, deployment pipelines, cloud services, and system reliability.' },
        { title: 'Product Manager (Tech)', desc: 'Bridges engineering and business. Defines product strategy, prioritizes features, and drives product roadmap.' }
      ],
      education: ['Bachelor in Computer Science, Engineering, or related field', 'Coding bootcamps (12-16 weeks)', 'Certifications (AWS, Google Cloud, CompTIA)', 'Self-taught with strong portfolio'],
      skills: ['Programming languages (Python, JavaScript, Java, Go)', 'System design & architecture', 'Problem-solving', 'Collaboration', 'Testing & debugging', 'Cloud platforms', 'Version control (Git)'],
      salary: { entry: '$80,000 - $120,000', mid: '$130,000 - $200,000', senior: '$200,000 - $400,000+' },
      tips: 'Build a portfolio of projects on GitHub; contribute to open-source; learn at least 2 programming languages deeply; practice coding interviews (LeetCode, HackerRank); stay current with tech trends (podcasts, blogs, conferences); pursue internships or entry-level roles at startups or FAANG; consider cloud certifications; join tech communities and hackathons.',
      reflection: ['What problem do I want to solve with code?', 'What languages or frameworks excite me most?', 'How do I stay current in a rapidly changing field?'],
      discussion: ['What drew you to a career in tech?', 'Describe a challenging technical problem you solved.', 'What is your tech stack and why?', 'How do you stay updated with the latest technologies?', 'Tell us about a project you are proud of.', 'How do you approach system design and scalability?', 'What is the role of collaboration in engineering?', 'How do you handle technical debt and refactoring?', 'What are emerging trends in your tech area?', 'What advice would you give aspiring engineers?', 'How do you transition from junior to senior engineer?', 'What is your approach to mentoring junior developers?', 'How do you balance speed and quality in development?']
    },
    healthcare: {
      title: 'Healthcare',
      overview: 'Healthcare spans clinical roles (doctors, nurses, therapists), research, public health, healthcare management, and health tech. Core focus: improving patient outcomes, advancing medical science, and increasing access. High-stakes, meaningful work with strong job security.',
      roles: [
        { title: 'Physician / Doctor', desc: 'Diagnoses and treats patients. Specialties vary widely (cardiology, pediatrics, psychiatry, etc.). Requires medical degree and licensing.' },
        { title: 'Nurse / Registered Nurse', desc: 'Provides patient care, administers medications, and supports physicians. Core role in hospitals and clinics.' },
        { title: 'Public Health Professional', desc: 'Focuses on population health, disease prevention, epidemiology, and health policy.' },
        { title: 'Healthcare Administrator / Manager', desc: 'Manages hospital/clinic operations, budgets, staff, and strategic planning.' }
      ],
      education: ['MD (Doctor of Medicine) or DO (Doctor of Osteopathic Medicine)', 'RN (Registered Nurse) - Associate or Bachelor', 'MPH (Master of Public Health)', 'Nursing specialization certifications'],
      skills: ['Clinical assessment', 'Communication with patients', 'Empathy & compassion', 'Attention to detail', 'Time management', 'Teamwork', 'Continuous learning'],
      salary: { entry: '$60,000 - $100,000', mid: '$100,000 - $180,000', senior: '$200,000 - $400,000+' },
      tips: 'Volunteer in hospitals, clinics, or nursing homes early; shadow healthcare professionals; maintain strong GPA for medical school prerequisites; take MCAT/NCLEX prep seriously; join pre-med or nursing clubs; research specialties that align with your values; consider gap year for life experience; build resilience and stress management skills.',
      reflection: ['Why do I want to work in healthcare?', 'What patient population resonates with me?', 'How do I handle the emotional weight of this work?'],
      discussion: ['What inspired your healthcare career?', 'Describe your daily responsibilities and typical day.', 'What specialization or focus area did you choose and why?', 'How do you maintain work-life balance in healthcare?', 'Tell us about a patient or case that impacted you.', 'What are the biggest challenges in healthcare today?', 'How do you stay current with medical advancements?', 'How has healthcare evolved during your career?', 'What role does technology play in your work?', 'What advice would you give aspiring healthcare professionals?', 'How do you approach patient communication and empathy?', 'What is your philosophy on preventive vs. acute care?', 'How do you handle difficult or emotional situations?']
    },
    legal: {
      title: 'Legal',
      overview: 'Legal careers span litigation, corporate law, public interest, policy, and in-house counsel roles. Lawyers serve as advisors, advocates, and change-makers. Requires law school, bar exam, and strong analytical + persuasion skills.',
      roles: [
        { title: 'Litigation Attorney', desc: 'Represents clients in legal disputes, prepares cases, and argues in court. Works in law firms or corporations.' },
        { title: 'Corporate Counsel', desc: 'Provides legal advice to businesses on contracts, compliance, M&A, and strategy.' },
        { title: 'Public Interest Lawyer', desc: 'Works on civil rights, criminal defense, immigration, or nonprofit matters. Often lower pay but high impact.' },
        { title: 'Policy Advocate / Lobbyist', desc: 'Influences legislation and policy at federal, state, or local levels.' }
      ],
      education: ['Juris Doctor (JD) from accredited law school', 'Pass bar exam in target state', 'Specialization certificates in areas like intellectual property or international law'],
      skills: ['Legal research & writing', 'Argumentation & persuasion', 'Attention to detail', 'Client communication', 'Critical thinking', 'Negotiation', 'Time management'],
      salary: { entry: '$70,000 - $120,000', mid: '$130,000 - $250,000', senior: '$250,000 - $500,000+' },
      tips: 'Maintain strong academic record; volunteer with legal aid organizations or courts; intern at law firms or nonprofits; participate in moot court and debate; build a network in legal circles; prepare thoroughly for LSAT; choose law schools strategically (target market); build writing skills early; consider public interest loan forgiveness programs.',
      reflection: ['What area of law excites me most?', 'How do I want to use law to create impact?', 'Am I called to serve people or corporations?'],
      discussion: ['What inspired your legal career?', 'Describe your primary practice area and cases you have handled.', 'What is your approach to client relationships?', 'Tell us about a landmark case or precedent in your field.', 'How has law practice changed in your career?', 'What are current legal trends or challenges?', 'How do you balance advocacy with ethics?', 'Tell us about a client or case that shaped you.', 'What is your philosophy on access to justice?', 'What advice would you give aspiring lawyers?', 'How do you navigate complex legal research?', 'What soft skills are critical for lawyers?', 'How do you continue learning and stay current?']
    },
    banking: {
      title: 'Banking & Finance',
      overview: 'Finance covers investment banking, corporate finance, asset management, trading, financial planning, and fintech. The sector drives capital allocation and economic growth. Attracts analytical, ambitious professionals. Strong quantitative skills valued.',
      roles: [
        { title: 'Investment Banker', desc: 'Advises corporations on M&A, capital raises, and valuations. High pressure, fast-paced, well-compensated.' },
        { title: 'Financial Analyst', desc: 'Analyzes financial data, builds models, and provides investment recommendations.' },
        { title: 'Wealth Manager / Financial Advisor', desc: 'Manages client portfolios and provides personalized financial planning.' },
        { title: 'Trader', desc: 'Executes buy/sell decisions in markets. Driven by market data, news, and algorithmic signals.' }
      ],
      education: ['Bachelor in Finance, Economics, Accounting, or Math', 'CFA (Chartered Financial Analyst)', 'MBA with finance focus', 'Series 7, 63, 65 licenses'],
      skills: ['Financial modeling', 'Data analysis', 'Excel proficiency', 'Risk management', 'Communication', 'Negotiation', 'Numeracy'],
      salary: { entry: '$70,000 - $150,000', mid: '$150,000 - $300,000', senior: '$300,000 - $1,000,000+' },
      tips: 'Master Excel and financial modeling early; pursue CFA Level 1 as an undergrad; intern at banks or funds; build understanding of accounting fundamentals; read financial news daily; understand global markets and economic indicators; network heavily; consider boutique vs. bulge-bracket firm differences.',
      reflection: ['What drives my interest in finance?', 'How do I view risk and reward?', 'What financial impact do I want to create?'],
      discussion: ['What attracted you to a finance career?', 'Describe your primary role and day-to-day responsibilities.', 'How do you approach financial analysis and valuations?', 'Tell us about a significant transaction or deal.', 'How has the financial industry evolved?', 'What are current market dynamics and trends?', 'How do you manage risk in your work?', 'What is your investment philosophy?', 'Tell us about a mentor who shaped your career.', 'What advice would you give aspiring finance professionals?', 'How do you navigate market volatility?', 'What soft skills matter most in finance?', 'How do you continue learning about markets?']
    },
    business: {
      title: 'Business',
      overview: 'Business spans marketing, operations, supply chain, HR, strategy, and varied company types from startups to Fortune 500s. Career pathways often begin in rotational leadership programs or analyst roles, then specialize. Entrepreneurship demands resilience, design thinking, and financial literacy.',
      roles: [
        { title: 'Marketing Coordinator', desc: 'Supports marketing campaigns by coordinating promotional efforts, managing social media content, and conducting market research.' },
        { title: 'Entrepreneur', desc: 'An individual who starts, owns, and operates a business venture, often wearing multiple hats across operations, sales, and strategy.' },
        { title: 'Consultant', desc: 'An expert hired to provide professional advice in areas such as management, marketing, operations, or strategy.' },
        { title: 'HR Specialist', desc: 'Focuses on recruitment, employee relations, training, benefits administration, or compliance.' }
      ],
      education: ['Bachelor in Business Admin or Marketing', 'MBA', 'Certificates in Six Sigma, Digital Marketing'],
      skills: ['Strategic planning', 'Negotiation', 'Marketing', 'Project management', 'Data interpretation'],
      salary: { entry: '$50,000 - $75,000', mid: '$80,000 - $120,000', senior: '$130,000 - $200,000+' },
      tips: 'Launch micro-venture projects (reselling, tutoring, dropshipping) to learn P&L basics; join Junior Achievement or your campus entrepreneurship club; pitch at local business-plan competitions; take introductory courses in accounting and marketing; attend startup weekends or internships at small businesses where responsibilities are broad.',
      reflection: ['What is your approach to business development?', 'How do you lead teams through change?', 'What is your favorite part of your role?'],
      discussion: ['What inspired you to enter the business world?', 'What is your business focus or industry, and what do you do daily?', 'What business skills and traits are most valuable?', 'What was your educational or entrepreneurial journey like?', 'What resources helped you build your business or career?', 'Describe a major milestone or setback and how you navigated it.', 'How do you network and build relationships in your industry?', 'What are key trends or innovations in your business field?', 'Who mentored you and helped shape your business mindset?', 'What advice would you give to aspiring business professionals?', 'How do you evaluate new opportunities or partnerships?', 'What are some lessons you have learned from failure?', 'What advice do you have for building a resilient mindset?']
    },
    education: {
      title: 'Education',
      overview: 'Education covers K-12 teaching, higher-ed faculty, instructional design, edtech product, and education policy/administration. Core duties include curriculum design, assessment, and learner engagement. Edtech growth, competency-based learning, and AI-powered tutoring are reshaping educator roles toward facilitation and data-driven personalization.',
      roles: [
        { title: 'High School Teacher', desc: 'Teaches academic subjects to students in grades K-12, develops lesson plans, assesses student progress, and helps prepare students for postsecondary education or careers.' },
        { title: 'Instructional Coach', desc: 'Supports teachers in improving instructional practices by modeling lessons, analyzing data, and offering feedback.' },
        { title: 'Principal', desc: 'The head administrator of a school who oversees daily operations, sets academic goals, manages staff, and enforces school policies.' },
        { title: 'Curriculum Developer', desc: 'Designs, evaluates, and revises instructional materials and standards.' }
      ],
      education: ['Bachelor in Education', 'State Teaching Credential', 'Master in Education or Administration', 'Certifications in Special Ed or ESL'],
      skills: ['Classroom management', 'Curriculum planning', 'Assessment design', 'Empathy', 'Adaptability'],
      salary: { entry: '$40,000 - $60,000', mid: '$65,000 - $90,000', senior: '$95,000 - $130,000+' },
      tips: 'Tutor peers or younger students; serve as a camp counselor; join Future Educators of America; volunteer with organizations like Khan Academy or Code.org; take child psychology or educational technology electives; pursue instructional-design micro-credentials on Coursera.',
      reflection: ['Why did you become a teacher?', 'How do you handle student challenges?', 'What keeps you motivated?'],
      discussion: ['Why did you choose a career in education?', 'What grade level or subject do you teach and why?', 'What is your daily routine as an educator?', 'What certifications and qualifications are required in education?', 'What strategies do you use to engage students?', 'What are the biggest challenges in the education field today?', 'Describe a rewarding moment in your teaching career.', 'How do you maintain professional growth as an educator?', 'Who mentored or inspired you in this career?', 'What advice would you give to someone considering education as a profession?', 'How do you foster inclusion and equity in your classroom?', 'What role does technology play in your teaching methods?', 'What advice do you have for avoiding burnout in education?']
    },
    sports: {
      title: 'Sports & Athletics',
      overview: 'Beyond professional athletes, the sports industry encompasses sports management, marketing, analytics, sports medicine, coaching, and event operations. Revenue is driven by media rights, sponsorships, and consumer engagement. Data analytics, NIL regulations, and e-sports are growth frontiers.',
      roles: [
        { title: 'Coach', desc: 'Trains and leads athletes or teams in competitive sports. Develops practice plans, teaches techniques and strategies, and fosters teamwork.' },
        { title: 'Athletic Trainer', desc: 'A certified healthcare professional who prevents, diagnoses, and treats sports-related injuries.' },
        { title: 'Sports Analyst', desc: 'Evaluates and interprets sports data to provide insights for media coverage, team performance, or fantasy leagues.' },
        { title: 'Team Manager', desc: 'Responsible for the logistical and administrative operations of a sports team.' }
      ],
      education: ['Degree in Kinesiology, Sports Management', 'Certifications like NASM, CPR, First Aid', 'Coaching licenses'],
      skills: ['Discipline', 'Teamwork', 'Strategic thinking', 'Physical fitness', 'Branding'],
      salary: { entry: '$35,000 - $60,000', mid: '$65,000 - $100,000', senior: '$110,000 - $200,000+' },
      tips: 'Play or volunteer to help manage aspects of a school team; volunteer with local youth leagues; join Sports Analytics Club Program (SACP) or participate in MIT Sloan Sports Analytics Conferences Hackathon; shadow athletic trainers; blog or podcast about sports to build a personal brand; seek game-day operations internships.',
      reflection: ['How do you train off-season?', 'What was your biggest setback?', 'What is life like beyond the game?'],
      discussion: ['What led you to a career in the sports industry?', 'What is your specific role in sports (athlete, coach, management, etc.)?', 'What does a typical day in your role look like?', 'What skills and discipline are required for success in sports?', 'What is your training or educational background?', 'Describe a defining moment in your sports career.', 'How do you manage physical and mental wellness?', 'Who has mentored or coached you throughout your journey?', 'What are emerging trends or issues in your sports field?', 'What advice would you give to youth interested in sports careers?', 'How do you handle high-pressure situations or competition?', 'What role does teamwork play in your career success?', 'What life skills has your sports career taught you?']
    },
    iteng: {
      title: 'IT / Engineering',
      overview: 'IT/Engineering integrates hardware, networks, cybersecurity, mechanical, electrical, civil, and systems engineering disciplines that design and sustain the infrastructure behind technology and industry. Growing segments include green energy, smart manufacturing (Industry 4.0), and space tech.',
      roles: [
        { title: 'Software Engineer', desc: 'Designs, develops, tests, and maintains software systems and applications.' },
        { title: 'Systems Analyst', desc: 'Evaluates and improves computer systems by analyzing user requirements and recommending technology solutions.' },
        { title: 'Cybersecurity Expert', desc: 'Protects systems, networks, and data from cyber threats. Risk assessment, implementing security protocols, and responding to incidents.' },
        { title: 'IT Manager', desc: 'Oversees an organizations information technology operations, plans and coordinates IT-related activities, manages staff, and aligns technology strategies with business goals.' }
      ],
      education: ['Bachelor in IT or Computer Science', 'Certifications like CompTIA, CCNA, ITIL', 'Bachelor in Engineering discipline', 'PE (Professional Engineer) license'],
      skills: ['Troubleshooting', 'Customer service', 'Technical design', 'Analytical thinking', 'Math proficiency'],
      salary: { entry: '$60,000 - $85,000', mid: '$90,000 - $120,000', senior: '$130,000 - $200,000+' },
      tips: 'Join FIRST Robotics, VEX Robotics, or TSA Engineering Design competitions; take calculus, physics, and PLTW courses; attend IEEE, SHPE, NSBE, or SWE high-school outreach events; earn CompTIA A+ or Cisco CCNA for IT fundamentals; intern with a municipal public-works department or local MSP; or build personal projects using Raspberry Pi.',
      reflection: ['How do you respond to a crisis?', 'What skills are most in-demand right now?', 'What is a common misconception about engineering?'],
      discussion: ['What inspired your journey into IT or Engineering?', 'What are your main responsibilities in your current role?', 'What tools, platforms, or coding languages do you use?', 'What educational background or certifications are standard in your field?', 'Describe a challenging project and how you solved it.', 'What soft skills are crucial in IT/Engineering roles?', 'How do you stay current with industry developments?', 'What are growth opportunities in your sector?', 'Who mentored you and how did they support your career path?', 'What advice would you offer to someone new to IT/Engineering?', 'What projects or innovations are you most excited about?', 'What advice would you give for passing certifications or exams?', 'How do you collaborate across teams and departments?']
    }
  };

  // ═══ 7. RESOURCES DATA ═══
  var resources = [
    // Executive Leadership
    {industry:"Executive Leadership",type:"Books",name:"Leaders Eat Last by Simon Sinek",url:"https://www.amazon.com/Leaders-Eat-Last-Together-Others/dp/1591848016"},
    {industry:"Executive Leadership",type:"Books",name:"Good to Great by Jim Collins",url:"https://www.amazon.com/Good-Great-Some-Companies-Others/dp/0066620996"},
    {industry:"Executive Leadership",type:"Books",name:"The Five Dysfunctions of a Team by Patrick Lencioni",url:"https://www.amazon.com/Five-Dysfunctions-Team-Leadership-Fable/dp/0787960756"},
    {industry:"Executive Leadership",type:"Books",name:"Dare to Lead by Bren\u00e9 Brown",url:"https://www.amazon.com/Dare-Lead-Brave-Conversations-Hearts/dp/0399592520"},
    {industry:"Executive Leadership",type:"Books",name:"Multipliers by Liz Wiseman",url:"https://www.amazon.com/Multipliers-Best-Leaders-Everyone-Smarter/dp/0062663070"},
    {industry:"Executive Leadership",type:"Books",name:"Leadership and Self-Deception by The Arbinger Institute",url:"https://www.amazon.com/Leadership-Self-Deception-Getting-Out-Box/dp/1523097809"},
    {industry:"Executive Leadership",type:"Websites",name:"Harvard Business Review",url:"https://hbr.org"},
    {industry:"Executive Leadership",type:"Websites",name:"McKinsey Insights",url:"https://www.mckinsey.com/featured-insights"},
    {industry:"Executive Leadership",type:"Websites",name:"Forbes Leadership",url:"https://www.forbes.com/leadership/"},
    {industry:"Executive Leadership",type:"Websites",name:"Center for Creative Leadership",url:"https://www.ccl.org"},
    {industry:"Executive Leadership",type:"Websites",name:"Inc.com Leadership",url:"https://www.inc.com/leadership"},
    {industry:"Executive Leadership",type:"Websites",name:"Leadership Now",url:"https://www.leadershipnow.com"},
    {industry:"Executive Leadership",type:"LinkedIn Courses",name:"Strategic Thinking",url:"https://www.linkedin.com/learning/strategic-thinking"},
    {industry:"Executive Leadership",type:"LinkedIn Courses",name:"Executive Leadership Essentials",url:"https://www.linkedin.com/learning/executive-leadership"},
    {industry:"Executive Leadership",type:"LinkedIn Courses",name:"Leading with Emotional Intelligence",url:"https://www.linkedin.com/learning/leading-with-emotional-intelligence-1"},
    {industry:"Executive Leadership",type:"LinkedIn Courses",name:"Building Resilience",url:"https://www.linkedin.com/learning/building-resilience"},
    {industry:"Executive Leadership",type:"Coursera",name:"Leading People and Teams",url:"https://www.coursera.org/specializations/leading-teams"},
    {industry:"Executive Leadership",type:"Coursera",name:"Organizational Leadership",url:"https://www.coursera.org/specializations/organizational-leadership"},
    {industry:"Executive Leadership",type:"Coursera",name:"Inspirational Leadership",url:"https://www.coursera.org/specializations/inspired-leadership"},
    {industry:"Executive Leadership",type:"Coursera",name:"Leadership and Emotional Intelligence",url:"https://www.coursera.org/learn/emotional-intelligence-leadership"},
    {industry:"Executive Leadership",type:"Tutorials",name:"LinkedIn Learning Leadership Micro Lessons",url:"https://www.linkedin.com/learning/topics/leadership-skills"},
    {industry:"Executive Leadership",type:"Tutorials",name:"TED Talks \u2013 Leadership Playlist",url:"https://www.ted.com/playlists/140/how_leaders_inspire"},
    {industry:"Executive Leadership",type:"Certificates/University Courses",name:"Harvard Business School Online \u2013 Leadership Principles",url:"https://online.hbs.edu/courses/leadership-principles/"},
    {industry:"Executive Leadership",type:"Certificates/University Courses",name:"MIT Sloan \u2013 Executive Leadership and Innovation",url:"https://executive.mit.edu/course-catalog/leadership"},
    {industry:"Executive Leadership",type:"Certificates/University Courses",name:"Yale Online \u2013 Leading Through Change",url:"https://som.yale.edu/programs/executive-education/for-individuals/leadership"},
    {industry:"Executive Leadership",type:"Certificates/University Courses",name:"Cornell \u2013 Executive Leadership Certificate",url:"https://ecornell.cornell.edu/certificates/leadership-and-strategic-management"},
    // Tech
    {industry:"Tech",type:"Books",name:"Clean Code by Robert C. Martin",url:"https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"},
    {industry:"Tech",type:"Books",name:"You Don\u2019t Know JS by Kyle Simpson",url:"https://www.amazon.com/You-Dont-Know-JS-Book/dp/1491904240"},
    {industry:"Tech",type:"Books",name:"The Pragmatic Programmer by Hunt & Thomas",url:"https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052"},
    {industry:"Tech",type:"Books",name:"Introduction to Algorithms by Cormen",url:"https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844"},
    {industry:"Tech",type:"Books",name:"Design Patterns by Erich Gamma",url:"https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612"},
    {industry:"Tech",type:"Websites",name:"freeCodeCamp",url:"https://www.freecodecamp.org"},
    {industry:"Tech",type:"Websites",name:"Geeks for Geeks",url:"https://www.geeksforgeeks.org"},
    {industry:"Tech",type:"Websites",name:"MDN Web Docs",url:"https://developer.mozilla.org"},
    {industry:"Tech",type:"LinkedIn Courses",name:"Programming Foundations: Fundamentals",url:"https://www.linkedin.com/learning/programming-foundations-fundamentals"},
    {industry:"Tech",type:"LinkedIn Courses",name:"Learning Git and GitHub",url:"https://www.linkedin.com/learning/learning-git-and-github"},
    {industry:"Tech",type:"LinkedIn Courses",name:"Python Essential Training",url:"https://www.linkedin.com/learning/python-essential-training"},
    {industry:"Tech",type:"LinkedIn Courses",name:"DevOps Foundations",url:"https://www.linkedin.com/learning/devops-foundations"},
    {industry:"Tech",type:"Coursera",name:"Google IT Automation with Python",url:"https://www.coursera.org/professional-certificates/google-it-automation"},
    {industry:"Tech",type:"Coursera",name:"CS50\u2019s Introduction to Computer Science",url:"https://cs50.harvard.edu/x/"},
    {industry:"Tech",type:"Coursera",name:"Data Structures and Algorithms",url:"https://www.coursera.org/specializations/data-structures-algorithms"},
    {industry:"Tech",type:"Coursera",name:"Meta Full-Stack Web Development",url:"https://www.coursera.org/professional-certificates/meta-back-end-developer"},
    {industry:"Tech",type:"Coursera",name:"Python for Everybody",url:"https://www.coursera.org/specializations/python"},
    {industry:"Tech",type:"Tutorials",name:"freeCodeCamp Full Stack Developer Guide",url:"https://www.freecodecamp.org/learn"},
    {industry:"Tech",type:"Tutorials",name:"The Odin Project \u2013 Full Stack Curriculum",url:"https://www.theodinproject.com"},
    {industry:"Tech",type:"Certificates/University Courses",name:"MITx \u2013 Introduction to Computer Science",url:"https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/"},
    {industry:"Tech",type:"Certificates/University Courses",name:"HarvardX \u2013 CS50",url:"https://cs50.harvard.edu/x/"},
    {industry:"Tech",type:"Certificates/University Courses",name:"Georgia Tech \u2013 Online MS in CS",url:"https://www.omscs.gatech.edu/"},
    // Healthcare
    {industry:"Healthcare",type:"Books",name:"Being Mortal by Atul Gawande",url:"https://www.amazon.com/Being-Mortal-Medicine-What-Matters/dp/1250076226"},
    {industry:"Healthcare",type:"Books",name:"The Checklist Manifesto by Atul Gawande",url:"https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000"},
    {industry:"Healthcare",type:"Books",name:"How Doctors Think by Jerome Groopman",url:"https://www.amazon.com/How-Doctors-Think-Jerome-Groopman/dp/0547053649"},
    {industry:"Healthcare",type:"Books",name:"Complications by Atul Gawande",url:"https://www.amazon.com/Complications-Surgeons-Notes-Imperfect-Science/dp/0312421702"},
    {industry:"Healthcare",type:"Books",name:"An American Sickness by Elisabeth Rosenthal",url:"https://www.amazon.com/American-Sickness-Healthcare-Became-Business/dp/0143110853"},
    {industry:"Healthcare",type:"Websites",name:"CDC",url:"https://www.cdc.gov"},
    {industry:"Healthcare",type:"Websites",name:"World Health Organization",url:"https://www.who.int"},
    {industry:"Healthcare",type:"Websites",name:"Mayo Clinic",url:"https://www.mayoclinic.org"},
    {industry:"Healthcare",type:"Websites",name:"NIH",url:"https://www.nih.gov"},
    {industry:"Healthcare",type:"Websites",name:"Health Affairs",url:"https://www.healthaffairs.org"},
    {industry:"Healthcare",type:"LinkedIn Courses",name:"Healthcare Foundations",url:"https://www.linkedin.com/learning/healthcare-foundations"},
    {industry:"Healthcare",type:"LinkedIn Courses",name:"Care Coordination",url:"https://www.linkedin.com/learning/care-coordination"},
    {industry:"Healthcare",type:"Coursera",name:"Science of Well-Being",url:"https://www.coursera.org/learn/the-science-of-well-being"},
    {industry:"Healthcare",type:"Tutorials",name:"RegisteredNurseRN YouTube",url:"https://www.youtube.com/user/RegisteredNurseRN"},
    {industry:"Healthcare",type:"Tutorials",name:"Health 101 YouTube",url:"https://www.youtube.com/results?search_query=health+101"},
    {industry:"Healthcare",type:"Certificates/University Courses",name:"Stanford Health Education",url:"https://online.stanford.edu/courses?search=health"},
    {industry:"Healthcare",type:"Certificates/University Courses",name:"Duke Global Health",url:"https://globalhealth.duke.edu/education/training-programs"},
    // Legal
    {industry:"Legal",type:"Books",name:"Just Mercy by Bryan Stevenson",url:"https://www.amazon.com/Just-Mercy-Story-Justice-Redemption/dp/0812984978"},
    {industry:"Legal",type:"Books",name:"Gideon\u2019s Trumpet by Anthony Lewis",url:"https://www.amazon.com/Gideons-Trumpet-Anthony-Lewis/dp/0679723129"},
    {industry:"Legal",type:"Books",name:"The Nine by Jeffrey Toobin",url:"https://www.amazon.com/Nine-Inside-Secret-Supreme-Court/dp/1400096790"},
    {industry:"Legal",type:"Books",name:"Making Your Case by Scalia & Garner",url:"https://www.amazon.com/Making-Your-Case-Persuading-Decide/dp/0314184716"},
    {industry:"Legal",type:"Books",name:"Law 101 by Jay Feinman",url:"https://www.amazon.com/Law-101-Everything-About-American/dp/0190866322"},
    {industry:"Legal",type:"Websites",name:"Legal Information Institute",url:"https://www.law.cornell.edu"},
    {industry:"Legal",type:"Websites",name:"Oyez",url:"https://www.oyez.org"},
    {industry:"Legal",type:"Websites",name:"ABA Journal",url:"https://www.abajournal.com"},
    {industry:"Legal",type:"LinkedIn Courses",name:"IP Fundamentals",url:"https://www.linkedin.com/learning/intellectual-property-fundamentals"},
    {industry:"Legal",type:"Coursera",name:"American Law (Penn)",url:"https://www.coursera.org/learn/american-law"},
    {industry:"Legal",type:"Coursera",name:"International Criminal Law",url:"https://www.coursera.org/learn/international-criminal-law"},
    {industry:"Legal",type:"Coursera",name:"Contract Law",url:"https://www.edx.org/course/contract-law-from-trust-to-promise-to-contract"},
    {industry:"Legal",type:"Coursera",name:"Language of Law",url:"https://www.coursera.org/learn/language-of-law"},
    {industry:"Legal",type:"Tutorials",name:"Legal Eagle YouTube",url:"https://www.youtube.com/channel/UCpa-Zb0ZcQjTCPP1Dx_1M8Q"},
    {industry:"Legal",type:"Tutorials",name:"Lawline",url:"https://www.lawline.com"},
    {industry:"Legal",type:"Tutorials",name:"Crash Course Government",url:"https://www.youtube.com/playlist?list=PL8dPuuaLjXtOfse2ncvffeelTrqvhrz8H"},
    {industry:"Legal",type:"Certificates/University Courses",name:"Yale \u2013 Constitutional Law",url:"https://oyc.yale.edu/political-science/plsc-270"},
    {industry:"Legal",type:"Certificates/University Courses",name:"University of London \u2013 Law",url:"https://london.ac.uk/courses/law"},
    // Banking
    {industry:"Banking",type:"Books",name:"The Ascent of Money by Niall Ferguson",url:"https://www.amazon.com/Ascent-Money-Financial-History-World/dp/0143116177"},
    {industry:"Banking",type:"Books",name:"Liar\u2019s Poker by Michael Lewis",url:"https://www.amazon.com/Liars-Poker-Rising-Through-Wreckage/dp/039333869X"},
    {industry:"Banking",type:"Books",name:"The Big Short by Michael Lewis",url:"https://www.amazon.com/Big-Short-Inside-Doomsday-Machine/dp/0393338827"},
    {industry:"Banking",type:"Books",name:"Money by Felix Martin",url:"https://www.amazon.com/Money-Unauthorized-Biography-Felix-Martin/dp/0345803558"},
    {industry:"Banking",type:"Books",name:"Stress Test by Timothy Geithner",url:"https://www.amazon.com/Stress-Test-Reflections-Financial-Crises/dp/0804138613"},
    {industry:"Banking",type:"Websites",name:"Investopedia",url:"https://www.investopedia.com"},
    {industry:"Banking",type:"Websites",name:"Federal Reserve Education",url:"https://www.federalreserveeducation.org"},
    {industry:"Banking",type:"Websites",name:"Banking Dive",url:"https://www.bankingdive.com"},
    {industry:"Banking",type:"Websites",name:"Financial Times",url:"https://www.ft.com"},
    {industry:"Banking",type:"Websites",name:"Morningstar",url:"https://www.morningstar.com"},
    {industry:"Banking",type:"LinkedIn Courses",name:"Finance Foundations",url:"https://www.linkedin.com/learning/finance-foundations-2019-the-essentials"},
    {industry:"Banking",type:"LinkedIn Courses",name:"Corporate Finance Foundations",url:"https://www.linkedin.com/learning/corporate-finance-foundations"},
    {industry:"Banking",type:"Coursera",name:"Financial Markets (Yale)",url:"https://www.coursera.org/learn/financial-markets-global"},
    {industry:"Banking",type:"Coursera",name:"Investment Management (Geneva)",url:"https://www.coursera.org/specializations/investment-management"},
    {industry:"Banking",type:"Coursera",name:"Business and Financial Modeling (Wharton)",url:"https://www.coursera.org/specializations/wharton-business-financial-modeling"},
    {industry:"Banking",type:"Coursera",name:"Introduction to Finance (Michigan)",url:"https://www.coursera.org/learn/finance-for-non-finance"},
    {industry:"Banking",type:"Coursera",name:"Economics of Money and Banking (Columbia)",url:"https://www.coursera.org/learn/money-banking"},
    {industry:"Banking",type:"Tutorials",name:"Investopedia Tutorials",url:"https://www.investopedia.com/financial-education-4427764"},
    {industry:"Banking",type:"Tutorials",name:"Wall Street Prep Blog",url:"https://www.wallstreetprep.com/knowledge/"},
    {industry:"Banking",type:"Certificates/University Courses",name:"Harvard Online \u2013 Financial Accounting",url:"https://online.hbs.edu/courses/financial-accounting/"},
    {industry:"Banking",type:"Certificates/University Courses",name:"Wharton \u2013 Business and Financial Modeling",url:"https://online.wharton.upenn.edu/"},
    {industry:"Banking",type:"Certificates/University Courses",name:"Columbia \u2013 Corporate Finance",url:"https://online.columbia.edu/courses/corporate-finance/"},
    // Business
    {industry:"Business",type:"Books",name:"The Lean Startup by Eric Ries",url:"https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898"},
    {industry:"Business",type:"Books",name:"Start with Why by Simon Sinek",url:"https://www.amazon.com/Start-Why-Leaders-Inspire-Everyone/dp/1591846447"},
    {industry:"Business",type:"Books",name:"Blue Ocean Strategy by W. Chan Kim",url:"https://www.amazon.com/Blue-Ocean-Strategy-Uncontested-Competition/dp/1625274491"},
    {industry:"Business",type:"Books",name:"The Innovator\u2019s Dilemma by Clayton Christensen",url:"https://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation/dp/1633691780"},
    {industry:"Business",type:"Books",name:"Zero to One by Peter Thiel",url:"https://www.amazon.com/Zero-One-Peter-Thiel-Blake-Masters/dp/0753555190"},
    {industry:"Business",type:"Websites",name:"Entrepreneur",url:"https://www.entrepreneur.com"},
    {industry:"Business",type:"Websites",name:"Harvard Business Review",url:"https://hbr.org"},
    {industry:"Business",type:"Websites",name:"SBA.gov",url:"https://www.sba.gov"},
    {industry:"Business",type:"Websites",name:"Fast Company",url:"https://www.fastcompany.com"},
    {industry:"Business",type:"Websites",name:"Business Insider",url:"https://www.businessinsider.com"},
    {industry:"Business",type:"LinkedIn Courses",name:"Business Analysis Foundations",url:"https://www.linkedin.com/learning/business-analysis-foundations"},
    {industry:"Business",type:"LinkedIn Courses",name:"Business Strategy",url:"https://www.linkedin.com/learning/business-development-foundations"},
    {industry:"Business",type:"LinkedIn Courses",name:"Business Development Foundations",url:"https://www.linkedin.com/learning/entrepreneurship-foundations"},
    {industry:"Business",type:"LinkedIn Courses",name:"Entrepreneurship Foundations",url:"https://www.linkedin.com/learning/developing-business-acumen"},
    {industry:"Business",type:"LinkedIn Courses",name:"Developing Business Acumen",url:"https://www.coursera.org/specializations/wharton-business-foundations"},
    {industry:"Business",type:"Coursera",name:"Business Foundations (Wharton)",url:"https://www.coursera.org/specializations/digital-marketing"},
    {industry:"Business",type:"Tutorials",name:"HubSpot Academy",url:"https://academy.hubspot.com"},
    {industry:"Business",type:"Tutorials",name:"SBA Learning Center",url:"https://learn.sba.gov"},
    {industry:"Business",type:"Tutorials",name:"Score.org Business Tutorials",url:"https://www.score.org"},
    {industry:"Business",type:"Certificates/University Courses",name:"Harvard \u2013 CORe Business Program",url:"https://online.hbs.edu/courses/core/"},
    {industry:"Business",type:"Certificates/University Courses",name:"Wharton Online Business Certificates",url:"https://online.wharton.upenn.edu/"},
    {industry:"Business",type:"Certificates/University Courses",name:"Cornell \u2013 Business Strategy Certificate",url:"https://ecornell.cornell.edu/certificates/business-strategy/"},
    {industry:"Business",type:"Certificates/University Courses",name:"Stanford \u2013 Innovation and Entrepreneurship",url:"https://online.stanford.edu/programs/innovation-and-entrepreneurship"},
    // Education
    {industry:"Education",type:"Books",name:"The Courage to Teach by Parker J. Palmer",url:"https://www.amazon.com/Courage-Teach-Exploring-Inner-Landscape/dp/1119413044"},
    {industry:"Education",type:"Books",name:"Teach Like a Champion by Doug Lemov",url:"https://www.amazon.com/Teach-Like-Champion-Techniques-Your/dp/1119712610"},
    {industry:"Education",type:"Books",name:"What the Best College Teachers Do by Ken Bain",url:"https://www.amazon.com/What-Best-College-Teachers-Do/dp/0674013255"},
    {industry:"Education",type:"Books",name:"Pedagogy of the Oppressed by Paulo Freire",url:"https://www.amazon.com/Pedagogy-Oppressed-Paulo-Freire/dp/1501314130"},
    {industry:"Education",type:"Books",name:"Mindset by Carol Dweck",url:"https://www.amazon.com/Mindset-Psychology-Carol-S-Dweck/dp/0345472322"},
    {industry:"Education",type:"Websites",name:"Edutopia",url:"https://www.edutopia.org"},
    {industry:"Education",type:"Websites",name:"Inside Higher Ed",url:"https://www.insidehighered.com"},
    {industry:"Education",type:"Websites",name:"Chronicle of Higher Education",url:"https://www.chronicle.com"},
    {industry:"Education",type:"Websites",name:"ASCD",url:"https://www.ascd.org"},
    {industry:"Education",type:"Websites",name:"Education Week",url:"https://www.edweek.org"},
    {industry:"Education",type:"LinkedIn Courses",name:"Instructional Design Essentials",url:"https://www.linkedin.com/learning/instructional-design-essentials-models-of-id"},
    {industry:"Education",type:"LinkedIn Courses",name:"Teaching Techniques",url:"https://www.linkedin.com/learning/teaching-techniques-blended-learning"},
    {industry:"Education",type:"Coursera",name:"Virtual Teacher Program",url:"https://www.coursera.org/professional-certificates/virtual-teacher"},
    {industry:"Education",type:"Tutorials",name:"OpenLearn \u2013 Teaching and Learning",url:"https://www.open.edu/openlearn/education"},
    {industry:"Education",type:"Tutorials",name:"Coursera \u2013 Learning to Teach Online",url:"https://www.coursera.org/learn/teach-online"},
    {industry:"Education",type:"Tutorials",name:"PBS LearningMedia",url:"https://www.pbslearningmedia.org"},
    {industry:"Education",type:"Tutorials",name:"YouTube \u2013 Cult of Pedagogy",url:"https://www.youtube.com/c/CultofPedagogy"},
    // Sports
    {industry:"Sports",type:"Books",name:"Relentless by Tim Grover",url:"https://www.amazon.com/Relentless-Unstoppable-Tim-S-Grover/dp/1476714207"},
    {industry:"Sports",type:"Books",name:"The Champion\u2019s Mind by Jim Afremow",url:"https://www.amazon.com/Champions-Mind-Great-Athletes-Think/dp/1623365627"},
    {industry:"Sports",type:"Books",name:"Mind Gym by Gary Mack",url:"https://www.amazon.com/Mind-Gym-Athletes-Guide-Excellence/dp/0071395970"},
    {industry:"Sports",type:"Books",name:"Eleven Rings by Phil Jackson",url:"https://www.amazon.com/Eleven-Rings-Soul-Success/dp/0143125346"},
    {industry:"Sports",type:"Books",name:"The Mamba Mentality by Kobe Bryant",url:"https://www.amazon.com/Mamba-Mentality-How-Play/dp/0374201234"},
    {industry:"Sports",type:"Websites",name:"NCAA",url:"https://www.ncaa.org"},
    {industry:"Sports",type:"Websites",name:"NSCA",url:"https://www.nsca.com"},
    {industry:"Sports",type:"Websites",name:"SportsEngine",url:"https://www.sportsengine.com"},
    {industry:"Sports",type:"Websites",name:"Team USA",url:"https://www.teamusa.org"},
    {industry:"Sports",type:"Websites",name:"Coaching Association of Canada",url:"https://coach.ca"},
    {industry:"Sports",type:"LinkedIn Courses",name:"Coaching Skills for Leaders",url:"https://www.linkedin.com/learning/coaching-skills-for-leaders-and-managers"},
    {industry:"Sports",type:"LinkedIn Courses",name:"Sports and Society",url:"https://www.linkedin.com/learning/sports-and-society"},
    {industry:"Sports",type:"Coursera",name:"Sports Marketing",url:"https://www.coursera.org/learn/sports-marketing"},
    {industry:"Sports",type:"Coursera",name:"The Science of Exercise",url:"https://www.coursera.org/learn/science-exercise"},
    {industry:"Sports",type:"Tutorials",name:"Coaching Library \u2013 NFHS Learn",url:"https://nfhslearn.com"},
    {industry:"Sports",type:"Tutorials",name:"YouTube \u2013 CoachTube",url:"https://www.youtube.com/c/CoachTube"},
    {industry:"Sports",type:"Tutorials",name:"AthletesGoLive Training",url:"https://www.athletesgolive.com"},
    {industry:"Sports",type:"Tutorials",name:"NSCA Coaching Resources",url:"https://www.nsca.com/certification/cscs/"},
    {industry:"Sports",type:"Certificates/University Courses",name:"NFHS \u2013 Coaching Education",url:"https://nfhslearn.com/courses"},
    {industry:"Sports",type:"Certificates/University Courses",name:"University of Florida \u2013 Sport Management Certificate",url:"https://www.ufsportmanagement.com/"},
    {industry:"Sports",type:"Certificates/University Courses",name:"Ohio University \u2013 Coaching Education Program",url:"https://www.ohio.edu/education/academic-programs/coach"},
    // IT
    {industry:"IT",type:"Books",name:"The Phoenix Project by Gene Kim",url:"https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/1942788290"},
    {industry:"IT",type:"Books",name:"Site Reliability Engineering by Google",url:"https://sre.google/books/"},
    {industry:"IT",type:"Books",name:"Networking All-in-One For Dummies by Doug Lowe",url:"https://www.amazon.com/Networking-All-One-Dummies-Computer/dp/1119471605"},
    {industry:"IT",type:"Books",name:"Cybersecurity and Cyberwar by P.W. Singer",url:"https://www.amazon.com/Cybersecurity-Cyberwar-What-Everyone-Needs/dp/0199918112"},
    {industry:"IT",type:"Websites",name:"TechRepublic",url:"https://www.techrepublic.com"},
    {industry:"IT",type:"Websites",name:"Cisco Networking Academy",url:"https://www.netacad.com"},
    {industry:"IT",type:"Websites",name:"CompTIA",url:"https://www.comptia.org"},
    {industry:"IT",type:"Websites",name:"CNET",url:"https://www.cnet.com"},
    {industry:"IT",type:"Websites",name:"How-To Geek",url:"https://www.howtogeek.com"},
    {industry:"IT",type:"LinkedIn Courses",name:"IT Help Desk",url:"https://www.linkedin.com/learning/it-help-desk-for-beginners"},
    {industry:"IT",type:"LinkedIn Courses",name:"Network Troubleshooting",url:"https://www.linkedin.com/learning/network-troubleshooting"},
    {industry:"IT",type:"LinkedIn Courses",name:"Cybersecurity Foundations",url:"https://www.linkedin.com/learning/cybersecurity-foundations"},
    {industry:"IT",type:"Coursera",name:"Google IT Support Certificate",url:"https://www.coursera.org/professional-certificates/google-it-support"},
    {industry:"IT",type:"Coursera",name:"Cloud Computing Basics",url:"https://www.coursera.org/learn/cloud-computing"},
    {industry:"IT",type:"Coursera",name:"Introduction to Cybersecurity",url:"https://www.coursera.org/learn/intro-cyber-security"},
    {industry:"IT",type:"Tutorials",name:"Cisco IT Tutorials",url:"https://skillsforall.com"},
    {industry:"IT",type:"Tutorials",name:"Google Digital Garage \u2013 IT Support",url:"https://learndigital.withgoogle.com/digitalgarage/course/it-support"},
    {industry:"IT",type:"Certificates/University Courses",name:"Harvard CS50",url:"https://cs50.harvard.edu/x/"},
    {industry:"IT",type:"Certificates/University Courses",name:"AWS \u2013 Cloud Practitioner Certificate",url:"https://aws.amazon.com/certification/certified-cloud-practitioner/"},
    // Engineering
    {industry:"Engineering",type:"Books",name:"Structures by J.E. Gordon",url:"https://www.amazon.com/Structures-Things-Dont-Fall-Down/dp/0306812835"},
    {industry:"Engineering",type:"Books",name:"To Engineer Is Human by Henry Petroski",url:"https://www.amazon.com/Engineer-Human-Failure-Success-Design/dp/0679734163"},
    {industry:"Engineering",type:"Books",name:"Engineering Fundamentals by Saeed Moaveni",url:"https://www.amazon.com/Engineering-Fundamentals-Introduction-Engineering/dp/1305084764"},
    {industry:"Engineering",type:"Books",name:"The Art of Systems Architecting",url:"https://www.amazon.com/Art-Systems-Architecting-Third/dp/1420079131"},
    {industry:"Engineering",type:"Books",name:"Mechanical Engineering Reference Manual",url:"https://www.amazon.com/Mechanical-Engineering-Reference-Manual-13th/dp/1591264146"},
    {industry:"Engineering",type:"Websites",name:"Engineering.com",url:"https://www.engineering.com"},
    {industry:"Engineering",type:"Websites",name:"ASME",url:"https://www.asme.org"},
    {industry:"Engineering",type:"Websites",name:"IEEE",url:"https://www.ieee.org"},
    {industry:"Engineering",type:"Websites",name:"EngineerGirl",url:"https://www.engineergirl.org"},
    {industry:"Engineering",type:"Websites",name:"MIT OCW \u2013 Engineering",url:"https://ocw.mit.edu/courses/find-by-topic/#cat=engineering"},
    {industry:"Engineering",type:"LinkedIn Courses",name:"AutoCAD Essential Training",url:"https://www.linkedin.com/learning/autocad-2021-essential-training"},
    {industry:"Engineering",type:"LinkedIn Courses",name:"Engineering Drawing and Design",url:"https://www.linkedin.com/learning/search?keywords=engineering%20drawing"},
    {industry:"Engineering",type:"Coursera",name:"Electrical Engineering for Everyone",url:"https://www.coursera.org/learn/electric-power-systems"},
    {industry:"Engineering",type:"Coursera",name:"Engineering Project Management",url:"https://www.coursera.org/specializations/engineering-project-management"},
    {industry:"Engineering",type:"Tutorials",name:"MIT OpenCourseWare \u2013 Engineering",url:"https://ocw.mit.edu/courses/find-by-topic/#cat=engineering"},
    {industry:"Engineering",type:"Tutorials",name:"All About Circuits",url:"https://www.allaboutcircuits.com"},
    {industry:"Engineering",type:"Certificates/University Courses",name:"Georgia Tech \u2013 Online MS Engineering",url:"https://pe.gatech.edu/degrees/online-masters"}
  ];

  // ═══ 8. GLOBAL FUNCTIONS (assigned to window for inline onclick handlers) ═══
  window.mgToggleMenu = function() {
    var menu = document.getElementById('mg-mobileMenu');
    if (menu) menu.classList.toggle('open');
  };
  window.mgCloseMenu = function() {
    var menu = document.getElementById('mg-mobileMenu');
    if (menu) menu.classList.remove('open');
  };
  window.mgToggleAccordion = function(btn) {
    var item = btn.parentElement;
    var isOpen = item.classList.contains('open');
    root.querySelectorAll('.accordion-item').forEach(function(el) { el.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  };
  window.mgSelectMQCategory = function(card, categoryId) {
    root.querySelectorAll('.mq-category-card').forEach(function(c) { c.classList.remove('active'); });
    root.querySelectorAll('.mq-questions-panel').forEach(function(p) { p.classList.remove('active'); });
    card.classList.add('active');
    var panel = document.getElementById('mg-mq-' + categoryId);
    if (panel) panel.classList.add('active');
  };
  window.mgShowPathway = function(key) {
    var pw = pathways[key];
    if (!pw) return;
    var modal = document.getElementById('mg-pathwayModal');
    var title = document.getElementById('mg-modalTitle');
    var body = document.getElementById('mg-modalBody');
    title.textContent = pw.title;
    var html = '<h3>Overview</h3><p>' + pw.overview + '</p><h3>Common Roles</h3><ul>';
    pw.roles.forEach(function(role) { html += '<li><strong>' + role.title + ':</strong> ' + role.desc + '</li>'; });
    html += '</ul><h3>Education &amp; Training</h3><ul>';
    pw.education.forEach(function(ed) { html += '<li>' + ed + '</li>'; });
    html += '</ul><h3>Core Skills</h3><ul>';
    pw.skills.forEach(function(skill) { html += '<li>' + skill + '</li>'; });
    html += '</ul><h3>Salary Ranges</h3><table class="salary-table"><tr><td>Entry-Level:</td><td>' + pw.salary.entry + '</td></tr><tr><td>Mid-Career:</td><td>' + pw.salary.mid + '</td></tr><tr><td>Senior-Level:</td><td>' + pw.salary.senior + '</td></tr></table><h3>Getting Started</h3><p>' + pw.tips + '</p><h3>Reflection Questions</h3><ul class="reflection-list">';
    pw.reflection.forEach(function(q) { html += '<li>' + q + '</li>'; });
    html += '</ul><h3>Discussion Topics with Your Mentor</h3><ul class="discussion-list">';
    pw.discussion.forEach(function(q) { html += '<li>' + q + '</li>'; });
    html += '</ul>';
    body.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.mgClosePathway = function() {
    var modal = document.getElementById('mg-pathwayModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  // Close modal on backdrop click
  modalWrap.addEventListener('click', function(e) {
    if (e.target === modalWrap) window.mgClosePathway();
  });
  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.mgClosePathway();
  });

  var currentIndustryFilter = '';
  var currentTypeFilter = 'all';
  window.mgFilterResources = function() {
    var el = document.getElementById('mg-industryFilter');
    if (el) currentIndustryFilter = el.value;
    renderResources();
  };
  window.mgFilterByType = function(type, btn) {
    root.querySelectorAll('.filter-type .filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    currentTypeFilter = type;
    renderResources();
  };
  function renderResources() {
    var filtered = resources.filter(function(r) {
      var industryMatch = !currentIndustryFilter || r.industry === currentIndustryFilter;
      var typeMatch = currentTypeFilter === 'all' || r.type === currentTypeFilter;
      return industryMatch && typeMatch;
    });
    var grid = document.getElementById('mg-resourceGrid');
    var count = document.getElementById('mg-resourceCount');
    if (!grid || !count) return;
    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--mg-gray-600);">No resources found. Try adjusting your filters.</div>';
      count.textContent = '';
      return;
    }
    var typeIcons = {
      'Books': ['📖', 'book'],
      'Websites': ['🌐', 'web'],
      'LinkedIn Courses': ['🎓', 'course'],
      'Coursera': ['🎓', 'course'],
      'Tutorials': ['▶', 'tutorial'],
      'Certificates/University Courses': ['🏅', 'cert']
    };
    grid.innerHTML = filtered.map(function(r) {
      var pair = typeIcons[r.type] || ['📄', 'web'];
      return '<a href="' + r.url + '" target="_blank" rel="noopener noreferrer" class="resource-item"><div class="resource-type-icon ' + pair[1] + '">' + pair[0] + '</div><div class="resource-info"><h4>' + r.name + '</h4><span>' + r.type + ' · ' + r.industry + '</span></div></a>';
    }).join('');
    count.textContent = 'Showing ' + filtered.length + ' of ' + resources.length + ' resources';
  }

  // ═══ 9. INITIAL RENDER + FADE-UP OBSERVER ═══
  function initReveal() {
    renderResources();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      root.querySelectorAll('.fade-up').forEach(function(el) { io.observe(el); });
    } else {
      root.querySelectorAll('.fade-up').forEach(function(el) { el.classList.add('visible'); });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
