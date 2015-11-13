(function(window, $) {

  window.Player = function Player($parent) {
    var pl = this;
    var sm = soundManager;
    var currentSound = null;
    
    this.sounds = [] 

    this.body = $('<span style="position:absolute;z-index:1000" class="container"><a class="icon" href="#" ' +  
      'onclick="event.preventDefault();player.trigger()"><i class="icon-resume"></i></a></span>');
    
    var $caption = $('<span style="margin-left:10px; font-size: small; color: grey;"></span>');
    pl.body.append($caption);
    $parent.append(pl.body);
    
    $(pl.body).draggable({
      containment: 'window',
      start: function() {
        $(this).addClass('sharp-180'); 
      },
      stop: function() {
        $(this).removeClass('sharp-180'); 
      }
    });
    
    function clearPlayer() {
      if (pl.sounds.length > 0) {
        $.each(pl.sounds, function(sound) {
          currentSound.stop();
          pl.sounds = [];
        });
      }
    }

    function createSound(url, id) {
      if (currentSound) {
        currentSound.stop();
      }
      
      currentSound = sm.createSound({
        id:'track',
        url: url,
        onplay: pl.events.play,
        onstop: pl.events.stop,
        onpause: pl.events.pause,
        onresume: pl.events.resume,
        onfinish: pl.events.finish,
        type: 'mp3'
      });
     
      pl.sounds.push(currentSound); 
      currentSound.play();
    };

    this.play = function(url) {
      createSound(url);
    }; 

    this.pause = function(data) {
      if (currentSound) {
        currentSound.pause();
      }
    };
    
    this.resume = function(data) {
      if (currentSound) {
        currentSound.resume();
      }
    };

    this.trigger = function() {
      if (currentSound) {
        if (currentSound.paused) {
          pl.resume();
        } else {
          pl.pause();
        }
      }
    };

    this.caption = function(text) {
      if (text) {
        $caption.html(text);
      }
    };

    this.events = {

      play: function() {
        $(pl.body).find('i').removeClass('icon-play').addClass('icon-pause'); 
      },

      stop: function() {
        $(pl.body).find('i').removeClass('icon-pause').removeClass('icon-resume'); 
      },

      pause: function() {
        $(pl.body).find('i').removeClass('icon-pause').addClass('icon-play');
      },

      resume: function() {
        $(pl.body).find('i').removeClass('icon-play').addClass('icon-pause');
      },

      finish: function() {
        $(pl.body).find('i').removeClass('icon-pause').addClass('icon-play'); 
      }

    }

  }

})(window, jQuery)
