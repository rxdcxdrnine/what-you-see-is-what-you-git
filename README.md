# what-you-see-is-what-you-git (WYSIWIG)

Github Activity/Gists 과 함께 TIL (Today I Learned) 를 작성하는 SNS 서비스

## 개발 환경

- FE (Frontend) : React TypeScript
- BE (Backend) : Java Spring
- DB (Database) : MySQL (JPA)
- ML (Machine Learning) : Pytorch(torchvision), Triton Inference  Server

## 개발 절차

### issue rule

1. 목표로 한 개발/배포에 대해 issue 를 작성합니다.
2. local repository 에서 issue 에 대한 branch 를 생성 후, 해당 기능을 위한 boiler-plate 를 생성/수정 후 branch 를 생성합니다. 
3. remote repository 로 push 후, 해당 branch 를 pull request 에 등록하고 issue 를 선택합니다. 

해당 issue 에 대한 기능이 완료된 경우, PR 을 merge 하고 해당 개발 영역의 다음 개발/배포에 대해 issue 를 __당일에__ 작성합니다.  


### branch rule

각 개발 파트 별 독립적인 브랜치로 기능을 구현하며, Git-flow 전략을 이용하여 develop/relase 브랜치에서 기능을 통합

![image](https://user-images.githubusercontent.com/50660684/135558970-a12e4a7f-1929-42fa-afc2-c7f39a271b3f.png)

<https://nvie.com/posts/a-successful-git-branching-model/>
