function isVideo(src) {
  if (!src) return false;
  const ext = src.split('.').pop().toLowerCase();
  return ['mp4', 'mov', 'webm', 'ogg'].includes(ext);
}

function getFirstMedia(post) {
  return post.items && post.items.length > 0 ? post.items[0] : null;
}

// 프로필 정보 적용
document.getElementById('username').textContent = profile.username;
document.getElementById('display-name').textContent = profile.displayName;
document.getElementById('bio-text').textContent = profile.bio;
document.getElementById('post-count').textContent = posts.length;

if (profile.avatar) {
  document.getElementById('profile-pic').src = profile.avatar;
}
if (profile.followers) {
  document.getElementById('followers').textContent = profile.followers;
}
if (profile.following) {
  document.getElementById('following').textContent = profile.following;
}

const grid = document.getElementById('posts-grid');
const emptyState = document.getElementById('empty-state');

if (posts.length === 0) {
  emptyState.style.display = 'block';
} else {
  emptyState.style.display = 'none';

  posts.forEach((post, index) => {
    const item = document.createElement('div');
    item.className = 'post-item';
    item.dataset.index = index;

    const first = getFirstMedia(post);

    // 영상인데 썸네일이 있으면 썸네일 사용
    if (first && isVideo(first) && post.thumbnail) {
      const img = document.createElement('img');
      img.src = post.thumbnail;
      img.alt = post.caption || `게시물 ${index + 1}`;
      img.loading = 'lazy';
      item.appendChild(img);

      const playIcon = document.createElement('div');
      playIcon.className = 'play-icon';
      playIcon.innerHTML = '▶';
      item.appendChild(playIcon);
    }
    // 영상인데 썸네일 없으면 기존 방식
    else if (first && isVideo(first)) {
      const video = document.createElement('video');
      video.src = first;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.className = 'grid-video';

      const playIcon = document.createElement('div');
      playIcon.className = 'play-icon';
      playIcon.innerHTML = '▶';

      item.appendChild(video);
      item.appendChild(playIcon);
    }
    // 사진
    else if (first) {
      const img = document.createElement('img');
      img.src = first;
      img.alt = post.caption || `게시물 ${index + 1}`;
      img.loading = 'lazy';
      img.onerror = function () {
        this.style.background = '#333';
        this.alt = '불러올 수 없음';
      };
      item.appendChild(img);
    }

    if (post.items && post.items.length > 1) {
      const multi = document.createElement('div');
      multi.className = 'multi-indicator';
      multi.innerHTML = '⧉';
      item.appendChild(multi);
    }

    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });
}

let currentPostIndex = 0;
let currentMediaIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCaption = document.getElementById('lightbox-caption');
const dotsContainer = document.getElementById('lightbox-dots');

function openLightbox(postIndex) {
  if (posts.length === 0) return;
  currentPostIndex = postIndex;
  currentMediaIndex = 0;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const video = lightboxMedia.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const post = posts[currentPostIndex];
  if (!post || !post.items || post.items.length === 0) return;

  const src = post.items[currentMediaIndex];

  let captionText = post.caption || '';
  if (post.date) {
    captionText += (captionText ? '\n' : '') + post.date;
  }
  lightboxCaption.textContent = captionText;
  lightboxCaption.style.whiteSpace = 'pre-line';

  lightboxMedia.innerHTML = '';

  if (isVideo(src)) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.className = 'lightbox-video';
    lightboxMedia.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.alt = post.caption || '';
    img.className = 'lightbox-img';
    lightboxMedia.appendChild(img);
  }

  renderDots(post.items.length);
}

function renderDots(count) {
  dotsContainer.innerHTML = '';
  if (count <= 1) return;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === currentMediaIndex ? ' active' : '');
    dotsContainer.appendChild(dot);
  }
}

function showPrevMedia() {
  const post = posts[currentPostIndex];
  if (!post || !post.items) return;

  const video = lightboxMedia.querySelector('video');
  if (video) video.pause();

  currentMediaIndex = (currentMediaIndex - 1 + post.items.length) % post.items.length;
  updateLightbox();
}

function showNextMedia() {
  const post = posts[currentPostIndex];
  if (!post || !post.items) return;

  const video = lightboxMedia.querySelector('video');
  if (video) video.pause();

  currentMediaIndex = (currentMediaIndex + 1) % post.items.length;
  updateLightbox();
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', showPrevMedia);
document.getElementById('lightbox-next').addEventListener('click', showNextMedia);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrevMedia();
  if (e.key === 'ArrowRight') showNextMedia();
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) showPrevMedia();
    else showNextMedia();
  }
}, { passive: true });

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});
