<div align="center">
  <a href="https://www.pixtudy.site">
    <img src='https://lrklhpcxbdiunpubmvio.supabase.co/storage/v1/object/public/openGraph_image/pixtudy.png' width='200px' height='200px' style='border-radius:999px;'>
  </a>
</div>

# Pixtudy

- [프로젝트 소개](#프로젝트-소개)
- [아키텍쳐](#아키텍쳐)
- [기술스택](#기술스택)
- [주요 기술](#주요-기술)
- [기술적 의사결정](#기술적-의사결정)
- [트러블 슈팅](#트러블-슈팅)
- [팀원 소개](#팀원-소개)

## <a id="프로젝트-소개"></a> 📜 프로젝트 소개

<div align="center">
  <a href="https://www.pixtudy.site">
    <img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F52713e58-36ce-4692-8885-e85bc086dd9f%2F0.png?table=block&id=e4afaaaa-0e48-446d-9099-a164314e2ce1&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2' width=300px/>
  </a>
</div>

### 프로젝트 계기

기존 메타버스 화상회의 플랫폼에서 청취자는 발표자가 제공하는 일방적인 화면 외에 추가 정보를 탐색하거나 참조할 수 없으며, 발표자는 청취자의 다양한 환경에 맞춰서 준비해야 하는 문제점이 있다. 이러한 문제점을 해결하기 위해서 프로젝트를 시작하였다.

### 프로젝트 설명

Pixtudy는 발표자의 화면만을 일방적으로 공유받던 청취자들이 자유롭게 자료를 탐색하고, 발표자는 청취자의 환경에 구애받지 않고 효율적으로 자료를 공유할 수 있는 화상회의 플랫폼을 목표로 한다. Phaser와 게더타운의 에셋을 활용한 가상환경 구축, WebRTC를 이용한 실시간 다중 영상 공유, 스크럼 보드를 통한 협업 지원 등의 기능을 통해, 사용자들에게 새로운 형태의 메타버스 기반 화상회의 경험을 제공한다.

### 프로젝트 기간

전체 기간: '24.01.04 ~ '24.02.08. (5주)

```
주차별 진행사항
1주차: 프로젝트 기획 및 기술검증
2주차: MVP 모델 기능 개발
3주차: 중간발표 및 MVP 모델 완성
4주차: 유저테스트 진행 및 MVP 이후 기능 개발
5주차: 버그/오류 개선 및 최적화 진행
```

### 서비스 둘러보기

[**픽스터디 배포 사이트**](https://www.pixtudy.site)

<br/>

## <a id="아키텍쳐"></a> 🏗 아키텍쳐

<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F3c2c9cb2-b9dd-4d16-82a2-cf32e5a7dbbd%2FScreen_Shot_2024-02-04_at_3.19.10_PM.png?table=block&id=c8ec5b2d-f6e4-4ba9-91ab-76a3fa0f6327&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2'>

<br/>

## <a id="기술스택"></a> 🛠️ 기술스택

### 공통 및 배포

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Frontend

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Mediasoup](https://img.shields.io/badge/Mediasoup-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)
![webRTC](https://img.shields.io/badge/webRTC-black.svg?style=for-the-badge&logo=webrtc&logoColor=%23F7DF1E)
![phaser](https://img.shields.io/badge/phaser3-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)
![joyride](https://img.shields.io/badge/joyride-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)
![react-dnd](https://img.shields.io/badge/react--dnd-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Mediasoup](https://img.shields.io/badge/Mediasoup-%23323330.svg?style=for-the-badge&logo=&logoColor=%23F7DF1E)
![webRTC](https://img.shields.io/badge/webRTC-black.svg?style=for-the-badge&logo=webrtc&logoColor=%23F7DF1E)

### BaaS

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

<br/>

## <a id="주요-기술"></a> 🍀 주요 기술

Pixtudy에서 제공하는 주요 기술

- 가상환경 플랫폼
  - `Phaser` 로 맵 및 게임 환경을 만들고, 오픈소스 메타버스 플랫폼인 게더타운의 에셋을 이용해 가상환경 플랫폼 구현.
  - 사용자들의 실시간 움직임을 받거나 Space Chat, DM 등 소통환경 조성
- 화상 회의
  - 같은 가상환경 스페이스 내에서 `WebRTC` 기술을 이용하여 실시간 다중 영상(최대 4개), 카메라, 마이크 공유
  - 다중 영상 공유 시 시청자는 원하는 레이아웃으로 시청
  - 특정 영상 축소 / 확대 가능
- 스크럼 보드
  - 각 스페이스 별 스크럼 보드가 있어 회의 진행 중 바로 작성하여 협업 및 아이디어 공유

## <a id="기술적-의사결정"></a>👨‍⚖️ 기술적 의사결정

Pixtudy 개발 과정에서 마주친 여러 선택지들과 그에 따른 결정 과정

### JavaScript Superset Language

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F3dca0226-56bb-4e4f-a55b-538875df409f%2Ftypescript-icon.svg?table=block&id=049b3af3-9822-40bb-a128-3e48f2570c2f&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&userId=&cache=v2' width="25px" height='25px' alt="Typescript" /> <strong>Typescript</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
휴먼에러를 최소화, 런타임 이전에 컴파일 단계에서 미리 에러를 캐치, 협업할 때 공통된 타입을 사용하여 프로젝트 진행함에 있어 서로 미구현 상태에서도 빠른 진행이 가능함을 장점을 두고 Typescript를 선택하였다.
</details>
<br/>

### State Management Libraries

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F27a096a0-bb42-4616-bf20-2831474ab42c%2Freact-query.svg?table=block&id=a51eb1d4-1d54-44e7-bef1-c7e381773dbf&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&userId=&cache=v2' width="25px" height='25px' alt="React-Query" /> <strong>React-Query</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
데이터 패칭, 캐싱, 동기화, 그리고 서버 상태 업데이트를 더욱 용이하게 만들어주는 라이브러리로 프로젝트의 유지 보수를 하기 쉽고, 새로운 기능을 쉽게 구축할 수 있는 장점이 있고,  개발자가 직접 구현하기 번거로운 부분을 쉽게 처리할 수 있기 때문에 선택하였다.
</details>

<details>
<summary>
<img src='https://img.stackshare.io/service/11559/zustand.png' width="25px" height='25px' alt="Zustand" /> <strong>Zustand</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
Zustand는 React 애플리케이션을 위한 상태 관리 라이브러리로, 간결하고 직관적인 API를 제공하여 상태 관리를 간편하게 만든다. 작은 코드 풋프린트로 애플리케이션의 상태를 쉽게 설정, 업데이트 및 구독할 수 있으며, Redux나 MobX 같은 전통적인 상태 관리 라이브러리보다 더 간단하고 유연한 방식으로 상태를 관리할 수 있습니다. 초기에는 React-query, Redux RTK를 사용했으나 RTK에는 Redux Query가 있는데 React-query를 사용하는게 하나는 불필요한 종속성을 추가한다고 판단하여 복잡한 전역 상태 관리가 필요하지 않기에 React-query와 Zustand조합으로 바꾸었다.
</details>
<br/>

### Framework

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fcb3e6c88-6ddc-40d2-b9a1-06a0f77c65ec%2Fnext-js.svg?table=block&id=c3434f9f-319e-4db5-b0d3-e9bcc12982f3&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&userId=&cache=v2' width="25px" height='25px' alt="next.js" /> <strong>NextJS</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
프로젝트의 특성상 클라이언트 사이드 렌더링(CSR)을 주로 사용하면서도, NextJs의 다양한 기능, 특히 SEO, 이미지 최적화, 그리고 성능 향상을 위해 랜딩페이지에 SSG를 사용했다. 이를 통해 빠른 로딩 시간을 유지하면서도 CSR의 동적인 사용자 경험도 보존할 수 있었다. NextJs는 미들웨어를 통해 로그인 여부에 따른 페이지 처리 접근을 제한할 수 있어, 보안과 사용자 권한 관리에 효과적이고 CSS-In-JS를 지원하는 pages router의 선택은 안정성과 빠른 개발 속도를 달성하는데 중점을 두었다. 이러한 결정은 NextJS의 유연한 라우팅 시스템과 풍부한 기능 세트가 프로젝트의 요구 사항을 충족시키기 때문에 선택하였다.
</details>
<br/>

### Metaverse environment

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F2fa7f391-a78d-436d-a2f2-cf7960bcfa88%2Fphaser.png?table=block&id=b2ce0910-443f-4484-9949-c01aa8fbdfb5&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=&cache=v2' width="25px" height='25px' alt="phaser" /> <strong>Phaser</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
가상환경을 만들기 위해 Canvas를 사용해야하는데 프로젝트 기간상 canvas로 구현하기에는 짧은 시간이라 판단하고 Phaser3를 사용하게 되었다. Phaser3는 HTML5와 JavaScript 기반의 웹 기술을 사용하여 메타버스 환경을 쉽고 빠르게 구현할 수 있으며, WebGL과 Canvas 지원으로 고성능 2D 그래픽을 제공하고, 직관적인 학습 곡선과 활발한 커뮤니티 지원을 바탕으로 개발자 친화적인 환경을 제공한다.
</details>
<br/>

### Conference

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F6d126b88-abf1-489d-8258-59da093de654%2FSocket-io.svg.png?table=block&id=ecfedf89-bec5-4c1d-811c-2505acbc5a42&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&userId=&cache=v2' width="25px" height='25px' alt="socket.io" /> <strong>Socket.IO</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
실시간 화상 회의를 위한 transport 연결, 가상환경 내 움직임 등 실시간 통신 기능을 구현하기 위한 선택으로, 웹소켓과 폴링을 결합하여 다양한 네트워크 환경에서도 안정적인 실시간 데이터 전송을 제공한다. 또한 사용 방법이 간단하고 서버와 클라이언트 간의 빠른 양방향 통신을 가능하기 때문에 선택하였다.
</details>

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F66bab2a9-3389-4a37-9154-f6a5b3c485e6%2Fmediasoup.png?table=block&id=d5862220-f489-437f-8c78-ce508a392772&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=&cache=v2' width="25px" height='25px' alt="mediasoup" /> <strong>Mediasoup</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
실시간 화상 회의 기능이 필요하며 고화질 비디오 스트리밍, 저 지연성, 높은 동시 사용자 처리 능력이 요구된다. 그렇기 때문에 SFU 기술을 선택하여 위 요구사항을 해결하고자 했고, mediasoup은 러닝커브가 높은 편에도 불구하고 타 라이브러리보다 높은 성능의 SFU를 제공하고 앞서 필요한 기능들을 모두 처리할 수 있기 때문에 선택하였다.
</details>

<details>
<summary>
<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvnD-fEZHj8eKTGjp0gCcA9WghSEk7BUF6m_lwY-ZUQg&s' width="25px" height='25px' alt="express" /> <strong>Express</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
실시간 화상 회의 기능이 필요하며 고화질 비디오 스트리밍, 저 지연성, 높은 동시 사용자 처리 능력이 요구된다. 그렇기 때문에 SFU 기술을 선택하여 위 요구사항을 해결하고자 했고, mediasoup은 러닝커브가 높은 편에도 불구하고 타 라이브러리보다 높은 성능의 SFU를 제공하고 앞서 필요한 기능들을 모두 처리할 수 있기 때문에 선택하였다.
</details>
<br/>

### Database

<aside>
<details>
<summary>
<img src='https://avatars.githubusercontent.com/u/54469796?s=200&v=4' width="25px" height='25px' alt="supabase" /> <strong>supabase</strong>
</summary>
<div markdown="1" style='padding:10px; margin-bottom:10px'>
Supabase는 Firebase alternative 라는 캐치프레이즈를 내건 만큼 다양한 기능을 제공하고 모든 기능이 firebase보다 편리하고 뛰어난 BaaS 플랫폼이다. 우리 서비스는 테이블 간 Join이 많이 필요하고 user flow 에서 예상되는 데이터 수정 및 추가가 많기 때문에 NoSQL 보다는 RDBMS가 적절하다 판단했다. 
</details>
<br/>

### Styling and animation

<details>
<summary>
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F2d4d7fa2-c343-4386-94d4-42547c01c3b6%2Fstyled-components.png?table=block&id=e34ec18d-bca8-442c-b3d1-e2ee8d79ef26&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=40&userId=&cache=v2' width="25px" height='25px' alt="styled-components" /> <strong>Styled-Components</strong>
</summary>
<div markdown="1">
Next.js에서 권장하는 방식인 Tailwind는 클래스 기반 스타일링으로 빠른 개발이 가능하지만, 코드 가독성이 좋지 않고 팀원들 모두 비교적 사용경험이 적다는 단점이 있었다.
다른 스타일 방식들 중 Styled-Components는 컴포넌트 단위로 간편한 스타일링을 할 수 있으며, props를 통한 다양한 동적 스타일링 가능, 러닝 커브가 없다는 장점이 있다.
프로젝트에서 다른 부분의 러닝 커브가 높기 때문에 좀 더 익숙하게 개발할 수 있고 코드 가독성이 좋은 Styled-Components를 사용하기로 결정하였다. 
</details>

<details>
<summary>
<img src='https://bestofjs.org/logos/motion.svg' width="25px" height='25px' alt="framer-motion" /> <strong>Framer-motion</strong>
</summary>
<div markdown="1">
Framer-motion은 컴포넌트 기반의 애니메이션 라이브러리로, 선언적 애니메이션을 통한 뛰어난 코드 가독성과 간단하고 직관적인 API를 통해 간편하게 애니메이션을 추가할 수 있으며, 또한, React 환경에서도 스크롤 이벤트 등 여러 애니메이션을 구현할 수 있기 때문에 선택하였다.
</details>
<br/>

## <a id="트러블-슈팅"></a> 🛠 트러블슈팅

개발 과정 중 발생한 주요 문제들에 대한 상황을 분석하고 이를 해결하기 위한 과정

### # 1. 스페이스 중복 등록 문제

> ❗ 특정 스페이스를 이미 들어가서 등록이 돼있는 상태임에도 불구하고 다시 한번 등록을 하는 문제 발생

---

### ❓ 원인

SSG를 이용하여 Data Fetching 후 유저가 참여한 이후에 해당 데이터가 갱신되지 않았기 때문에 재등록이 가능하였다.

### 💡 해결

SSR로 바꾸고 클라이언트 단에서 해당 스페이스를 들어갈 수 있는지를 판단하였다. 이를 통해서 재등록이 되는 문제를 해결하였다.

<br>

### # 2. 대시보드 페이지 로딩 시간 길어짐

> ❗ 랜딩 페이지에서 대시보드 페이지로 넘어갈 때 로딩 시간이 오래 걸려서 애플리케이션이 동작하지 않은 것처럼 보이는 이슈 발생

---

### ❓ 원인

대시보드 페이지는 SSR을 통해서 배너 스페이스에 대한 정보와 해당 스페이스에 대한 유저 정보를 가져오기 때문에 매 요청마다 불필요한 서버 사이드 랜더링으로 오랜 시간이 걸렸다.

### 💡 해결

SSG로 변경하여 배너 스페이스에 대한 정보만 가져오고 클라이언트가 해당 스페이스에 접속했는지에 대한 여부는 클라이언트 단에서 처리하여 로딩시간을 단축하였다.

초기 로딩 시간이 2초에서 0.4초로 대폭 개선되었으며, 이는 전체 로딩 시간에서 무려 80%의 감소를 의미한다. 이러한 성능 최적화를 통해 사용자 경험이 현저히 향상됐다.

### 문제 개선 스크린샷

SSR + Client 처리를 이용한 대시보드 페이지 로딩 속도 (2000ms)

<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F1eb9eff8-5346-4b47-9995-0ef17b8b5332%2FUntitled.png?table=block&id=6ab2e7e8-5f22-483c-9dd8-a6d79aeae56d&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2'/>

SSG + Client 처리를 이용한 대시보드 페이지 로딩 속도(44ms)
<img src='https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Ffc88d6c4-4b54-4aae-b07d-867421248559%2FUntitled.png?table=block&id=ff8fb7fe-d038-4b48-b5ad-26b56aa6f6b9&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2'/>

<br>

### # 3. 비디오, 오디오 분리가 안되던 문제

> ❗ 웹캠 공유를 하고 나서야지만 음성 공유가 되던 문제 발생

---

### ❓ 원인

웹캠을 공유를 해야지만 비디오 컴포넌트가 랜더링이 됐기 때문에 발생했다.

### 💡 해결

웹캠 뿐만 아니라 음성이 공유됐을 때에도 조건부 랜더링을 할 수 있도록 수정하였다.

<br/>

### #4 미들웨어의 페이지 프리패치로 인한 로그인 상태에 따른 조건부 리디렉션 문제

> ❗ 각 페이지에 로그인 상태가 제대로 적용되지 않았던 문제

---

### ❓ 원인

Next.js에서는 사용자가 실제로 페이지에 접근하기 전 미리 해당 페이지의 데이터를 로드하여 UX를 향상시키는 프리패치 기술을 사용한다. middleware에서 프리패치도 인식이 되면서, 실시간 로그인 상태에 따른 조건부 처리가 필요한 dashboard와 같은 페이지에서 실시간 로그인 상태가 아닌 프리패치 되었을 때의 로그인 상태로 적용되어 각 페이지마다 로그인 상태가 제대로 적용되지 않았다.

### 💡 해결

middleware의 request header에서 프리패치를 구분할 수 있는 Purpose 속성을 통해 프리패치 path가 아닐 때만 조건부 처리하도록 코드를 수정하였다.

```jsx
if (pathname.startsWith("/dashboard") || pathname.startsWith("/metaverse")) {
    if (!session && request.headers.get("Purpose") !== "prefetch") {
      const url = new URL("/signin", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("message", "login_first");
      return response;
    }
  }

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    if (session && request.headers.get("Purpose") !== "prefetch") {
      const url = new URL("/", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("message", "login_already");
      return response;
    }
  }

  if (session && pathname.startsWith("/metaverse")) {
    const spaceId = request.url.split("?")[0].split("/").at(-1);
    const checkResult = await checkSpace(spaceId!);
    if (!checkResult) {
      const url = new URL("/dashboard", request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("message", "invalid_space");
      return response;
    }
  }
```

<br/>

### # 5. AWS SSL 적용

> ❗ AWS에 SSL 적용 후 https로 접속되지 않는 문제 발생

---

### ❓ 원인

SSL인증서를 발급 받을때 미리 Route53에 등록한 URL를 사용해서 SSL을 발급받아 문제가 발생하였다.

### 💡 해결

구매한 도메인을 가지고 SSL을 발급받아야하고 발급 받을때 \*.domain.com을 사용해서 발급 받은 후 Route53에 적용하고 Load Balancer와 연결하여 해결하였다.

<br/>

### # 6. socket 단일 인스턴스화

> ❗ 한번에 여러 화면이 공유되거나 제대로 화면이 공유 중단이 되지 않는 문제 발생

---

### ❓ 원인

socket을 사용하는 컴포넌트마다 socket 인스턴스가 생성이 되서 여러 개의 socket이 서버와 연결되면서 문제가 발생하였다.

### 💡 해결

<img src='https://media.discordapp.net/attachments/1187406262380535868/1204336252095041586/socket.1.jpeg?ex=65d45c89&is=65c1e789&hm=9542c114abe181992a9402a7be6e78aec41f4f84ff44cfc731209d715b5fb922&=&format=webp&width=992&height=700'/>

이 문제는 zustand 통해 싱글톤 패턴을 구현하여 하나의 소켓 인스턴스만 생성되고 사용되도록 함으로써 해결하였다. 이 를 통해 중복 문제를 효과적으로 제거하고 화면 공유 기능을 안정화하였다.

<br/>

## <a id="팀원-소개"></a> 🧑🏻‍💻**👩🏻‍💻** 팀원 소개

| 이름   | 태그     | github 주소                        |
| ------ | -------- | ---------------------------------- |
| 권경열 | 리더     | https://github.com/yeolsss         |
| 이진호 | 부리더   | https://github.com/dygmm4288       |
| 송용승 | 팀원     | https://github.com/yongseung-song  |
| 김명섭 | 팀원     | https://github.com/kms99           |
| 강보미 | 디자이너 | https://github.com/SpringintheFall |

