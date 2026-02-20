/**
 * ElevenLabs Conversational AI chat support widget - loads on every page.
 * Injects the convai element and loads the official embed script.
 */
(function () {
  var el = document.createElement('elevenlabs-convai');
  el.setAttribute('agent-id', 'agent_1501khrnedqgfqc91zxwtjzf0mwr');
  document.body.appendChild(el);
  var s = document.createElement('script');
  s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
  s.async = true;
  s.type = 'text/javascript';
  document.head.appendChild(s);
})();
