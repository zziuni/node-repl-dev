# Node-REPL-Dev (repld.js)

## What is this?
간단한 코드를 테스트할 때 사용하는 Node REPL의 확장 버전입니다. library, module 테스트가 용의하도록 REPL이 시작될 때 자동으로 프로젝트의 모듈을 require() 시킬 수 있습니다. 

##Installation

	npm install -g repld

## Usage

project root path에서 `repld`를 입력한다. 그러면 `package.json`의 dependencies 에 참조 되어있는 모든 module를 **모둘명**으로 `require()`한 REPL이 활성화 된다. 

	>repld	
	Loading modules by package.json
	lodash(~1.3.1) module loaded.
	jquery(~1.8.3) module loaded.
	d3(~3.2.5) module loaded.
	log-errors(~3.4.2) module loaded.
	colors(~0.6.0-1) module loaded.

	Completed loading
	You can access each module by the Module's names

	Dev >



## Todo
* 실행 옵셥 추가.
  * devDependencies도 불러오기(dev mode)
  * 특정 모듈만 불러오기(only mode)
  * 유명 모듈을 불러 올 수 있는 옵션


## License
BSD
