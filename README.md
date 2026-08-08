# 인스타그램 스타일 개인 아카이브

좋아하는 배우의 사진을 직접 모아서 인스타그램처럼 보여주는 간단한 사이트입니다.  
**코딩을 몰라도** 따라할 수 있도록 만들었습니다.

---

## 📁 폴더 구조

```
instagram-gallery/
├── index.html          ← 메인 페이지
├── css/
│   └── style.css
├── js/
│   ├── posts.js        ← ★ 여기만 수정하면 됩니다
│   └── script.js
├── images/             ← 사진 넣는 폴더
│   └── (여기에 사진들 넣기)
└── README.md
```

---

## 🚀 사용 방법 (초보자용)

### 1. 사진 준비
1. 인스타그램에서 원하는 사진을 **하나씩** 다운로드합니다.
2. `images` 폴더에 넣습니다.
   - 예: `1.jpg`, `2.jpg`, `actor01.jpg` 등 원하는 이름으로
3. 프로필 사진도 `images/profile.jpg`로 넣으면 자동으로 표시됩니다.

### 2. 게시물 등록하기 (가장 중요!)
`js/posts.js` 파일을 메모장이나 VS Code로 엽니다.

아래처럼 추가하면 됩니다:

```js
const posts = [
  {
    src: "images/1.jpg",
    caption: "영화 촬영 현장"
  },
  {
    src: "images/2.jpg",
    caption: "시상식 모습"
  },
  {
    src: "images/3.jpg",
    caption: ""
  },
];
```

- `src`: 사진 경로 (images 폴더 기준)
- `caption`: 사진 아래 설명 (없어도 됨, 빈 문자열 `""` 가능)

프로필 정보도 같은 파일에서 수정할 수 있습니다:

```js
const profile = {
  username: "your_favorite_actor",
  displayName: "배우 이름",
  bio: "직접 모아둔 개인 아카이브입니다.",
};
```

### 3. 로컬에서 미리보기
`index.html` 파일을 더블클릭해서 브라우저로 열어보세요.  
사진이 잘 나오는지 확인합니다.

---

## 🌐 GitHub Pages에 올리기 (초보자 단계별)

### 준비
1. [GitHub](https://github.com) 회원가입 / 로그인
2. 오른쪽 위 **+** 버튼 → **New repository** 클릭
3. Repository name 예: `my-actor-archive`
4. **Public** 선택
5. **Create repository** 클릭

### 파일 올리기
1. 방금 만든 저장소 페이지에서 **uploading an existing file** 클릭
2. `instagram-gallery` 폴더 안의 **모든 파일과 폴더**를 드래그해서 올립니다  
   (index.html, css 폴더, js 폴더, images 폴더 전부)
3. 맨 아래 **Commit changes** 클릭

### 사이트 공개하기
1. 저장소 페이지에서 **Settings** 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. Source를 **Deploy from a branch**로 선택
4. Branch를 **main** (또는 master)로 선택하고 **Save**
5. 1~2분 기다리면  
   `https://당신의아이디.github.io/저장소이름/` 주소가 생깁니다.

이제 그 주소로 들어가면 사이트가 보입니다!

---

## 💡 팁

- 사진을 더 추가할 때마다 `js/posts.js`에만 한 줄씩 추가하면 됩니다.
- 다크모드는 오른쪽 위 버튼으로 전환할 수 있습니다.
- 사진은 가로세로 비율이 달라도 자동으로 네모나게 잘립니다 (인스타그램처럼).
- 모바일에서도 잘 보이게 만들어져 있습니다.

---

## 주의사항
- 이 사이트는 **개인 소장용**으로만 사용하세요.
- 다른 사람 사진을 무단으로 대량 공개하거나 상업적으로 사용하면 저작권 문제가 생길 수 있습니다.
- Instagram 공식 서비스가 아닙니다.

궁금한 점이 있으면 언제든 물어보세요!
