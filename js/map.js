// Extracted from original portfolio index.html
(function(){
      // Load Leaflet CSS and JS dynamically
      if(!document.getElementById('leaflet-css')){
        var css = document.createElement('link');
        css.id = 'leaflet-css';
        css.rel = 'stylesheet';
        css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(css);
      }

      function initMap(){
        if(typeof L === 'undefined'){ setTimeout(initMap, 100); return; }
        var mapEl = document.getElementById('operator-map');
        if(!mapEl) return;
        // If already initialized, just fix the size
        if(mapEl._leaflet_id){
          if(mapEl._leaflet_map){
            mapEl._leaflet_map.invalidateSize();
          }
          return;
        }

        var map = L.map('operator-map', {
          center: [40.15, -76.55],
          zoom: 10,
          zoomControl: true,
          attributionControl: false,
          scrollWheelZoom: true,
          tap: false
        });

        // Only stop propagation if click is NOT on a Leaflet marker/popup
        document.getElementById('operator-map').addEventListener('click', function(e){
          e.stopPropagation();
        }, false);

        // Store map reference on element for later access
        document.getElementById('operator-map')._leaflet_map = map;

        // Dark tile layer — CartoDB Dark Matter
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd'
        }).addTo(map);

        // Custom icon factory
        function makeIcon(color, shape, size, glow){
          var svg = '';
          if(shape === 'circle'){
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'"><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2-2)+'" fill="'+color+'" stroke="#080808" stroke-width="2"/><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2+4)+'" fill="'+color+'" opacity="0.2"/></svg>';
          } else if(shape === 'triangle'){
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'"><polygon points="'+(size/2)+',2 '+(size-2)+','+(size-2)+' 2,'+(size-2)+'" fill="'+color+'" stroke="#080808" stroke-width="1.5"/></svg>';
          } else if(shape === 'diamond'){
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'"><polygon points="'+(size/2)+',2 '+(size-2)+','+(size/2)+' '+(size/2)+','+(size-2)+' 2,'+(size/2)+'" fill="'+color+'" stroke="#080808" stroke-width="2"/><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2+5)+'" fill="'+color+'" opacity="0.15"/></svg>';
          } else if(shape === 'star'){
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'"><polygon points="'+(size/2)+',2 '+(size*0.61)+','+(size*0.35)+' '+(size-2)+','+(size*0.35)+' '+(size*0.68)+','+(size*0.57)+' '+(size*0.79)+','+(size-2)+' '+(size/2)+','+(size*0.70)+' '+(size*0.21)+','+(size-2)+' '+(size*0.32)+','+(size*0.57)+' 2,'+(size*0.35)+' '+(size*0.39)+','+(size*0.35)+'" fill="'+color+'" stroke="#080808" stroke-width="1"/><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2+6)+'" fill="'+color+'" opacity="0.2"/></svg>';
          } else if(shape === 'dot'){
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'"><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2-2)+'" fill="'+color+'" opacity="0.8" stroke="#080808" stroke-width="1"/></svg>';
          }
          return L.divIcon({
            html: svg,
            className: '',
            iconSize: [size, size],
            iconAnchor: [size/2, size/2],
            popupAnchor: [0, -(size/2+5)]
          });
        }

        // Popup style
        var popStyle = 'background:#0a0a0a;border:1px solid rgba(111,236,184,0.3);border-radius:3px;padding:10px 14px;font-family:Share Tech Mono,monospace;min-width:200px;';
        var redPopStyle = 'background:#0a0a0a;border:1px solid rgba(255,45,107,0.4);border-radius:3px;padding:10px 14px;font-family:Share Tech Mono,monospace;min-width:200px;';

        function popup(label, sub, desc, color, isRed){
          var s = isRed ? redPopStyle : popStyle;
          var bc = isRed ? '#ff2d6b' : (color || '#6FECB8');
          return '<div style="'+s+'"><div style="font-size:9px;color:'+bc+';letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">'+label+'</div><div style="font-size:11px;color:#eeeee4;margin-bottom:5px;">'+sub+'</div><div style="font-size:11px;color:#9a9a90;line-height:1.5;">'+desc+'</div></div>';
        }

        // Remove default popup styles interference
        L.Popup.prototype.options.className = 'cyber-popup';

        // ── MARKERS ──
        function addMarker(lat, lng, icon, popupContent){
          var m = L.marker([lat, lng], {icon: icon}).addTo(map);
          m.bindPopup(popupContent, {className:'cyber-popup', maxWidth:260});
          m.on('click', function(e){
            L.DomEvent.stopPropagation(e.originalEvent);
            this.openPopup();
          });
          return m;
        }

        // Home — Marietta PA
        addMarker(40.0529, -76.5527, makeIcon('#6FECB8','circle',14),
          popup('HOME BASE','Marietta, PA','Current location. Open to work and ready to deploy.','#6FECB8'));

        // Thaddeus Stevens — Lancaster
        addMarker(40.0356, -76.3016, makeIcon('#6FECB8','triangle',12),
          popup('EDUCATION','Lancaster, PA','Thaddeus Stevens College of Technology<br>Computer Software &amp; IS Certificate'));

        // Avflight — Harrisburg International Airport
        addMarker(40.1935, -76.7634, makeIcon('#6FECB8','triangle',12),
          popup('OP: AVFLIGHT','Harrisburg, PA','Line Technician · May 2024 – Jan 2025<br>Aviation ops, FAA compliance.'));

        // Just Press Play — Willow Street
        addMarker(39.9793, -76.2763, makeIcon('#6FECB8','triangle',12),
          popup('OP: JUST PRESS PLAY','Willow Street, PA','Retail Associate · Sep 2021 – May 2024<br>Hardware diagnostics, tech support.'));

        // Amazon — Elizabethtown
        addMarker(40.1523, -76.6024, makeIcon('#6FECB8','triangle',12),
          popup('OP: AMAZON','Elizabethtown, PA','Distribution Associate · Aug 2019 – Sep 2021<br>WMS, 1,000+ packages/shift.'));

        // Foot Locker — Camp Hill
        addMarker(40.2400, -76.9219, makeIcon('#F5E642','diamond',16),
          popup('LAST OP: FOOT LOCKER','Camp Hill, PA · Remote','IT Deployment Analyst · Apr 2025 – Mar 2026<br>1,000+ locations · 3 continents · 2,000+ devices.','#F5E642'));





        // Waypoint — Meet Hanako at Embers
        addMarker(39.9626, -76.7277, makeIcon('#ff2d6b','star',16),
          popup('⚠ WAYPOINT','Destination Unknown','Meet Hanako at Embers.<br>// still working on it.','#ff2d6b', true));

        // Add Leaflet CSS override for dark popups
        var style = document.createElement('style');
        style.textContent = '.cyber-popup .leaflet-popup-content-wrapper{background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}.cyber-popup .leaflet-popup-content{margin:0!important}.cyber-popup .leaflet-popup-tip-container{display:none!important}';
        document.head.appendChild(style);
      }

      // Load Leaflet JS
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = function(){ setTimeout(initMap, 100); };
      document.body.appendChild(script);

      // Re-init when tab becomes active
      document.querySelectorAll('.nav-links a').forEach(function(a){
        a.addEventListener('click', function(e){
          e.stopPropagation();
          if(this.getAttribute('onclick') && this.getAttribute('onclick').indexOf('experience') !== -1){
            setTimeout(function(){
              initMap();
              setTimeout(function(){
                var m = document.getElementById('operator-map');
                if(m && m._leaflet_map) m._leaflet_map.invalidateSize();
              }, 300);
            }, 200);
          }
        });
      });
    })();
