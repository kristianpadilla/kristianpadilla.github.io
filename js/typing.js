// Extracted from original portfolio index.html
(function(){
      var phrases=['IT Support Professional','Help Desk Specialist','Deployment Analyst','Systems Troubleshooter','Future Cybersecurity Pro'];
      var pi=0,ci=0,deleting=false;
      function tick(){
        var el=document.getElementById('typed-text');
        if(!el)return;
        var word=phrases[pi];
        if(!deleting){
          ci++;
          el.textContent=word.slice(0,ci);
          if(ci===word.length){deleting=true;setTimeout(tick,2200);return;}
          setTimeout(tick,90);
        } else {
          ci--;
          el.textContent=word.slice(0,ci);
          if(ci===0){deleting=false;pi=(pi+1)%phrases.length;}
          setTimeout(tick,45);
        }
      }
      setTimeout(tick,1000);
    })();
