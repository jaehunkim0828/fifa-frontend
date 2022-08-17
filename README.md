# FIFA ONLINE 4 선수별 데이터 분석 front-end


## 1. 목표 세우기

피파 온라인게임을 즐겨 하면서 문득 생각이 들었다.
유명 방송인들이 추천해 주는 선수들이 과연 데이터로 분석한 지표로도 성능이 좋을까?
2. 선수별(시즌별) 데이터를 비교해서 등급을 매긴다면, 현재 시장에 올라온 가격에 값어치를 하는 것일까? 오히려 가성비가 좋을까?
에 대해 궁금해졌다.

그래서 피파온라인 4 open API를 찾아보다가 랭크 정보에서 "TOP 10,000 랭커 유저가 사용한 선수의 20경기"를 발견하게 되었고, 선수(시즌) 별로 랭커들이 사용한 데이터를 추출해서 위에 세워놓은 가설들을 증명해 보려고 한다.

### "TOP 10,000 랭커 유저가 사용한 선수의 20경기"에서 주는 데이터

|데이터|유형|설명|
|-----|---|---|
shoot|Float|평균 슛 수|
effectiveShoot|Float|평균 유효 슛 수|
assist|Float|평균 어시스트 수|
goal|Float|평균 득점 수|
dribble|Float|평균 드리블 거리(야드)|
dribbleTry|Float|평균 드리블 시도 수|
dribbleSuccess|Float|평균 드리블 성공 수|
passTry|Float|평균 패스 시도 수|
passSuccess|Float|평균 패스 성공 수|
block|Float|평균 블락 성공 수|
tackle|Float|평균 태클 성공 수|
matchCount|Integer|해당 포지션으로 경기 참여한 횟수|

## 2. 계획 세우기

피파에서 데이터는 매일 3, 9, 15, 21시에 갱신되는 것을 이용해서 하루에 네번씩 데이터를 수집하기로 결정했다.(2022/07)

모든 선수들의 데이터를 수집하는것은 시간적, 비용적으로 비효율적이라고 생각이 들었다. 그래서 방송인들이 추천해준 선수들 공격수 5명, 미드필더 10명, 수비수 5명, 골키퍼 2명의 데이터를 모아서 포지션별 평균을
내서 비교해 보았다(2022/07)

|포지션|선수이름|
|------|---|
|SF|호날두, 호나우두, 에우제비우스, 크레스포, 박주영|
|MF|손흥민, 박지성, 차범근, 더 브라위너, 베컴, 발락, 굴리트, 네드베드, 페리시치, 제라드|
|DF|홍철, 반데이크, 뤼카 에라난데스, 브레메, 바란|
|GF|반데샤르, 쿠르투아|

## 3. 데이터 분석

현재(2022/08/18)까지 모인 데이터로 3명의 선수들을 비교해보았다.

<img width="1440" alt="스크린샷 2022-08-18 오전 2 33 59" src="https://user-images.githubusercontent.com/67530239/185205358-6bb9a029-00c0-4be5-9791-52fe56ff34e0.png">

적어도 좀더 정확한 데이터로 선수끼리 비교하기위해서 한선수당 1만개의 경기수가 있어야 비교가 가능할것 같다. 서로다른 시즌의 손흥민 선수는 평균 볼드리블 거리가 평균값에 근사하지만 호나우두의 평균 볼드리블 거리가 평균의 2배가까이 차이가 나는것을 보았을때, 아직은 정확한 데이터는 아니라고 생각한다. 선수마다 아무리 좋은 선수여도 많은 가격이 비싸서 사용량이 적다보니 다른 선수에 비해 데이터가 덜 모이는 경향이 있어서 좀더 시간을 가지고 데이터를 모아야겠다.

위에서 17명의 선수의 데이터를 모으기 시작했지만 각 선수마다 비 인기 시즌의 선수( ex) 22TOTY 손흥민은 성능이좋아 데이터가 많이 쌓이지만 18s 손흥민은 성능이 많이 떨어져서 데이터도 안쌓이고 좋지않은 성능탓에 평균값을 깍아먹는다.)존재하는데 한선수의 모든 시즌의 데이터를 축척하다 보니 낮은 성능의 데이터로인해 좋은 선수들의 성능을 비교해 등급을 나누는데 있어서 펑균값을 깍는 다고 생각하여서 비시즌 선수들의 데이터수집을 멈추고 좀더 다양한 선수들의 데이터를 모으려고 한다.(2022/08/18)


## 4. 검증 및 평가

## 5. 결과 
