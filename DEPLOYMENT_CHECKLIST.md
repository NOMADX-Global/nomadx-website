# 🚀 NOMADX 웹사이트 배포 전 최종 체크리스트

## ✅ 완료된 최적화 작업 (2026-01-14)

### 1. SEO 최적화
- ✅ 모든 페이지 meta 태그 완성 (title, description, keywords)
- ✅ Open Graph 태그 (Facebook 공유 최적화)
- ✅ Twitter Card 태그
- ✅ Schema.org 구조화된 데이터
- ✅ robots.txt 생성
- ✅ sitemap.xml 생성 (영문/한글 모든 페이지)
- ✅ Canonical URL 설정
- ✅ hreflang 태그 (다국어 지원)

### 2. 성능 최적화
- ✅ 이미지 lazy loading 구현
- ✅ .htaccess 캐싱 설정
- ✅ Gzip 압축 활성화
- ✅ 폰트 preload
- ✅ 보안 헤더 설정
- ✅ 404 에러 페이지

### 3. 접근성 & 사용성
- ✅ 반응형 디자인
- ✅ 키보드 네비게이션
- ✅ ARIA 레이블
- ✅ Skip to content 링크
- ✅ 색상 대비 (WCAG AA 준수)

---

## 📋 배포 전 필수 작업

### 1단계: 도메인 & 호스팅 설정

#### DNS 설정
```
A Record:
@ → 서버 IP 주소
www → 서버 IP 주소

CNAME (선택사항):
www → nomadx.life
```

#### SSL 인증서 설치
```bash
# Let's Encrypt (무료) 권장
certbot certonly --webroot -w /var/www/nomadx -d nomadx.life -d www.nomadx.life
```

#### HTTPS 강제 리다이렉트
`.htaccess` 파일에서 주석 해제:
```apache
# Line 61-65
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

### 2단계: 파일 업로드

#### FTP/SFTP로 업로드할 파일
```
📁 nomadx.life/
├── 📄 index.html
├── 📄 our-story.html
├── 📄 the-playground.html
├── 📄 partner-with-us.html
├── 📄 invest-collaborate.html
├── 📄 404.html
├── 📄 robots.txt
├── 📄 sitemap.xml
├── 📄 .htaccess
├── 📁 ko/
│   ├── 📄 index.html
│   ├── 📄 our-story.html
│   ├── 📄 the-playground.html
│   ├── 📄 partner-with-us.html
│   └── 📄 invest-collaborate.html
├── 📁 css/
│   └── 📄 style.css
└── 📁 js/
    ├── 📄 main.js
    └── 📄 playground.js
```

#### 파일 권한 설정
```bash
# 디렉토리
chmod 755 ko/ css/ js/

# HTML 파일
chmod 644 *.html ko/*.html

# 설정 파일
chmod 644 .htaccess robots.txt sitemap.xml

# CSS/JS
chmod 644 css/*.css js/*.js
```

---

### 3단계: 검색 엔진 등록

#### Google Search Console
1. https://search.google.com/search-console 접속
2. 속성 추가: `https://nomadx.life`
3. 도메인 소유권 확인 (HTML 파일 또는 DNS TXT 레코드)
4. Sitemap 제출: `https://nomadx.life/sitemap.xml`

#### Naver 웹마스터 도구 (한국 SEO 필수)
1. https://searchadvisor.naver.com/ 접속
2. 사이트 등록: `https://nomadx.life`
3. 소유권 확인
4. Sitemap 제출: `https://nomadx.life/sitemap.xml`

#### Bing Webmaster Tools
1. https://www.bing.com/webmasters 접속
2. 사이트 추가
3. Sitemap 제출

---

### 4단계: Analytics 설정

#### Google Analytics 4 설치
```html
<!-- index.html의 <head> 태그 안에 추가 -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**모든 페이지에 동일하게 추가:**
- index.html
- our-story.html
- the-playground.html
- partner-with-us.html
- invest-collaborate.html
- ko/ 폴더의 모든 페이지

#### Microsoft Clarity (선택사항)
```html
<!-- 무료 히트맵 & 세션 녹화 -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

---

### 5단계: 소셜 미디어 메타 태그 검증

#### Facebook Sharing Debugger
1. https://developers.facebook.com/tools/debug/ 접속
2. URL 입력: `https://nomadx.life`
3. "Scrape Again" 클릭
4. 미리보기 확인

#### Twitter Card Validator
1. https://cards-dev.twitter.com/validator 접속
2. URL 입력
3. 카드 미리보기 확인

#### LinkedIn Post Inspector
1. https://www.linkedin.com/post-inspector/ 접속
2. URL 검사

---

### 6단계: 성능 테스트

#### Google PageSpeed Insights
```
테스트 URL: https://pagespeed.web.dev/
목표 점수:
- Mobile: 90+
- Desktop: 95+
```

#### GTmetrix
```
테스트 URL: https://gtmetrix.com/
목표 등급: A (90+)
```

#### WebPageTest
```
테스트 URL: https://www.webpagetest.org/
Location: Seoul, South Korea (한국 사용자 대상)
```

---

### 7단계: 기능 테스트

#### 필수 테스트 항목
- [ ] 모든 페이지 로딩 확인
- [ ] 언어 전환 버튼 작동
- [ ] 모바일 메뉴 토글
- [ ] 모든 링크 작동 (내부/외부)
- [ ] Form 제출 (Microsoft Forms 링크)
- [ ] YouTube 비디오 재생
- [ ] 이미지 로딩 (lazy loading)
- [ ] 404 페이지 접근 테스트

#### 브라우저 호환성
테스트 필요 브라우저:
- [ ] Chrome (최신)
- [ ] Safari (최신)
- [ ] Firefox (최신)
- [ ] Edge (최신)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### 반응형 테스트
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667 - iPhone SE)
- [ ] Mobile (414x896 - iPhone Pro Max)

---

## 🎯 배포 후 모니터링

### 첫 주 체크리스트
- [ ] Google Search Console 크롤링 확인
- [ ] Sitemap 인덱싱 상태 확인
- [ ] Analytics 데이터 수집 확인
- [ ] 404 에러 모니터링
- [ ] 페이지 로딩 속도 확인
- [ ] 모바일 사용성 점수 확인

### 월간 체크리스트
- [ ] SEO 순위 추적
- [ ] 트래픽 분석
- [ ] 사용자 행동 분석
- [ ] Core Web Vitals 점수 확인
- [ ] 보안 업데이트 확인
- [ ] 백업 확인

---

## 📞 긴급 연락처 & 리소스

### 기술 지원
- **웹호스팅 지원**: (호스팅 업체 연락처)
- **도메인 관리**: (도메인 등록업체)
- **개발 문의**: hello@nomadx.life

### 유용한 도구
- **Uptime 모니터링**: https://uptimerobot.com/
- **SSL 검사**: https://www.ssllabs.com/ssltest/
- **보안 검사**: https://observatory.mozilla.org/
- **모바일 친화성**: https://search.google.com/test/mobile-friendly

---

## ✅ 최종 체크리스트

배포 전 마지막 확인:

### 기술적 요구사항
- [ ] SSL/HTTPS 설정 완료
- [ ] 도메인 DNS 설정 완료
- [ ] 모든 파일 업로드 완료
- [ ] 파일 권한 설정 완료
- [ ] .htaccess 작동 확인

### SEO 요구사항
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터 등록
- [ ] Sitemap 제출 완료
- [ ] robots.txt 접근 가능
- [ ] Open Graph 태그 검증

### Analytics & 모니터링
- [ ] Google Analytics 설치
- [ ] 추적 코드 작동 확인
- [ ] Uptime 모니터링 설정
- [ ] 에러 로그 모니터링

### 컨텐츠 & 기능
- [ ] 모든 링크 작동 확인
- [ ] 이미지 로딩 확인
- [ ] 언어 전환 작동
- [ ] Form 제출 테스트
- [ ] 모바일 반응형 확인

---

## 🎉 배포 완료!

모든 체크리스트를 완료하셨다면 축하합니다! 

**NOMADX 웹사이트가 성공적으로 배포되었습니다.**

다음 단계:
1. 팀과 링크 공유
2. 소셜 미디어 공지
3. 초기 트래픽 모니터링
4. 사용자 피드백 수집

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-01-14  
**작성자**: NOMADX Development Team
