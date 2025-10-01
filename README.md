# 인테리어 시공 포트폴리오 사이트

15년 경력의 전문 인테리어 시공 업체를 위한 원페이지 포트폴리오 및 견적 문의 사이트입니다.

## 🚀 주요 기능

- **반응형 원페이지 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **포트폴리오 갤러리**: 6개의 시공 사례를 카드 형태로 전시
- **모달 상세보기**: 포트폴리오 클릭 시 상세 정보 및 갤러리 표시
- **견적 문의 폼**: EmailJS를 통한 실시간 이메일 발송
- **자동 캐러셀**: 히어로 섹션의 시공 이미지 자동 슬라이드
- **회사 장점 소개**: 3가지 핵심 경쟁력 강조

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Carousel**: Swiper.js
- **Email Service**: EmailJS
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
interior-qna-site/
├── index.html              # 메인 페이지
├── vercel.json             # Vercel 배포 설정
├── css/
│   ├── style.css          # 메인 스타일시트
│   ├── responsive.css     # 반응형 스타일
│   └── components.css     # 컴포넌트별 스타일
├── js/
│   ├── main.js           # 메인 JavaScript
│   ├── carousel.js       # 캐러셀 기능
│   ├── modal.js          # 모달 기능
│   ├── form.js           # 폼 처리 및 유효성 검사
│   └── emailjs.js        # EmailJS 연동
├── images/
│   ├── hero/             # 히어로 섹션 이미지
│   ├── portfolio/        # 포트폴리오 이미지
│   └── icons/            # 아이콘 이미지
├── assets/
│   └── data/
│       └── portfolio.json # 포트폴리오 데이터
└── README.md             # 프로젝트 설명서
```

## 🎨 사이트 구성

### 1. 히어로 섹션
- 시공 이미지 캐러셀 (3개 슬라이드)
- 매력적인 카피 및 CTA 버튼
- 자동 재생 및 수동 네비게이션

### 2. 포트폴리오 섹션
- 6개 시공 사례 카드 형태 전시
- 호버 시 "자세히 보기" 버튼 표시
- 모달창으로 상세 정보 및 갤러리 제공

### 3. 회사 장점 섹션
- 전문성: 15년 경력의 전문 시공
- 신뢰성: 투명한 견적과 안전한 시공
- 만족도: 98% 고객 만족도

### 4. 견적 문의 섹션
- 고객 정보 입력 폼
- 시공 정보 및 예산 선택
- EmailJS를 통한 실시간 이메일 발송

## ⚙️ 설정 및 설치

### 1. 로컬 개발 환경 설정

```bash
# 프로젝트 클론
git clone <repository-url>
cd interior-qna-site

# 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js 서버
npx serve .
```

### 2. EmailJS 설정

1. [EmailJS](https://www.emailjs.com) 계정 생성
2. 이메일 서비스 연결 (Gmail, Outlook 등)
3. 이메일 템플릿 생성
4. `js/emailjs.js` 파일에서 설정 값 변경:

```javascript
// 실제 값으로 변경
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
const serviceID = "YOUR_SERVICE_ID";
const templateID = "YOUR_TEMPLATE_ID";
```

### 3. 이미지 준비

다음 경로에 이미지를 업로드하세요:

- `images/hero/`: 히어로 섹션 캐러셀 이미지 (3개)
- `images/portfolio/`: 포트폴리오 이미지 (6개)
- `images/portfolio/gallery/`: 포트폴리오 갤러리 이미지 (각 프로젝트당 3개)

## 🚀 배포

### Vercel 배포

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 계정 연결
3. 프로젝트 import 및 자동 배포

```bash
# Vercel CLI 사용
npm i -g vercel
vercel
```

### 커스텀 도메인 설정

Vercel 대시보드에서 커스텀 도메인을 추가할 수 있습니다.

## 📱 반응형 디자인

- **모바일**: 320px ~ 767px
- **태블릿**: 768px ~ 1023px
- **데스크톱**: 1024px 이상

## 🎯 성능 최적화

- 이미지 최적화 (WebP 포맷 권장)
- CSS/JS 압축
- CDN을 통한 정적 자원 배포
- 캐싱 헤더 설정

## 🔧 커스터마이징

### 색상 변경
`css/style.css`의 CSS 변수를 수정하세요:

```css
:root {
    --primary-color: #2C3E50;    /* 메인 색상 */
    --secondary-color: #E74C3C;  /* 강조 색상 */
    --accent-color: #3498DB;     /* 포인트 색상 */
}
```

### 포트폴리오 데이터 수정
`assets/data/portfolio.json` 파일을 편집하여 포트폴리오 정보를 변경할 수 있습니다.

### 회사 정보 수정
`assets/data/portfolio.json`의 `companyInfo` 섹션을 수정하세요.

## 📊 분석 및 모니터링

### EmailJS 통계 확인
브라우저 콘솔에서 다음 함수를 실행하여 이메일 발송 통계를 확인할 수 있습니다:

```javascript
// 이메일 발송 통계
console.log(getEmailStats());

// 이메일 로그 초기화
clearEmailLogs();
```

## 🐛 문제 해결

### 이메일 발송 실패
1. EmailJS 설정 확인
2. 네트워크 연결 상태 확인
3. 브라우저 콘솔에서 오류 메시지 확인

### 이미지 로딩 실패
1. 이미지 경로 확인
2. 이미지 파일 존재 여부 확인
3. 파일 권한 설정 확인

### 반응형 레이아웃 문제
1. 브라우저 캐시 클리어
2. CSS 미디어 쿼리 확인
3. 뷰포트 메타 태그 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

기술적 문제나 문의사항이 있으시면 다음으로 연락해주세요:

- 이메일: contact@prointerior.co.kr
- 전화: 010-1234-5678

---

**프로 인테리어** - 15년 경력의 전문 시공으로 고객의 꿈을 현실로 만들어드립니다.
