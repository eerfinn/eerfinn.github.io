// Modern Music Player Module
export function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const playToggle = document.getElementById('musicToggle');
  const playIcon = document.getElementById('playIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const musicPlayer = document.getElementById('musicPlayer');
  const musicCard = document.querySelector('.music-card');
  const musicCircleBtn = document.getElementById('musicCircleBtn');
  const musicWavesMini = document.getElementById('musicWavesMini');
  
  // Time displays
  const currentTime = document.getElementById('currentTime');
  const totalTime = document.getElementById('totalTime');
  
  // Progress controls
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressThumb = document.getElementById('progressThumb');
  
  // Volume controls
  const volumeBar = document.getElementById('volumeBar');
  const volumeFill = document.getElementById('volumeFill');
  const volumeThumb = document.getElementById('volumeThumb');
  const volumeIcon = document.getElementById('volumeIcon');
  
  // Track info elements
  const trackName = document.getElementById('trackName');
  const artistName = document.getElementById('artistName');
  const musicCompactBar = document.querySelector('.music-compact-bar');

  if (!audio || !playToggle) return;

  let isPlaying = false;
  let isDraggingProgress = false;
  let isDraggingVolume = false;
  let currentTrackIndex = 0;
  let isCardVisible = false;

  // Music playlist - you can add more tracks here
  const playlist = [
    './assets/music/Den Basito - Anak Alam.mp3',
    './assets/music/Bob Marley and The Chineke! Orchestra - Turn Your Lights Down Low (Visualiser).mp3',
    './assets/music/Den Basito - Sang Penari (Official Video) (320 KBps).mp3'
  ];

  // Function to parse artist and title from filename
  function parseArtistTitle(filename) {
    // Decode URL encoded characters
    let decoded = decodeURIComponent(filename);
    // Remove file extension
    decoded = decoded.replace(/\.[^/.]+$/, "");
    
    // Try different parsing patterns
    let artist = "Unknown Artist";
    let title = decoded;
    
    // Pattern 1: "Artist - Title" or "Artist-Title"
    if (decoded.includes(' - ')) {
      const parts = decoded.split(' - ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    }
    // Pattern 2: "Artist_Title" or "Artist Title"
    else if (decoded.includes('_')) {
      const parts = decoded.split('_');
      if (parts.length >= 2) {
        artist = parts[0].trim();
        title = parts.slice(1).join(' ').trim();
      }
    }
    
    // Clean up extra info (like quality, version, etc.)
    title = title.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
    
    return {
      artist: artist || "Unknown Artist",
      title: title || "Unknown Title"
    };
  }

  // Function to update track info from audio source  
  function updateTrackInfo() {
    if (audio.src) {
      const filename = audio.src.split('/').pop();
      const { artist, title } = parseArtistTitle(filename);
      
      // Update main player
      if (trackName) {
        trackName.classList.remove('scrolling');
        trackName.innerHTML = `<span class="track-text">${title}</span>`;
        
        setTimeout(() => {
          const trackTextEl = trackName.querySelector('.track-text');
          if (trackTextEl) {
            const textWidth = trackTextEl.scrollWidth;
            const containerWidth = trackName.offsetWidth;
            
            if (textWidth > containerWidth + 20) {
              trackName.classList.add('scrolling');
              // Duplicate text for seamless scroll
              trackName.innerHTML = `<span class="track-text">${title}<span style="padding-left: 60px;">${title}</span></span>`;
            }
          }
        }, 100);
      }
      
      if (artistName) {
        artistName.textContent = artist;
      }
    }
  }

  // Load track function
  function loadTrack(index) {
    if (playlist[index]) {
      audio.src = playlist[index];
      currentTrackIndex = index;
      updateTrackInfo();
    }
  }

  // Navigation functions
  function nextTrack() {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
    if (isPlaying) {
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }

  function prevTrack() {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex);
    if (isPlaying) {
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }

  // Load saved volume
  const savedVolume = localStorage.getItem('musicPlayerVolume') || 0.7;
  audio.volume = savedVolume;
  updateVolumeDisplay(savedVolume);

  // Play/pause toggle
  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        console.log('Audio play failed:', e);
      });
    }
  }

  // Event listeners
  playToggle.addEventListener('click', togglePlayPause);
  nextBtn?.addEventListener('click', nextTrack);
  prevBtn?.addEventListener('click', prevTrack);
  
  // Circle button click to toggle card
  musicCircleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusicCard();
  });
  
  // Click outside to hide card
  document.addEventListener('click', (e) => {
    if (!musicPlayer?.contains(e.target) && isCardVisible) {
      hideMusicCard();
    }
  });
  
  function toggleMusicCard() {
    if (isCardVisible) {
      hideMusicCard();
    } else {
      showMusicCard();
    }
  }
  
  function showMusicCard() {
    musicCard?.classList.add('show');
    isCardVisible = true;
  }
  
  function hideMusicCard() {
    musicCard?.classList.remove('show');
    isCardVisible = false;
  }

  audio.addEventListener('play', () => {
    isPlaying = true;
    playIcon.className = 'fas fa-pause';
    musicCompactBar?.classList.add('playing');
    trackName?.classList.add('playing');
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    musicCompactBar?.classList.remove('playing');
    trackName?.classList.remove('playing');
  });

  audio.addEventListener('loadedmetadata', () => {
    updateTrackInfo();
    if (totalTime) {
      totalTime.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!isDraggingProgress && audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      if (progressFill) progressFill.style.width = `${progress}%`;
      if (progressThumb) progressThumb.style.left = `${progress}%`;
      if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
    }
  });

  // Auto play next track when current track ends
  audio.addEventListener('ended', () => {
    console.log('Track ended, moving to next...'); // Debug log
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
    // Always play the next track automatically
    audio.play().catch(e => console.log('Audio play failed:', e));
  });

  // Progress bar controls
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      if (audio.duration) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
      }
    });

    // Progress dragging
    progressThumb?.addEventListener('mousedown', (e) => {
      isDraggingProgress = true;
      e.preventDefault();
      
      const handleMouseMove = (e) => {
        if (isDraggingProgress && audio.duration) {
          const rect = progressBar.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          progressFill.style.width = `${percent * 100}%`;
          progressThumb.style.left = `${percent * 100}%`;
          currentTime.textContent = formatTime(percent * audio.duration);
        }
      };

      const handleMouseUp = () => {
        if (isDraggingProgress && audio.duration) {
          const rect = progressBar.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          audio.currentTime = percent * audio.duration;
        }
        isDraggingProgress = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  }

  // Volume controls
  function updateVolumeDisplay(volume) {
    const percent = volume * 100;
    if (volumeFill) volumeFill.style.width = `${percent}%`;
    if (volumeThumb) volumeThumb.style.left = `${percent}%`;
    
    if (volumeIcon) {
      if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
      } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
      } else {
        volumeIcon.className = 'fas fa-volume-up';
      }
    }
  }

  if (volumeBar) {
    volumeBar.addEventListener('click', (e) => {
      const rect = volumeBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newVolume = Math.max(0, Math.min(1, percent));
      
      audio.volume = newVolume;
      updateVolumeDisplay(newVolume);
      localStorage.setItem('musicPlayerVolume', newVolume);
    });

    // Volume dragging
    volumeThumb?.addEventListener('mousedown', (e) => {
      isDraggingVolume = true;
      e.preventDefault();

      const handleMouseMove = (e) => {
        if (isDraggingVolume) {
          const rect = volumeBar.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          updateVolumeDisplay(percent);
          audio.volume = percent;
        }
      };

      const handleMouseUp = () => {
        if (isDraggingVolume) {
          localStorage.setItem('musicPlayerVolume', audio.volume);
        }
        isDraggingVolume = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  }

  // Format time helper
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Volume icon click to mute/unmute
  volumeIcon?.addEventListener('click', () => {
    if (audio.volume > 0) {
      localStorage.setItem('musicPlayerVolume', audio.volume);
      audio.volume = 0;
      updateVolumeDisplay(0);
    } else {
      const savedVolume = localStorage.getItem('musicPlayerVolume') || 0.7;
      audio.volume = savedVolume;
      updateVolumeDisplay(savedVolume);
    }
  });

  // Initialize with first track
  loadTrack(0);
}