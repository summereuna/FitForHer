
<div align="center">
  <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsummereuna%2Ffit-for-her&count_bg=%233D7DFF&title_bg=%23333333&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80+%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=false"/></a></div>
  <br/>
  <div align="center">
  <img width="600" alt="F4H" src="https://github.com/user-attachments/assets/8534cf87-7e42-472d-8d08-5c0a8205a9f2">
  <h3>FIT FOR HER</h3>
  <p>여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼</p>
</div>
<br/>

## 목차
  - [프로젝트 소개](#프로젝트-소개)
  - [실행방법](#실행방법)
  - [기술스택](#기술스택)
  - [아키텍쳐](#아키텍쳐)
  - [화면 구성](#화면-구성)
  - [주요 기능](#주요-기능)
  - [성능 최적화](#성능-최적화)
  - [트러블 슈팅](#트러블-슈팅)

<br/>

## 프로젝트 소개
**Fit For Her(F4H)은 여성을 위한 스포츠웨어 이커머스 플랫폼**입니다.<br/><br/>
개인 프로젝트의 주제로 이커머스를 선택하고 세부 주제를 고민하던 중, 작년에 열심히 운동하던 기억이 떠올랐습니다. 그 당시 다양한 스포츠웨어 브랜드의 제품을 비교하며 구매하는 데 많은 시간을 쏟았는데, 운동하는 여성들을 위한 스포츠웨어 브랜드를 한곳에 모아두는 사이트가 있으면 좋겠다는 생각을 했었습니다. 이러한 아이디어를 바탕으로, 여성 스포츠웨어 브랜드가 한 곳에 모여있는 F4H를 구상하였습니다.

#### 기여자
이 프로젝트는 개인 프로젝트입니다.

#### 프로젝트 진행기간
2024.08.20 ~ 2024.09.21 (약 5주)

#### 프로젝트 배포링크
[📍 Fit For Her (F4H)](https://fit-for-her.vercel.app/)

#### 테스트 계정
>  1. 구매자
> <br/>ID: test@f4h.com<br/>PW: xptmxm123!!!
>
>  2. 판매자
> <br/>ID: lululemon@test.com<br/>PW: fnffnfpahs123!!!

<br/>

## 실행방법
1. 레포지토리 복제 및 의존성 설치
```
$ git clone https://github.com/summereuna/fit-for-her.git
$ cd fit-for-her
$ yarn
```
2. 개발 서버 가동
```
$ yarn dev
```
3. 브라우저에서 실행
```
http://localhost:5173/
```

<br/>

## 기술스택
분류|기술|기술 선택 이유
:--:|:--:|:--
패키지 관리|<img  src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"  width="80px"/>|- 패키지 관리는 npm 대신 속도와 안정성 측면에서 보다 뛰어난 yarn을 선택했습니다.
빌드 툴|<img  src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"  width="80px"/>|- 개발 효율성과 속도를 위해 Vite를 선택했으며, 이는 CRA보다 빌드 속도와 서버 시작 시간이 훨씬 빠릅니다.
FE 언어 및 라이브러리|<img  src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"  width="130px"/>|- 코드 오류를 빠르게 잡고 데이터 구조를 명확하게 정의하여 가독성과 유지보수성을 높이기 위해 TypeScript를 사용하였습니다.
.|<img  src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"  width="80px"/>|- 컴포넌트 기반으로 UI를 재사용성 있게 관리할 수 있는 React를 선택하였습니다. 잘 구축된 생태계와 활발한 커뮤니티 덕분에 학습이 용이하며, 다양한 라이브러리와의 통합을 통해 개발 효율성도 높일 수 있습니다.<br/>- SEO와 SSR 문제로 Next.js 사용도 고려했으나, 이번 프로젝트에서는 React를 심도 있게 공부하기 위해 React를 선택하였습니다.
폼 관리 및 유효성 검사|<img  src="https://img.shields.io/badge/reacthookform-EC5990?style=flat-square&logo=reacthookform&logoColor=white"  width="180px"/><br/><img  src="https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white"  width="70px"/>|- React Hook Form과 zod를 함께 사용하여 폼 처리와 검증을 보다 효율적으로 구현하였습니다.<br/>- React Hook Form은 간결한 코드로 최적화된 폼 관리를 제공하며, Zod는 타입 안전성을 보장하는 유연한 스키마 기반의 유효성 검사를 지원합니다. 특히 Zod는 TypeScript와 친화적이어서, 컴파일 시점과 런타임 간의 타입 불일치를 방지해 폼 처리와 검증을 더욱 효율적으로 구현할 수 있습니다.
서버 상태 관리 및 데이터 페칭|<img  src="https://img.shields.io/badge/TanStackQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"  width="180px"/>|- TanStackQuery는 데이터 패칭, 캐싱, 서버 상태 관리를 효율적으로 관리하고 처리할 수 있어서 선택했습니다.
전역 상태 관리|ContextAPI|- 사용자 인증 및 장바구니 상태를 전역적으로 관리하기 위해 ContextAPI를 사용했습니다. 외부 상태 관리 라이브러리인 Zustand 등의 옵션도 고려했지만, 현재 프로젝트의 규모와 복잡성을 감안했을 때 React의 기본기능인 ContextAPI 만으로 충분히 관리할 수 있다고 판단했습니다.
스타일링|<img  src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"  width="300px"/>|- 스타일링은 유틸리티 기반 클래스명으로 일관성 있는 스타일링을 적용하여 빠르게 개발할 수 있는 Tailwind CSS를 사용하였습니다.<br/>커스터마이징이 용이하며, 반응형 디자인도 sm, md, lg 등과 같은 접두사를 사용하여 쉽게 구현할 수 있는 장점이 있습니다.
.|<img  src="https://img.shields.io/badge/shadcnui-000000?style=flat-square&logo=shadcnui&logoColor=white"  width="100px"/>|- Shadcn/UI는 접근성과 사용자 경험을 중시하고, 미리 설계된 컴포넌트들을 제공하여 빠르고 일관된 UI 개발을 지원합니다. 또한, Tailwind CSS와의 원활한 통합으로 커스터마이징이 쉽고, 다양한 UI 요구 사항을 효율적으로 충족할 수 있어 이를 선택했습니다.<br/>- 이번 프로젝트에서는 Shadcn/UI의 버튼, 알림창, 드롭다운, 표, 토스트 등의 UI를 사용하였습니다.
라우팅|<img  src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white"  width="140px"/>|- React 환경에서 라우팅과 페이지 설계를 간편하게 처리할 수 있는 React Router를 사용하였습니다.<br/>SPA(Single Page Application)에서 페이지 간의 네비게이션을 쉽게 관리할 수 있고 Layout, Outlet 등의 기능을 사용할 수 있습니다.
배포 및 호스팅|<img  src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"  width="90px"/>|- 배포는 빠르고 간편하고 자동화된 CI/CD를 제공하는 Vercel을 사용하여 개발과 운영 효율성을 높였습니다.
BaaS|<img  src="https://img.shields.io/badge/supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"  width="110px"/>|- 백엔드로는 Supabase를 사용했습니다. Supabase는 서버 없이 실시간 DB, Auth, Storage 등 다양한 백엔드 기능을 손쉽게 구현할 수 있기 때문에 이번 프로젝트에 적합하다고 생각하여 선택했습니다.<br/>- NoSQL 기반인 Firebase와도 고민을 했지만, supabase가 이커머스 프로젝트의 복잡한 데이터 요구 사항을 좀 더 효율적으로 처리할 수 있을 것으로 판단하여 오픈 소스 PostgreSQL 기반으로 강력한 쿼리 기능과 데이터베이스 관리 기능을 제공하고 데이터베이스 스키마의 직관적 관리가 가능한 Supabase를 선택했습니다.

<br/>

## 아키텍쳐
![F4H_architecture](https://github.com/user-attachments/assets/dd6b9585-79d6-4cfa-bf7b-7c844e9ae618)

### 폴더구조
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┗ 📂images
 ┣ 📂components
 ┃ ┣ 📂...
 ┃ ┗ 📂ui
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂pages
 ┣ 📂schemas
 ┣ 📂shared
 ┃ ┣ 📂...
 ┃ ┗ 📂data
 ┣ 📂types
 ┣ 📜App.css            // 전역 CSS 스타일
 ┣ 📜App.tsx            // 애플리케이션의 루트 컴포넌트
 ┣ 📜index.css          // 기본 CSS 스타일
 ┣ 📜main.tsx           // 애플리케이션 진입점
 ┗ 📜vite-env.d.ts      // Vite 환경 타입 정의
```

|폴더명|내용|
|:--:|:--|
|`/api`| API 호출을 처리하는 모듈로, 각 기능별로 분리하여 관리|
|`/assets`|이미지 등의 정적 리소스를 저장|
|`/components`|페이지 컴포넌트보다 작은 단위의 컴포넌트 관리|
|`/context`|사용자 인증, 장바구니의 전역 상태를 관리|
|`/hooks`|커스텀 훅을 관리|
|`/lib`|유틸리티 함수를 모음|
|`/pages`|각 페이지 컴포넌트를 관리|
|`/schemas`|폼 데이터 유효성 검사를 위한 Zod 스키마를 관리|
|`/shared`|여러 컴포넌트에서 공통으로 사용하는 데이터, 라우팅 및 레이아웃 관련 컴포넌트 관리|
|`/types`|TypeScript 타입 정의 파일을 관리|

<br/>

### MVVM 패턴에 가까운 구조
1. Model
  - TanStackQuery로 api 연결하여 데이터 상태 관리
  - 비즈니스 로직은 일부 View에 포함되어 있으나, 이를 분리하고 개선할 예정
2. View
  - 페이지 컴포넌트, 하위 컴포넌트 등으로 구성하여 UI 표시
  - 사용자 입력 처리 및 데이터 렌더링
3. View Model
  - TanStack Query의 query와 mutation을 커스텀 훅으로 감싸 API 함수와 연결
  - 커스텀 훅으로 API 호출과 상태 관리 로직을 캡슐화하여, View에서 쉽게 접근 가능

<br/>

### ERD
![F4F_ERD](https://github.com/user-attachments/assets/7fa17abe-790b-4bdf-9f17-90a99d97aef8)

- 빨간색으로 표시된 브랜드 좋아요와 위시리스트 기능은 구현 중에 있습니다.

<br/>

### User Flow
<img width="3111" alt="F4H_user_flow" src="https://github.com/user-attachments/assets/736414b9-1af3-489b-8724-faaf6ffc8bb8">

<br/>

## 화면 구성
|로그인 페이지<br/>`/login`|일반 회원가입 페이지<br/>`/signup`<br/>비즈니스 회원가입 페이지<br/>`/signup/biz`|
|:--:|:--:|
|<img width="600" alt="로그인" src="https://github.com/user-attachments/assets/6db0bdac-9096-4d85-a050-8f206dbd973c">|<img width="600" alt="일반회원가입" src="https://github.com/user-attachments/assets/ad2cf3d8-5823-4665-9384-3f09c8653489"><img width="600" alt="비즈니스회원가입" src="https://github.com/user-attachments/assets/c10ac085-6ac1-4884-8f9e-59b54060c9c2">|
|메인 페이지<br/>`/`|검색 페이지<br/>`/search?keyword=`|
|<img width="600" alt="메인" src="https://github.com/user-attachments/assets/5337f9be-5c64-4cca-8ee8-0ab31e05727a"><img width="600" alt="메인2" src="https://github.com/user-attachments/assets/202cace6-42ec-4a43-86a7-a19ba7ef869b">|<img width="600" alt="검색" src="https://github.com/user-attachments/assets/2ef8fee3-b18f-4159-997c-e44c0e8e5a2f">|
|카테고리 페이지<br/>`/category/new, /category/tops, /category/sports-bras, /category/pants, `<br/>서브 카테고리 페이지<br/>`~/:subCategoryName`|상품 상세<br/>`product/:id`|
|<img width="600" alt="카테고리" src="https://github.com/user-attachments/assets/ac3ad5ad-1e5f-47b6-8979-4be8b6e1169b"><img width="600" alt="서브카테고리" src="https://github.com/user-attachments/assets/d89deae2-8cc1-41df-8410-f7b0eb73573b">|<img width="600" alt="상품 상세" src="https://github.com/user-attachments/assets/8d391c8a-cb5a-4054-aa78-532d5ddc35bd">|
|[고객] 장바구니(드롭다운)|[고객] 주문 및 결제 페이지<br/>`/checkout`|
|<img width="600" alt="장바구니" src="https://github.com/user-attachments/assets/6d8bd5c2-00c1-49d9-b8d1-ccf5b9d8f48d">|<img width="600" alt="주문" src="https://github.com/user-attachments/assets/83b77446-68ab-4f90-bf54-bff1c6f3d0d6">|
|[고객] 주문내역 페이지<br/>`/my/orders`|[고객] 주문내역상세 페이지<br/>`/my/orders/:id`|
|<img width="600" alt="주문내역" src="https://github.com/user-attachments/assets/12110a0b-0f3c-447d-af6e-8e16b895c0f4">|<img width="600" alt="주문내역상세" src="https://github.com/user-attachments/assets/9939413c-c26d-4875-9714-8c8e00d656d4">|
|[판매] 대시보드<br/>`/dashboard`, `/dashboard/overview`|[판매] 브랜드정보 탭<br/>`/dashboard/setting`|
|<img width="600" alt="대시보드" src="https://github.com/user-attachments/assets/a3a145cf-819e-4238-8d8d-c75112a5d47f">|<img width="600" alt="브랜드정보" src="https://github.com/user-attachments/assets/64f6a068-cb3f-4697-b6b7-36f27b6ac606">|
|[판매] 상품관리 탭<br/>`/dashboard/product`|[판매] 판매관리 탭<br/>`/dashboard/transaction`|
|<img width="600" alt="상품관리" src="https://github.com/user-attachments/assets/4678d471-e2e7-4bef-b48b-7a4e041b7495">|<img width="600" alt="판매관리" src="https://github.com/user-attachments/assets/cdf4ca96-ac35-4bd6-8736-e7ed835be8ac">|

<br />

## 주요 기능
#### 1. 회원가입 및 로그인
<details>
<summary>로그인 시연 영상</summary>
  
  - 로그인
  <img width="600" alt="로그인" src="https://github.com/user-attachments/assets/8d7abc4b-7b73-475b-ae38-e46adb516391"/>

  - 회원가입
  <img width="600" alt="일반회원가입" src="https://github.com/user-attachments/assets/3f53b305-ec39-4c49-8320-fc6c0dce91fd"/>
</details>

- 일반회원/비즈니스 회원 가입 기능
- 폼 유효성 검증
- 로그인 후 전역상태로 회원정보 관리

#### 2. 캐러셀 배너, 전체 메뉴 선택 기능, 검색 기능
<details>
<summary>메인 페이지 시연 영상</summary>
  
  - 여러 기능
  <img width="600" alt="메인" src="https://github.com/user-attachments/assets/f5725041-27c2-47f7-ae83-a53c380f756a"/>
</details>

- 상단 배너 캐러셀에 브랜드별 이미지 노출(3.5초 간격으로 자동 전환)
- 카테고리별 최신 상품 조회(최대 4개)
- 더보기 버튼 및 서브 카테고리 태그 선택하여 페이지 이동
- 상단 메뉴에서 카테고리 선택해 카테고리별 상품 페이지 이동
- 상단 검색바에서 상품명/상품설명 키워드 검색 기능

#### 3. 상품 조회
<details>
<summary>카테고리 페이지 시연 영상</summary>
  
  - 카테고리 상품 조회
  <img width="600" alt="카테고리" src="https://github.com/user-attachments/assets/34a3a276-faa0-4dda-9130-9c04b9521d15"/>
</details>

- 카테고리, 검색어, 정렬 옵션에 따른 조회 결과 필터링 기능
- 무한 스크롤 활용한 페이지네이션

#### 4. 상품 상세
<details>
<summary>상품 상세 페이지 시연 영상</summary>
  
  - 상품 상세 이미지 캐러셀
  <img width="600" alt="상품상세이미지캐러셀" src="https://github.com/user-attachments/assets/6d3ecc17-75de-43c2-a82d-6c384147fe65"/>
</details>

- 상품 이미지 캐러셀 기능으로 유저 인터랙션 강화
- 상품 선택 시 장바구니 추가 기능

#### 5. [고객] 장바구니
<details>
<summary>장바구니 시연 영상</summary>
  
  - 장바구니
  <img width="600" alt="장바구니" src="https://github.com/user-attachments/assets/322e6a65-d3ae-4c81-ac1e-4357aac6427f"/>
</details>

- 장바구니 상품 수량 수정 및 삭제 기능
- 장바구니 상품 주문 기능

#### 6. [고객] 상품 주문 및 결제
<details>
<summary>상품 주문 및 결제 시연 영상</summary>
  
  - 상품 주문
  <img width="600" alt="배송정보입력" src="https://github.com/user-attachments/assets/36666c3e-b2bd-4b2e-9340-9c977599698b"/>
  
  - 상품 결제
  <img width="600" alt="결제" src="https://github.com/user-attachments/assets/486b24d4-63df-4ab7-a7a5-f1ee310d3461"/>
</details>

- 배송 정보 입력
- 포트원 SDK 활용한 결제 기능 (카카오페이 테스트로만 진행)

#### 7. [고객] 주문 내역 조회 및 주문 취소
<details>
<summary>주문 내역 조회 및 취소 시연 영상</summary>
  
  - 주문 취소
  <img width="600" alt="구매자결제취소" src="https://github.com/user-attachments/assets/0f343a59-ddbe-4619-bb4f-4ac01bd15a4a"/>
  
  - 주문 내역 조회
  <img width="600" alt="구매자주문내역" src="https://github.com/user-attachments/assets/ca3bbd72-0d8f-4519-9bc7-6f22ce802dad"/>
</details>

- 주문 내역 전체 조회 기능
- 주문 내역 상세 조회 기능
- 주문 취소 기능 (주문 취소의 경우 `order_status: "order_cancelled"` 상태 변경으로 논리적 삭제)

#### 8. [판매] 대시보드 설정
<details>
<summary>브랜드 설정 페이지 시연 영상</summary>

  - 비즈니스 회원 가입 후 브랜드 등록
  <img width="600" alt="비즈니스회원가입" src="https://github.com/user-attachments/assets/11224e23-27f1-429c-93ed-25c5ced77358"/>

  - 대시보드 브랜드 설정 탭에서 브랜드 정보 조회
  <img width="600" alt="브랜드정보" src="https://github.com/user-attachments/assets/e99d36cd-2749-40ae-9cc6-39e31397c642"/>
</details>

- 비즈니스 회원으로 가입한 판매자는 대시보드 설정 탭에서 브랜드 등록 후 대시보드 이용 가능
- 브랜드 정보 조회 및 수정 기능

#### 9. [판매] 대시보드 오버뷰
<details>
<summary>대시보드 페이지 시연 영상</summary>
  
  - 대시보드 오버뷰
  <img width="600" alt="판매자대시보드" src="https://github.com/user-attachments/assets/53ed6a7c-6d53-405f-b512-07bdfbfa5ed8"/>
</details>

- 상품 판매 수치 조회

#### 10. [판매] 대시보드 상품관리
<details>
<summary>상품 관리 시연 영상</summary>
  
  - 상품 등록
  <img width="600" alt="상품등록" src="https://github.com/user-attachments/assets/be09debc-2889-4fb9-8395-73cf00bfaeb4"/>
  
  - 상품 수정
  <img width="600" alt="상품수정" src="https://github.com/user-attachments/assets/919c350c-6e21-4282-9a71-8532fc3295cf"/>
</details>

- 판매 상품 등록, 조회, 수정, 삭제 기능 (삭제의 경우 `is_active: true | false` 로 논리적 삭제)
- 등록 시 상품 이미지 개수 최소 1개 ~ 최대 4개 제한

#### 11. [판매] 대시보드 판매관리
<details>
<summary>판매자 배송 상태 변경 시연 영상</summary>
  
  - 판매 상품 배송 상태 변경
  <img width="600" alt="판매자배송상태변경" src="https://github.com/user-attachments/assets/5f2b7b23-96c3-4418-8395-c6eb66e2fae2"/>
</details>

- 판매 상품에 대한 배송대기, 배송중, 배송완료, 구매확정, 주문취소 상태 변경 기능

<br />

## 성능 최적화
### 1. 라이트 하우스 평가 점수 개선
1. 웹 접근성 개선: **86 -> 100**
   - 모든 button, a, Link, NavLink 요소에 aria-label로 인식 가능한 이름 표시

2. 검색엔진 최적화: **83 -> 100**
   - sitemap, robots.txt 생성
   - React-Helmet-async 사용해 meta tag 설정

- 웹 뷰
<img width="468" alt="웹뷰" src="https://github.com/user-attachments/assets/c4c0f843-ca94-45bc-b527-be56f16e4036">

- 모바일 뷰
<img width="468" alt="모바일뷰" src="https://github.com/user-attachments/assets/e87f58b4-8e86-4d18-bd7c-13bd643b86e2">

3. 성능 최적화:
   - 데이터 페칭시 스켈레톤 UI 사용하여 CLS 개선 (**2.222 -> 0**)
     - <img width="500" alt="웹뷰" src="https://github.com/user-attachments/assets/3db903dc-cabb-4cc7-91d2-18dadc2896b4">
     - <img width="200" alt="모바일뷰" src="https://github.com/user-attachments/assets/aaf471fb-39b4-4ac5-adfd-dda792dd43de">
     - 모바일 뷰: **55 -> 62**


## 트러블 슈팅
-
