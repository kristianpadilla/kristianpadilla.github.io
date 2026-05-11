// Loads HTML partials, then loads scripts that depend on those partials existing.
(function(){
  const scripts = ['js/typing.js','js/progress.js','js/map.js','js/main.js'];

  function loadScript(src){
    return new Promise(function(resolve, reject){
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function(){ reject(new Error('Failed to load '+src)); };
      document.body.appendChild(s);
    });
  }

  function loadPartials(){
    const slots = Array.from(document.querySelectorAll('[data-include]'));
    return Promise.all(slots.map(function(slot){
      const url = slot.getAttribute('data-include');
      return fetch(url)
        .then(function(res){
          if(!res.ok) throw new Error('Failed to fetch '+url);
          return res.text();
        })
        .then(function(html){ slot.outerHTML = html; });
    }));
  }

  function boot(){
    loadPartials()
      .then(function(){
        return scripts.reduce(function(chain, src){
          return chain.then(function(){ return loadScript(src); });
        }, Promise.resolve());
      })
      .catch(function(err){
        console.error(err);
        const root = document.getElementById('pages-root');
        if(root){
          root.innerHTML = '<div class="section"><h2>Portfolio failed to load</h2><p>Please open this site through GitHub Pages or a local web server, not directly from the file system.</p></div>';
        }
      });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
