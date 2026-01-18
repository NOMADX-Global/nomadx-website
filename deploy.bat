@echo off
REM NOMADX Vercel 배포 스크립트 (Windows)
REM 사용법: deploy.bat

echo ========================================
echo   NOMADX Vercel 배포
echo ========================================
echo.

REM Vercel CLI 설치 확인
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo [오류] Vercel CLI가 설치되어 있지 않습니다.
    echo.
    echo 다음 명령어로 설치해주세요:
    echo npm i -g vercel
    echo.
    pause
    exit /b 1
)

echo [확인] Vercel CLI 설치됨
echo.

REM 로그인 확인
echo [확인중] Vercel 로그인 상태...
vercel whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo [알림] 로그인이 필요합니다.
    vercel login
)

echo [완료] 로그인 확인
echo.

REM 배포 옵션 선택
echo 배포 옵션을 선택하세요:
echo 1) 미리보기 배포 (Preview)
echo 2) 프로덕션 배포 (Production)
echo.
set /p choice="선택 (1 또는 2): "

if "%choice%"=="1" (
    echo.
    echo [배포중] 미리보기 배포...
    vercel
) else if "%choice%"=="2" (
    echo.
    echo [배포중] 프로덕션 배포...
    vercel --prod
) else (
    echo [오류] 잘못된 선택입니다.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   배포 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. Vercel Dashboard에서 도메인 설정
echo 2. 가비아에서 DNS 설정
echo 3. SSL 인증서 발급 확인
echo.
echo 자세한 내용은 VERCEL_DEPLOYMENT.md를 참고하세요.
echo.
pause
