# what-you-see-is-what-you-git (WYSIWIG)

Github Activity/Gists 과 함께 TIL (Today I Learned) 를 작성하는 SNS 서비스

<br />

## 개발 환경

- FE (Frontend) : React TypeScript
- BE (Backend) : Java Spring
- DB (Database) : MySQL (JPA)
- ML (Machine Learning) : Pytorch(torchvision), Triton Inference Server, Flask

<br />

## 개발 절차

### issue rule

1. 목표로 한 개발/배포에 대해 issue 를 작성합니다.
2. local repository 에서 issue 에 대한 branch 를 생성 후, 해당 기능을 위한 boiler-plate 를 생성/수정 후 branch 를 생성합니다. 
3. remote repository 로 push 후, 해당 branch 를 pull request 에 등록하고 issue 를 선택합니다. 

해당 issue 에 대한 기능이 완료된 경우, PR 을 merge 하고 해당 개발 영역의 다음 개발/배포에 대해 issue 를 __당일에__ 작성합니다.  

<br />

### branch rule

각 개발 파트 별 독립적인 브랜치로 기능을 구현하며, Git-flow 전략을 이용하여 develop/relase 브랜치에서 기능을 통합

![image](https://user-images.githubusercontent.com/50660684/135558970-a12e4a7f-1929-42fa-afc2-c7f39a271b3f.png)

<https://nvie.com/posts/a-successful-git-branching-model/>

<br />

## 화면 설계 (release/0.1.0)

### 로그인 및 유저 프로필 페이지

<div>
<img src="https://user-images.githubusercontent.com/50660684/143395563-31bd167b-8a34-4732-9640-9fe78203648d.png" height="280"/>
<img src="https://user-images.githubusercontent.com/50660684/143396259-fa5b1d36-cd50-4642-8e5d-b279997e68c5.png" height="280" />
<img src="https://user-images.githubusercontent.com/50660684/143396666-10329368-c3c0-4da8-98cf-8f7f9778b05c.png" height="280" />
</div>

### 게시물 페이지 및 기록 확인 모달

<div>
<img src="https://user-images.githubusercontent.com/50660684/143396438-9d66e718-5d75-462d-9b51-4b7b0ec65323.png" height="280" />
<img src="https://user-images.githubusercontent.com/50660684/143397118-40f43d35-b150-4bf7-b40c-c635eb0677e0.png" height="280" />
<img src="https://user-images.githubusercontent.com/50660684/143396750-9cf50d21-de30-46fe-9231-24614fcf347e.png" height="280" />
</div>

### 작성 페이지 및 팔로우 페이지

<div>
<img src="https://user-images.githubusercontent.com/50660684/143397339-2034e977-c1dd-424a-9140-1035fd18c2a4.png" height="280" />
<img src="https://user-images.githubusercontent.com/50660684/143397245-10505d79-d28c-4ae1-9a7e-f6ff7642c781.png" height="280" />
<img src="https://user-images.githubusercontent.com/50660684/143397515-bbf2b5b5-07c8-4f4b-83e5-920c3d7d7be1.png" height="280" />
</div>

