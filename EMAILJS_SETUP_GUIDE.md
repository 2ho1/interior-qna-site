# 📧 EmailJS 설정 가이드

견적 문의 기능을 사용하기 위한 EmailJS 설정 방법을 단계별로 안내합니다.

## 🚀 1단계: EmailJS 계정 생성

1. **EmailJS 웹사이트 접속**
   - https://www.emailjs.com 접속
   - "Sign Up" 버튼 클릭하여 무료 계정 생성

2. **계정 정보 입력**
   - 이메일 주소 입력
   - 비밀번호 설정
   - 이메일 인증 완료

## 🔧 2단계: 이메일 서비스 연결

1. **Email Services 메뉴 이동**
   - 대시보드에서 "Email Services" 클릭
   - "Add New Service" 버튼 클릭

2. **Gmail 연결 (추천)**
   - Gmail 선택
   - Gmail 계정 로그인
   - 권한 승인
   - **Service ID** 복사 (예: `service_xxxxxxx`)

## 📝 3단계: 이메일 템플릿 생성

1. **Email Templates 메뉴 이동**
   - 대시보드에서 "Email Templates" 클릭
   - "Create New Template" 버튼 클릭

2. **템플릿 설정**
   ```
   Template Name: 견적 문의
   Subject: [견적 문의] {{customer_name}}님의 인테리어 견적 요청
   
   Content:
   안녕하세요,
   
   새로운 견적 문의가 접수되었습니다.
   
   === 고객 정보 ===
   이름: {{customer_name}}
   연락처: {{phone}}
   주소: {{address}}
   
   === 시공 정보 ===
   주거지 형태: {{property_type}}
   평수: {{area}}평
   예상 예산: {{budget}}
   희망 시공일: {{preferred_date}}
   
   === 요청사항 ===
   {{details}}
   
   === 문의 정보 ===
   문의 시간: {{submit_time}}
   브라우저: {{user_agent}}
   참조 사이트: {{referrer}}
   
   빠른 시일 내에 고객님께 연락드리겠습니다.
   
   감사합니다.
   ```

3. **템플릿 저장**
   - "Save" 버튼 클릭
   - **Template ID** 복사 (예: `template_xxxxxxx`)

## 🔑 4단계: Public Key 확인

1. **Account 메뉴 이동**
   - 대시보드에서 "Account" 클릭
   - **Public Key** 복사 (예: `xxxxxxxxxxxxxxxx`)

## ⚙️ 5단계: 코드에 설정 적용

`js/emailjs.js` 파일을 열어서 다음 값들을 실제 값으로 변경:

```javascript
// EmailJS 초기화
function initializeEmailJS() {
    // 실제 Public Key로 변경
    emailjs.init("1UhNeQb6TPSktcisp");
    
    console.log('EmailJS initialized');
}

// 견적 문의 이메일 발송
async function sendQuoteEmail(formData) {
    try {
        // 실제 Service ID와 Template ID로 변경
        const serviceID = "service_5cfjlz4";
        const templateID = "YOUR_TEMPLATE_ID"; // 템플릿 ID만 필요
        
        // 나머지 코드는 그대로 유지...
    }
}
```

### ✅ 완료된 설정:
- ✅ **Public Key**: `1UhNeQb6TPSktcisp` (적용 완료)
- ✅ **Service ID**: `service_5cfjlz4` (적용 완료)
- ✅ **Template ID**: `template_bzstmir` (적용 완료)

## 🧪 6단계: 테스트

1. **브라우저에서 테스트**
   - 사이트의 견적 문의 폼 작성
   - "무료 견적 문의하기" 버튼 클릭
   - 이메일 수신 확인

2. **오류 확인**
   - 브라우저 개발자 도구(F12) → Console 탭
   - 오류 메시지가 있다면 설정값 재확인

## 📊 7단계: 사용량 모니터링

1. **EmailJS 대시보드**
   - 월 200개 무료 이메일 제공
   - 사용량 초과 시 유료 플랜 필요

2. **로그 확인**
   - 발송된 이메일 로그 확인
   - 실패한 이메일 원인 파악

## 🔒 8단계: 보안 설정 (선택사항)

1. **Referrer 제한**
   - EmailJS 대시보드에서 도메인 제한 설정
   - 무단 사용 방지

2. **Rate Limiting**
   - 분당/시간당 발송 제한 설정
   - 스팸 방지

## ❗ 주의사항

### ⚠️ 보안
- **Public Key는 공개되어도 안전함** (클라이언트 사이드용)
- **Service ID와 Template ID도 공개 가능**
- 실제 비밀번호나 API 키는 사용하지 않음

### 📧 이메일 제한
- **무료 플랜**: 월 200개 이메일
- **유료 플랜**: 월 1,000개부터 시작 (월 $15)

### 🌐 도메인 설정
- **로컬 테스트**: `localhost`에서 테스트 가능
- **배포 후**: 실제 도메인으로 Referrer 설정 필요

## 🚀 배포 시 추가 설정

### Vercel 배포 후
1. **환경변수 설정** (선택사항)
   ```bash
   # Vercel 대시보드에서 환경변수 추가
   EMAILJS_PUBLIC_KEY=your_public_key
   EMAILJS_SERVICE_ID=your_service_id  
   EMAILJS_TEMPLATE_ID=your_template_id
   ```

2. **코드 수정** (환경변수 사용 시)
   ```javascript
   emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
   ```

## 📞 문제 해결

### 자주 발생하는 오류들:

1. **"EmailJS is not defined"**
   - EmailJS 라이브러리가 로드되지 않음
   - CDN 링크 확인

2. **"Service not found"**
   - Service ID가 잘못됨
   - 이메일 서비스 연결 확인

3. **"Template not found"**
   - Template ID가 잘못됨
   - 템플릿 생성 확인

4. **이메일이 발송되지 않음**
   - Gmail 권한 확인
   - 스팸 폴더 확인
   - 사용량 초과 여부 확인

## 📋 체크리스트

- [ ] EmailJS 계정 생성 완료
- [ ] Gmail 서비스 연결 완료
- [ ] 이메일 템플릿 생성 완료
- [ ] Public Key, Service ID, Template ID 확인
- [ ] `js/emailjs.js` 파일의 설정값 변경
- [ ] 로컬에서 테스트 완료
- [ ] 실제 이메일 수신 확인
- [ ] Vercel 배포 후 재테스트

## 🎯 완료 후 기대 효과

✅ 고객이 견적 문의 폼 작성 시 자동으로 이메일 발송  
✅ 실시간으로 견적 문의 접수  
✅ 고객 정보가 구조화된 형태로 전달  
✅ 모바일에서도 완벽하게 작동  
✅ 무료로 사용 가능 (월 200개 이메일)

---

**참고**: 이 설정은 클라이언트 사이드에서 직접 이메일을 발송하는 방식으로, 별도의 서버 구축 없이 간단하게 구현할 수 있습니다.
