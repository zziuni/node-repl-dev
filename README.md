# Node-REPL-Dev (repld.js) v0.0.3

## What is this?
간단한 코드를 테스트할 때 사용하는 Node REPL의 확장 버전입니다. library, module 테스트가 용의하도록 REPL이 시작될 때 자동으로 프로젝트의 모듈을 require() 시킬 수 있습니다. 

##Installation

    npm install -g node-repl-dev

## Usage

`repld`를 **npm Project Root Path**에서 입력한다. 

    >repld

그러면 `package.json`의 **dependencies** 에 참조 되어있는 모든 module를 `require()`한 REPL이 활성화 된다. 각 모듈은 **모둘명**으로 참조한다. 

    >repld -dev

`package.json`의 **dependencies**와 함께 **devDependencies**도 모두 `require()`한 REPLD를 활성화한다. 

    >repld -jqury

`package.json`를 무시하고 **jquery**만 `require()`한 REPL를 활성화한다. jquery는 `$`로 참조한다. Node-REPL-Dev에 내장되어있으므로 project의 node_modules에 없어도 사용할 수 있다. 

    >repld -d3

`package.json`를 무시하고 **d3**만 `require()`한 REPL를 활성화한다. d3는 `d3`로 참조한다. Node-REPL-Dev에 내장되어있으므로 project의 node_modules에 없어도 사용할 수 있다. 


## Todo
* 실행 옵셥 추가.
  * 특정 모듈만 불러오기(only mode)


## License
BSD
