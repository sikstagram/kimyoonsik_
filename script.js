// 프로필 정보 적용
document.getElementById('username').textContent = profile.username;
document.getElementById('display-name').textContent = profile.displayName;
document.getElementById('bio-text').textContent = profile.bio;
document.getElementById('post-count').textContent = posts.length;

// 게시물 그리드 렌더링
const grid = document.getElementById('posts-grid');
const emptyState = document.getElementById('empty-state');

if (posts.length === 0) {
  emptyState.style.display = 'block';
} else {
  posts.forEach((post, index) => {
    const item = document.createElement('div');
    item.className = 'post-item';
    item.dataset.index = index;

    const img = document.createElement('img');
    img.src = post.src;
    img.alt = post.caption || `게시물 ${index + 1}`;
    img.loading = 'lazy';

    // 이미지 로드 실패 시 처리
    img.onerror = function () {
      this.style.background = '#333';
      this.alt = '이미지를 불러올 수 없습니다';
    };

    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });
}

// ===== 라이트박스 =====
let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(index) {
  if (posts.length === 0) return;
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const post = posts[currentIndex];
  lightboxImg.src = post.src;
  lightboxCaption.textContent = post.caption || '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + posts.length) % posts.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % posts.length;
  updateLightbox();
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', showPrev);
document.getElementById('lightbox-next').addEventListener('click', showNext);

// 배경 클릭 시 닫기
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// 키보드 조작
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// ===== 다크모드 =====
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
