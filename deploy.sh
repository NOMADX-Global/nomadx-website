#!/bin/bash

# NOMADX Vercel 배포 스크립트
# 사용법: ./deploy.sh

echo "🚀 NOMADX Vercel 배포 시작..."
echo ""

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI가 설치되어 있지 않습니다."
    echo "다음 명령어로 설치해주세요:"
    echo "npm i -g vercel"
    exit 1
fi

echo "✅ Vercel CLI 확인 완료"
echo ""

# 로그인 확인
echo "🔐 Vercel 로그인 확인 중..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "로그인이 필요합니다. 브라우저가 열립니다..."
    vercel login
fi

echo "✅ 로그인 완료"
echo ""

# 배포 옵션 선택
echo "배포 옵션을 선택하세요:"
echo "1) 미리보기 배포 (Preview)"
echo "2) 프로덕션 배포 (Production)"
read -p "선택 (1 또는 2): " choice

case $choice in
    1)
        echo ""
        echo "📦 미리보기 배포 중..."
        vercel
        ;;
    2)
        echo ""
        echo "🚀 프로덕션 배포 중..."
        vercel --prod
        ;;
    *)
        echo "❌ 잘못된 선택입니다."
        exit 1
        ;;
esac

echo ""
echo "✅ 배포 완료!"
echo ""
echo "다음 단계:"
echo "1. Vercel Dashboard에서 도메인 설정"
echo "2. 가비아에서 DNS 설정"
echo "3. SSL 인증서 발급 확인"
echo ""
echo "자세한 내용은 VERCEL_DEPLOYMENT.md를 참고하세요."
