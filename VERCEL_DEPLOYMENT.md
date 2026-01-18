# 🚀 NOMADX 웹사이트 Vercel 배포 가이드

## 📋 목차
1. [Vercel 배포 준비](#1-vercel-배포-준비)
2. [Vercel 프로젝트 생성 및 배포](#2-vercel-프로젝트-생성-및-배포)
3. [가비아 도메인 연결](#3-가비아-도메인-연결)
4. [배포 후 설정](#4-배포-후-설정)
5. [트러블슈팅](#5-트러블슈팅)

---

## 1. Vercel 배포 준비

### Step 1-1: 필수 파일 확인

현재 프로젝트 구조:
```
nomadx/
├── index.html
├── our-story.html
├── the-playground.html
├── partner-with-us.html
├── invest-collaborate.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── .htaccess (⚠️ Vercel에서는 사용 안 됨)
├── ko/
│   ├── index.html
│   ├── our-story.html
│   ├── the-playground.html
│   ├── partner-with-us.html
│   └── invest-collaborate.html
├── css/
│   └── style.css
└── js/
    ├── main.js
    └── playground.js
```

### Step 1-2: Vercel 설정 파일 생성 필요

Vercel은 정적 사이트 호스팅에 최적화되어 있지만, `.htaccess` 대신 `vercel.json` 파일을 사용합니다.

---

## 2. Vercel 프로젝트 생성 및 배포

### 방법 A: Vercel CLI로 배포 (권장)

#### Step 2-1: Vercel CLI 설치
```bash
# npm을 사용하는 경우
npm i -g vercel

# yarn을 사용하는 경우
yarn global add vercel
```

#### Step 2-2: 프로젝트 폴더에서 로그인
```bash
# 프로젝트 폴더로 이동
cd /path/to/nomadx

# Vercel 로그인
vercel login
```
→ 브라우저가 열리고 이메일로 인증 링크가 전송됩니다.

#### Step 2-3: 배포 실행
```bash
# 첫 배포 (설정 대화형)
vercel

# 프로덕션 배포
vercel --prod
```

대화형 질문에 답변:
```
? Set up and deploy "~/nomadx"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? nomadx
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

---

### 방법 B: Vercel 웹사이트에서 배포 (GUI)

#### Step 2-1: GitHub/GitLab/Bitbucket에 코드 업로드 (선택사항)

**GitHub를 사용하는 경우:**
```bash
# Git 초기화
git init

# .gitignore 생성
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore

# 파일 추가 및 커밋
git add .
git commit -m "Initial commit: NOMADX website"

# GitHub 리포지토리 생성 후
git remote add origin https://github.com/yourusername/nomadx.git
git branch -M main
git push -u origin main
```

#### Step 2-2: Vercel에서 프로젝트 Import

1. **Vercel 웹사이트 접속**: https://vercel.com
2. **로그인 또는 회원가입**
3. **"Add New..." → "Project" 클릭**
4. **Import Git Repository** (GitHub 사용 시)
   - GitHub 연동
   - nomadx 리포지토리 선택
   - Import 클릭

5. **또는 "Deploy" 버튼 클릭** (Git 없이 직접 업로드)
   - 프로젝트 폴더를 드래그 앤 드롭

6. **프로젝트 설정**
   ```
   Project Name: nomadx
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워두기)
   Output Directory: (비워두기)
   Install Command: (비워두기)
   ```

7. **Deploy 클릭**

배포가 완료되면 Vercel이 자동으로 URL을 생성합니다:
```
https://nomadx-xxxx.vercel.app
```

---

## 3. 가비아 도메인 연결

### Step 3-1: Vercel에서 도메인 추가

1. **Vercel Dashboard → 프로젝트 선택**
2. **Settings → Domains 클릭**
3. **"Add" 버튼 클릭**
4. **도메인 입력**: `nomadx.life`
5. **Add 클릭**

Vercel이 DNS 설정 정보를 표시합니다:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3-2: 가비아 DNS 설정

#### 방법 1: Vercel Nameservers 사용 (권장)

**장점**: 자동 SSL, 빠른 설정, Vercel이 모든 DNS 관리

1. **Vercel에서 Nameservers 확인**
   - Domains 설정에서 "Use Vercel DNS" 선택
   - Nameservers 정보 표시:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. **가비아 관리 콘솔 접속**
   - https://domain.gabia.com 로그인
   - "My가비아 → 서비스 관리 → 도메인"

3. **nomadx.life 도메인 선택**
   - "관리" 버튼 클릭
   - "네임서버 설정" 클릭

4. **네임서버 변경**
   ```
   1차 네임서버: ns1.vercel-dns.com
   2차 네임서버: ns2.vercel-dns.com
   3차 네임서버: (삭제 또는 비워두기)
   4차 네임서버: (삭제 또는 비워두기)
   ```

5. **적용** 클릭

⏱️ **전파 시간**: 최대 24-48시간 (보통 1-2시간 내 완료)

---

#### 방법 2: 가비아 DNS 유지 (A/CNAME 레코드 추가)

**장점**: 가비아에서 이메일 등 다른 서비스 사용 가능

1. **가비아 관리 콘솔 접속**
   - https://domain.gabia.com 로그인
   - "My가비아 → 서비스 관리 → 도메인"

2. **nomadx.life 도메인 선택**
   - "관리" 버튼 클릭
   - "DNS 정보" 또는 "DNS 관리" 클릭

3. **DNS 레코드 추가/수정**

   **기존 레코드 삭제 또는 수정:**
   - 기존 A 레코드 (@) 삭제 또는 수정
   - 기존 CNAME 레코드 (www) 삭제 또는 수정

   **새 레코드 추가:**
   ```
   타입: A
   호스트: @
   값/위치: 76.76.21.21
   TTL: 3600
   
   타입: CNAME
   호스트: www
   값/위치: cname.vercel-dns.com
   TTL: 3600
   ```

4. **저장/적용** 클릭

⏱️ **전파 시간**: 최대 24-48시간 (보통 30분-2시간)

---

### Step 3-3: DNS 전파 확인

#### 명령어로 확인:
```bash
# A 레코드 확인
nslookup nomadx.life

# CNAME 레코드 확인
nslookup www.nomadx.life

# 또는 dig 명령어
dig nomadx.life
dig www.nomadx.life
```

#### 온라인 도구:
- https://www.whatsmydns.net/
- 입력: `nomadx.life`
- A 레코드가 `76.76.21.21`로 표시되면 성공!

---

### Step 3-4: SSL 인증서 자동 발급 확인

Vercel은 Let's Encrypt를 통해 자동으로 SSL을 발급합니다.

1. **Vercel Dashboard → 프로젝트 → Settings → Domains**
2. **도메인 옆에 "Valid Certificate" 표시 확인**
   - ✅ 초록색 체크: SSL 정상
   - ⏳ 진행 중: 기다리기 (최대 24시간)
   - ❌ 오류: DNS 설정 재확인

3. **브라우저에서 확인**
   ```
   https://nomadx.life
   ```
   → 자물쇠 아이콘 표시되면 성공!

---

## 4. 배포 후 설정

### Step 4-1: Vercel.json 설정 확인 (이미 생성됨)

프로젝트에 `vercel.json` 파일이 필요합니다:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Step 4-2: 환경 변수 설정 (Analytics 등)

Google Analytics를 추가하는 경우:

1. **Vercel Dashboard → 프로젝트 → Settings → Environment Variables**
2. **변수 추가**:
   ```
   Key: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX
   Environment: Production, Preview, Development
   ```

### Step 4-3: 자동 배포 설정 (GitHub 연동 시)

GitHub에 push할 때 자동으로 배포되도록 설정:

1. **Vercel Dashboard → 프로젝트 → Settings → Git**
2. **Production Branch**: `main` 설정
3. **Automatic Deployments**: 활성화

이제 `git push`만 하면 자동으로 배포됩니다!

---

## 5. 트러블슈팅

### 문제 1: DNS가 전파되지 않음

**증상**: 도메인 접속 시 "DNS_PROBE_FINISHED_NXDOMAIN" 오류

**해결방법**:
```bash
# DNS 캐시 초기화 (Windows)
ipconfig /flushdns

# DNS 캐시 초기화 (Mac)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# DNS 캐시 초기화 (Linux)
sudo systemd-resolve --flush-caches
```

대기 시간: 최대 24-48시간

---

### 문제 2: SSL 인증서 발급 실패

**증상**: "Certificate Error" 또는 "Not Secure" 경고

**해결방법**:
1. DNS가 완전히 전파되었는지 확인
2. Vercel Dashboard에서 "Refresh Certificate" 클릭
3. 24시간 대기 후 재시도

---

### 문제 3: 한글 페이지 (ko/) 404 에러

**증상**: `/ko/` 경로 접속 시 404

**해결방법**:
`vercel.json`에 리다이렉트 규칙 추가:
```json
{
  "routes": [
    {
      "src": "/ko",
      "dest": "/ko/index.html"
    },
    {
      "src": "/ko/(.*)",
      "dest": "/ko/$1"
    }
  ]
}
```

---

### 문제 4: 이미지/CSS가 로딩되지 않음

**증상**: 스타일이 적용되지 않거나 이미지가 표시되지 않음

**해결방법**:
1. HTML 파일의 경로 확인:
   ```html
   <!-- 절대 경로 사용 -->
   <link rel="stylesheet" href="/css/style.css">
   <script src="/js/main.js"></script>
   ```

2. Vercel 빌드 로그 확인
3. 브라우저 개발자 도구(F12) → Console 탭에서 오류 확인

---

## 🎯 배포 완료 체크리스트

배포가 완료되면 다음을 확인하세요:

### 기본 기능
- [ ] https://nomadx.life 접속 확인
- [ ] https://www.nomadx.life 리다이렉트 확인
- [ ] SSL 인증서 (자물쇠 아이콘) 확인
- [ ] 모든 페이지 로딩 확인
- [ ] 언어 전환 (EN ↔ KO) 작동 확인

### SEO & Analytics
- [ ] Google Search Console에 사이트 등록
- [ ] Sitemap 제출: `https://nomadx.life/sitemap.xml`
- [ ] Naver 웹마스터 도구 등록
- [ ] Google Analytics 작동 확인

### 성능
- [ ] PageSpeed Insights 테스트: https://pagespeed.web.dev/
- [ ] GTmetrix 테스트: https://gtmetrix.com/
- [ ] 모바일 반응형 테스트

---

## 📞 추가 도움말

### Vercel 공식 문서
- **도메인 연결**: https://vercel.com/docs/concepts/projects/domains
- **커스텀 도메인**: https://vercel.com/docs/concepts/projects/domains/add-a-domain
- **DNS 설정**: https://vercel.com/docs/concepts/projects/domains/working-with-nameservers

### 가비아 고객센터
- **전화**: 1544-4755
- **이메일**: customer@gabia.com
- **FAQ**: https://customer.gabia.com/

---

## ✨ 완료!

이제 **https://nomadx.life**에서 NOMADX 웹사이트가 라이브됩니다! 🎉

배포 과정에서 문제가 발생하면 언제든지 질문해 주세요!
