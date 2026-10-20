// Mobile navigation
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();

// Footer year
document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

// Contact form: opens WhatsApp or the email app with the message already written
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var WHATSAPP = '2348161711413';
  var EMAIL = 'hellobloova@gmail.com';

  function compose() {
    var d = new FormData(form);
    var lines = [
      'Hello Bloova, I would like to start a conversation.',
      '',
      'Name: ' + (d.get('name') || ''),
      'Brand or company: ' + (d.get('company') || 'Not provided'),
      'Email: ' + (d.get('email') || ''),
      'What I need: ' + (d.get('service') || ''),
      '',
      (d.get('message') || '')
    ];
    return lines.join('\n');
  }

  form.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-send]');
    if (!btn) return;
    e.preventDefault();
    if (!form.reportValidity()) return;
    var body = compose();
    if (btn.dataset.send === 'whatsapp') {
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(body), '_blank', 'noopener');
    } else {
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('New project enquiry') + '&body=' + encodeURIComponent(body);
    }
  });
})();
