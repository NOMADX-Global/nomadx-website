# 🚀 빠른 시작: Vercel 배포 3단계

## 준비물
- [ ] Vercel 계정 (https://vercel.com - 무료)
- [ ] 가비아 도메인 관리 권한
- [ ] Node.js 설치 (https://nodejs.org - Vercel CLI 사용 시)

---

## ⚡ 방법 1: Vercel CLI (5분)

### 1단계: Vercel CLI 설치 및 로그인
```bash
# CLI 설치
npm i -g vercel

# 로그인
vercel login
```

### 2단계: 배포
```bash
# 프로젝트 폴더에서 실행
cd /path/to/nomadx

# 프로덕션 배포
vercel --prod
```

### 3단계: 도메인 연결
```bash
# 1. Vercel Dashboard에서 Settings → Domains
# 2. nomadx.life 추가
# 3. 가비아에서 DNS 설정:

A Record
이름: @
값: 76.76.21.21

CNAME
이름: www
값: cname.vercel-dns.com
```

**완료!** 🎉 1-2시간 내에 https://nomadx.life 접속 가능

---

## 🖱️ 방법 2: Vercel 웹사이트 (10분)

### 1단계: 프로젝트 업로드
1. https://vercel.com 접속 및 로그인
2. "Add New..." → "Project" 클릭
3. 프로젝트 폴더를 드래그 앤 드롭
4. "Deploy" 클릭

### 2단계: 도메인 추가
1. Dashboard → 프로젝트 선택
2. Settings → Domains
3. "Add" 버튼 클릭
4. `nomadx.life` 입력 후 Add

### 3단계: 가비아 DNS 설정
1. https://domain.gabia.com 로그인
2. nomadx.life → 관리 → DNS 정보
3. 레코드 추가:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```

**완료!** 🎉

---

## 🔧 자동 배포 스크립트 사용

### Linux/Mac
```bash
chmod +x deploy.sh
./deploy.sh
```

### Windows
```batch
deploy.bat
```

---

## ✅ 배포 확인

### 즉시 확인
- Vercel Dashboard에서 배포 상태 확인
- 임시 URL 테스트: `https://nomadx-xxxx.vercel.app`

### 1-2시간 후
- https://nomadx.life 접속
- SSL 인증서 확인 (자물쇠 아이콘)

### 문제 발생 시
1. DNS 전파 확인: https://www.whatsmydns.net/
2. `VERCEL_DEPLOYMENT.md` 트러블슈팅 참고
3. Vercel Support: https://vercel.com/support

---

## 📚 추가 자료

- **전체 가이드**: `VERCEL_DEPLOYMENT.md`
- **SEO 최적화**: `SEO_OPTIMIZATION.md`
- **배포 체크리스트**: `DEPLOYMENT_CHECKLIST.md`

---

## 🎯 다음 단계

배포 후:
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터 도구 등록
- [ ] Google Analytics 설치
- [ ] 성능 테스트 (PageSpeed Insights)

**모든 준비 완료!** 🚀
