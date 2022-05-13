# FastLane 사전과제_이호찬

## Getting Started
### 원격 저장소 내려받기
```
$ git clone https://github.com/lhc0506/fastlane.git
$ npm install
```
### 환경 변수 설정
```
NEXT_PUBLIC_ISSUES_API = "https://api.github.com/repos/facebook/create-react-app/issues"
```
### 실행
```
$ npm run build
$ npm run start
```
### 테스트
```
$ npm run cypress
```
---
## 페이지 구성
```
http://localhost:3000/ => Home Page
http://localhost:3000/issues => Git Hub Issues Page(과제구현페이지)
```
---
## Challenges
### Next JS
- <details>
  <summary>
    사용동기
  </summary>
  CSR과 SSR의 개념은 알고 있었고, Node를 사용하여 Pug나 ejs파일을 넘기는 식으로 간단한 SSR을 구성해본 적이 있었습니다. 하지만 최근 많이 사용되는 CSR + SSR의 개념을 적용해본 적이 없어 이번 기회를 통해 Next.js(이하 Next)를 사용하여 적용 시켜 보았습니다.
</details>

- <details>
  <summary>
    적용기
  </summary>
  Next JS를 사용함으로서 느껴지는 가장 큰 장점은 Router를 따로 설정할 필요가 없다는 점이었습니다. Next의 Link API를 사용하여 path를 적어주고, pages 폴더에 같은 이름의 js파일을 생성하면 끝이었습니다. (HTML의 a태그 를 사용해도 되지만 a태그는 서버에 페이지를 요청하고 새로 고치기 때문에 Next의 사용이유인 SSR + CSR을 사용할 수 없게 되어 제외하였습니다) 과제를 완료하는데 하나의 페이지로 끝낼 수 있었지만, 하나의 페이지만으로는 Next를 사용하는 의미가 없어질 것 같아 Home과 Issues 페이지를 생성하였습니다. 각각 URL로 접속 후 서버로 요청이 들어오게 되면 _app.js 컴포넌트가 가장 먼저 실행된 후 공통 레이아웃을 만들게 됩니다. 공통 레이아웃에 navbar를 제작하여 모든페이지에서 navbar가 보일 수 있도록 구성하였습니다. 그 후 해당 컴포넌트들이 실행되어 server에서 렌더링한 후 DOM을 생성하여 Client에 html파일을 넘기게 됩니다. (npm run build 시 pre-render 되어 HTML을 생성)
</details>

- <details>
  <summary>
    SSR vs SSG
  </summary>
  SSR 개념에서 가장 중요한 pre-render를 하는데, Next에서 제공하는 두 가지 형식이 있습니다.

  - Static-Generation (추천) : HTML을 빌드 타임에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML 문서를 반환한다.
  - Server-Side-Rendering : 요청이 올 때마다 해당하는 HTML 문서를 그때그때 생성하여 반환한다.

  기본적으로 Next는 빌드타임(npm run build)에 pages폴더에서 작성한 각 페이지에 대한 HTML 문서를 생성하여 static 문서로 가지고 있게 됩니다. 엄밀히 말하면 Next는 SSR 형식이 아닌 SSG를 사용하고 있다고 말할 수 있습니다.

  이 개념은 Next가 페이지를 구현할 때뿐 아니라 data를 fetch 할 때도 적용이 됩니다.
  - getStaticProps: fetch하고 받은 response가 빌드 시 고정되어 빌드 이후에 수정 불가능 (revalidate 옵션 설정 시 재생성 가능)
  - getServerSideProps: 빌드와 상관없이, 페이지 요청마다 데이터를 서버로부터 가져옴.

  이번 과제의 경우 데이터가 계속 바뀌어야 하지 않는다고 판단하여 getStaticProps를 사용하였습니다. 단, 외부 데이터가 업데이트될 수 있으므로, revalidate 옵션을 넣어주어 일정 시간이 지나면 재생성할 수 있도록 구성하였습니다.
</details>

### Tailwind CSS
- <details>
  <summary>
    사용 동기
  </summary>
  리액트의 CSS를 구성해보는데 보통 styled-components를 사용했었습니다. 하나의 CSS 요소를 추가하는데도 새로운 컴포넌트를 만들어야 한다는 것이 번거로웠던 것을 Twailwind CSS를 사용해서 개선해보고자 이용해 보았습니다.
</details>

- <details>
  <summary>
    적용기
  </summary>
  Tailwind CSS는 Utility-First 컨셉을 가진 CSS 프레임워크입니다. 미리 세팅된 유틸리티 클래스를 활용하여, HTML 코드 내에서 스타일링이 가능합니다.

  Utility-First 때문에, 컴포넌트를 따로 생성하거나, class 네임을 만들어주는 작업이 불필요하여 styled-component보다 쉽고, 빠르게 원하는 디자인을 개발할 수 있습니다.

  단, 코드 자체가 못생겨지고, 미리 세팅된 유틸리티 클래스 명을 찾느라 오히려 시간이 더 걸렸습니다. 또한 이번에는 적용할 부분이 없었지만, JavaScript 코드를 사용하지 못한다는 점 또한 아쉬울 것 같습니다.
</details>

---

## 아쉬운 점
### 전역상태관리(Zustand)
- <details>
  <summary>
    사용 동기
  </summary>
  이번 과제는 API에서 데이터를 받아와 목록을 만드는 작업이 끝이므로 전역 상태 관리는 overengineering일 수 있습니다. 하지만 과제로 끝나는 것이 아닌, 서비스를 운영한다면 전역 상태 관리가 필요하지 않을까 생각이 들어 적용을 하기로 하였습니다.

  적용 간 항상 사용해왔던 Redux가 아닌, boiler plate가 훨씬 적어 인기를 얻고 있다는 Zustand를 적용해보았습니다. Zustand는 create함수를 사용하여 useStore Hook을 생성하고, state를 변경하는 콜백을 인자로 받는 set을 활용하여 redux의 reducer를 구현할 수 있습니다.
</details>

- <details>
  <summary>
    어디서 관리할 것인가
  </summary>
  전역 상태를 관리하는 곳을 어디에 두어야 할지 고민했습니다. Redux 혹은 Context API의 경우 최상단에 store를 저장하여 사용합니다. Next의 경우 이처럼 구성 하려면, _app.js에 store를 설정해야 한다 생각했고, 실제로 next-redux-wrapper 라이브러리를 보면 이와 같은 방식으로 구현하였습니다.

  하지만, SSR의 경우 한 페이지 내에서의 상태가 다른 페이지에서도 필요할지, 필요하다면 그 예시가 언제일지 궁금했습니다. 또한 zustand의 상태관리가 페이지가 변경되었을 때 유지를 할지도 확신할 수가 없다는 점이 아쉬웠습니다.

  실제 서비스를 SSR로 운영해보면서 언제 전역 상태가 필요할지, 또한 그것이 페이지당 상태관리가 아닌 전체 전역 관리를 할 필요가 있는 건지 확인해보고 싶습니다.
</details>

### 서버상태관리
- <details>
  <summary>
    아쉬운 점
  </summary>
  useEffect를 사용하여 Issues 페이지가 렌더링 되면 Zustand로 관리하는 state에 API에서 받아온 data를 넣어 관리 할 수 있도록 적용하였습니다. (Hook의 역할이므로 getStaticProps 내에서 실행 불가능)
  그런데 이 코드는 CSR에서 비동기 통신 로직 관심사 분리를 하지 못하였을 때 사용하던 방식과 같았습니다. 이 부분에서 zustand가 서버 상태관리를 해주는 데는 적합하지 못하다고 생각하였습니다.

  이번에는 시간상 서버 상태관리를 따로 하지 못하였지만 검색해본 결과 Next를 만든 Vercel에서 배포한 SWR 혹은 React Query를 사용할 때, 사용성이 좋다는 것을 보았습니다. 다음에 다시 Next를 사용하게 되면 이러한 서버 상태를 관리 할 수 있는 라이브러리를 사용해 볼 예정입니다. 또한 이와 관련하여 Hydrate 부분을 더 공부하여 사용자 친화적인 어플리케이션을 만들 수 있도록 할 것입니다.
</details>

### E2E Test 간 SSR Fetch mock
- <details>
  <summary>
    사용동기
  </summary>
  이번 과제에서 페이지가 동적으로 변하는 부분이 없고, Next를 사용함에 따라 비동기 통신(fetch)이 Server Side에 있어 Unit Test를 하기엔 적합하지 못하다고 생각했습니다.

  따로 페이지를 하나 더 추가했기 때문에 Cypress를 사용한 E2E테스트가 적합하다고 생각하였고, 이를 적용해 보려 했습니다.
</details>

- <details>
  <summary>
    아쉬운 점
  </summary>
  Cypress를 사용하여 Link API를 통한 페이지 이동이 잘 일어나는지 확인하였습니다.
  하지만 아쉬운 부분은 Server Side에서 fetch 하는 data를 mock 하는 데 실패하였습니다. 기존 Cypress에서 비동기 로직을 mock 하는 방법으로는 intercept를 사용하면 되는데, SSR(SSG)에서는 이 방법이 실행되지 않았습니다.

  한 가지 방법은 Next의 Server Side에 \<script id=_&#95;NEXT_DATA__ type="application/json"> 에 fetch 후 response data가 들어가는 데 이를 활용 할 수 있으리라 생각했었습니다. 그러나 이 역시 data가 계속 변하게 되면 정확한 test를 할 수 없기 때문에 삭제하였습니다.

  향후 이 부분을 mock 하는 법을 확인하여 정확한 test 작성을 할 예정입니다.
</details>
