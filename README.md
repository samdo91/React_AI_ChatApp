1. 무엇을 위한 프로젝트인가 
 이 프로젝트에는 두가지 기능이 있습니다. 
 
 
  - 채팅방을 만들어 입장하여 대화를 주고 받을 수 있는 채팅 앱
  -  AI aip를 사용한 인공지능과의 대화 
  
2. 무엇을 사용하였는가? 

  소스 코드 에디터

    Visual Studio Code


  프로그래밍 언어

    react 


  라이브러리

    -client

      @emotion/styled
      axios
      react-intersection-observer
      react-router-dom
      jotai
      socket.io-client
      react-scroll-to-bottom
    
    
    -server
      express
      nodemon
      openai
      socket.io
      cors
 
3.어떻게 사용하였는가?

 part1. WebSocket 을 이용한 chat app
    
    1. 서버를 만들어 보자! 
      이번 개발을 통해 처음으로 서버를 만들어 보았다. 백엔드의 영역이라고는 하지만 내생각으로는 단순히 프론트엔드만으로 훌륭한 결과물을 만들어낼 수 없다는 것을 알았다.
      한 발 더 나아가서 백엔드 쪽도 조금씩 알아가자.
    
      서버란? 
       컴퓨터에서는 서버는 클라이언트에게 여러 가지 서비스를 제공하는 것을 뜻한다.
      
      무엇을 이용하지?
      node.js를 이용 할 것이다. 그동안 알게 모르게 node.js를 이용하고 있었다. 
      그중 expess라는 프레임워크를 사용할 것이다.
      
      expess? Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크
          
      express를 이용하여 서버를 만드는 방법은 간단했다. 

      
  !시작하기 전에!
        npm init으로 package.json을 꼭 만들어야한다. 평소 CRA를 사용하여 생각하지 못한 부분
        
      그 뒤로 
          // node_modules 에 있는 express 관련 파일을 가져온다.
          const express = require("express");

          // express 는 함수이므로, 반환값을 변수에 저장한다.
          const app = express();

          // 3001 포트로 서버 오픈
          //root url에 대한 라우트를 정의한다. localhost:3001으로 서버에 접속하면 클라이언트에 index.html을 전송한다.
          const PORT = 3001 || process.nev.PORT;

          server.listen(PORT, () => {
          console.log(`${PORT} 연결 완료`);
          });
      
        
더 나아가 라우팅처리는 react-router-dom를 이용했다.

서버를 만드는 것으 쉬웠다. 라우팅 마다 할당된 데이터를 집어넣는 것은 어렵지 않는 일이었다. 

진정한 배움은 여기서 부터다.




      2. WebSocket이란? 

    
        Transport protocol의 일종으로 서버와 클라이언트 간의 효율적인 양방향 통신을 실현하기 위한 구조입니다.
        이를 풀어서 설명하면 일반적인 서버 통신은 단방향 통신으로 볼 수 있다. 서버가 열리고 닫히는데 한번의 요청을 통해 서버에 요청하거나 
        서버에서 요청받는 한번에 하나의 일로 끝난다. 
        그러나 WebSocket을 약속하며 지속적인 통신을 가능하게 한다. 
        그러니 WebSocket은 HTTP의 약속이다. 
        
        WebSocket를 만드는 데 거의 ws를 사용한다 그러나
        chat앱을 만들기 위해서는Cross-platform WebSocket API socket.io를 사용하기로 했다.
        
        
    socket.io?
      
      -사용법
      // node_modules 에 있는 socket.io 관련 파일을 가져온다.
      const { Server } = require("socket.io");
      //서버를 만든다.
      const server = http.createServer(app);
      // new server를 정의한다. 
      const io = new Server(server, {
      cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
        },
      });
      // 클라이언트가 socket.io 서버에 접속했을 때 connection 이벤트가 발생한다. connection event handler를 정의한다.
      io.on("connection", (socket) => {
      console.log(`User: ${socket.id}에 연결됨`);
      
      -여기서 on과 emit 메서드란?
      
      socket.on('이벤트 명', Callback Function) : 해당 이벤트를 받고 콜백함수를 실행합니다.
      socket.emit('이벤트 명', Data) : 이벤트 명을 지정하고 데이터를 보냅니다.
      
      즉 on은 받는 것 emit은 보내는 것을 말한다. 이는 socket.io-client에서도 동일하다.
      
    3. socket.io-client을 이용하여 server와 client를 연결하자 
      socket.io-client는 soket.io를 server 측이 아닌 client 측에서 사용하기 위한 라이브러리다. 
      사용법은 socket.io와 매우 흡사하며 server 쪽에서 만들어놓은 websoket에 연결해주는 기능을 한다. 
      
      //소켓 연결
        const socket = io.connect("http://localhost:3001");
         여기서 연결된 소켓은 지속적인 이용이 가능하다. 
      props로 넘겨주는것도 가능하다. 하지만 이걸 jotai의 아톰으로 만드는 건 실패!  
      // 그리고 이런식으로 통신할 수 있다. join_room이라는 이벤트를 만들어 데이터를 보낸다. 
       socket.emit("join_room", roomNumber);
      
   이후 룸 넘버를 받아줄 버튼과 input HTML을 만들고 이벤트와 function를 만들어준다. 
   !중요!socket.emit, socket.on도 function으로 다룰 수 있다.


    4. 대형 error Cross-Origin Resource Sharing! 
    나는 이 문제로 이틀간 고생했다. 이틀간 공부한 것을 여기 정리해보자
    Cross-Origin Resource Sharing란 무엇일까? server와 client를 처음 연결하고 기분이 좋았다.
    
    그런데 그 순간 엄청난 에러가 뜨는게 아닌가?
    
    🚨 Access to fetch at ‘https://api.lubycon.com/me’ from origin ‘http://localhost:3000’ has been blocked by CORS policy: No ‘Access-Control-Allow-Origin’ header is present on the requested resource. If an opaque response serves your needs, set the request’s mode to ‘no-cors’ to fetch the resource with CORS disabled.
    
    CORS(Cross-Origin Resource Sharing) 란
    CORS는 Cross-Origin Resource Sharing의 줄임말로, 다른 출처 간의 리소스 공유를 제한하는 보안 정책이다. 이는 웹 보안을 위한 최소한의 보장을 제공한다. 출처(Origin)란 프로토콜, 호스트, 포트 번호를 결합한 것을 말하며, 다른 출처란 이 세 가지 중 하나라도 다른 경우를 의미한다.
    
    그럼 여기서 출처(origin)란?
    Protocol과 Host 그리고 포트번호를 의미한다. 그러니까 CORS(Cross-Origin Resource Sharing)은 단순히 코딩적인 의미의 오류가 아니라 전세계가 약속인 정책의 이슈라고 할 수 있다.
    보안에 걸리는 문제라니 꼼꼼히 따져 봐야하는 문제다. 하지만 잘 생각해보면 이렇게 출처가 다른 두 개의 어플리케이션이 마음대로 소통할 수 있는 환경은 꽤 위험한 환경이다.
    이 문제를 해결하는 다양한 방법이 있겠지만 내가 찾아내고 적용해본 방식은 2가지다. 
      1. 프록시를 사용한다. CRA 자체적으로 프록시를 지원한다는걸 알았다.  
      2. CORS를 이용한다. 
          - cors는 Node.js를 위한 미들웨어로, Express 및 Connect 애플리케이션에서 바로 사용할 수 있다. 다른 출처에서의 리소스 요청이 허용되는 출처를 설정할 수 있으며, 이를 통해 CORS 정책 위반을 방지할 수 있다.
          그렇다면 여기서 미들웨어란? 미들웨어는 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어 다리 역할을 한다.
          
          사용법은?
          // cors를 불러온다.
          const cors = require('cors');
          // 미리 만들어 놓은 app= express()에 cors를 연결한다.
          app.use(cors());
          매우 간단하게 해결 가능한 이슈였다. 여러 사이트를 들러본 결과 서버를 만들 때 기본적으로 깔고 가는 코드들도 많았다. 
          
            
            
 part2. openai의 open api를 이용하여 인공지능 chatApp만들기
   
   1.무언가 잘못되었다!  
   
   WebSocket를 이용하는 법을 알아낸 다음 나는 이것을 aiChat와 결합할 수 있을거라 생각했다.
    하지만 openai에서 배포한 open api를 사용하는 것이기 때문에 내가 서버를 만들 필요가 없었다. 
    
    !! 이것은 단순하게 Rest Api를 사용하는 것일 뿐이었다 !!
     생각보다 ai를 쉽게 가져올 수 있었다.
     
     
     이번에는 axios 대신 async await를 사용하였고 채팅 룸이 들어올때 지정한 ai 네임과 나의 이름을 인자로 보내준다.
         prompt:
          messageList.length < 1
            ? `안녕 내 이름은 ${myName}이고 너의 이름은 ${herName}이야. 우리 대화 할거야. 나에게 인사해주겠니, ${herName}야`
            : currMessage,
 
     !!! 어 고장났다? !!!
      openai에서 준 personal key는 깃허브에 push하면 에러가 난다. 아마 개인정보 보안 이슈인거 같다.
      새로 personal key를 발급하여 교체해주니 다시 정상적으로 실행된다. 
      엄청난 기술력이다. 이걸 어떻게 한 걸까. 검색해도 안나온다. 
      
      
      
      
      

2. css의 진화 @emotion/styled
  emotion은 이전부터 css 라이브러리로 사용하였는데 emotion에는 크게 세 가지 사용법이 있고 나는 그중 @emotion/react를 사용하고 있다
  
  @emotion/react의 단점
  emotion/react는 직접 태그나 클래스에 바로 적용한 방식을 쓰는데 이 방식으로 사용이 편하고 어떤 태그에 어떤 효과를 넣었는 지 바로 알 수 있어 좋지만 
  react에 적용하니 코드가 너무 난잡해지는 느낌이 있고 리멘트 태그의 상속이 어떻게 되는 지 보기가 힘들었다. 애니메이션이라도 넣으려고 하면 태그 길이가 너무 길어져 코드가 한 눈에 보이지 않았다. 
  즉 가독성이 떨어진다. 
  
  
  
  
  그래서 이번에 적용한 방법이 emotion/styled는 간단하게 엘리먼트 태그를 컴포넌트화 시킨다고 생각하면 좋다. 컴포넌트로 만들어 그 자제체 css를 적용하는 방식이다.
  
    return( <div> 
           <Div>blue</Div>
           <Div pink>pink</Div>
           <div> ) 
    
    const Div = styled.div`  color: ${props => (props.pink ? 'pink' : 'blue')};`

    Div는 컴포넌트로 선언되었고 그 태그의 스타일은 div가 되는 것이다. 여기서 재미있는 것은 props를 이용하여 색 혹은 값을 변경 할 수 있다는 것이다. 
    위의 Div는 컴포넌트에 선언된 props가 없기 때문에 삼항연자자에 의하여 false로 판단되어 blue가 되고
    아래 Div 컴포넌트는 pink라는 props가 있기 때문에 색상이 pink가 된다. 
    미리 만들어 놓은 컴포넌트에 props로  구성 요소의 스타일을 변경할 수 있다. 
    
    
    
   
4. 무엇을 배웠는가 

   1. express 이용하여 서버를 만드는 법과 서버 통신
   2. WebSocket이란 무엇인가?
   3. socket.io를 사용하여 WebSocket을 만들고 client에 적용하기 
   4. CORS 정책이란? 
   5. cors 라이브러리 사용법
   6. emotion/styled로 스타일 주기
      
      
