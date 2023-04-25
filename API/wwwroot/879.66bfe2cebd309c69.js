"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[879],{5879:(S,d,r)=>{r.r(d),r.d(d,{JobsModule:()=>A});var a=r(6895),c=r(2559),p=r(6590),t=r(1571),m=r(7573),u=r(5329),b=r(7696),h=r(6304);const g=function(s){return{"border-5 border-opacity-100 border-info bg-white shadow-info":s}};let v=(()=>{class s{constructor(){this.job={},this.show=!0,this.isActive=!1,this.fullName="",this.address="",this.photoUrl=""}ngOnInit(){const e=this.job.userJob.user,o=this.job.userJob.user.appUserAddress.address;this.fullName=`${e.firstName} ${e.lastName}`,this.address=`${o.city}, ${o.state}. ${o.zipcode}`,this.photoUrl=e.appUserPhoto.photo.url}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-job-card"]],inputs:{job:"job",show:"show",isActive:"isActive"},decls:11,vars:7,consts:[[1,"bg-transparent","mb-3","p-1","p-sm-3","border","border-primary","border-3","rounded-4","border-opacity-25","pointer",3,"ngClass"],[1,"row"],[1,"col-12","col-sm-4","d-flex","align-items-center","mb-3","mb-sm-0"],[1,"img-fluid","rounded",3,"src"],[1,"col-12","col-sm-8"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.qZA(),t.TgZ(4,"div",4)(5,"h5"),t._uU(6),t.qZA(),t.TgZ(7,"p"),t._uU(8),t.qZA(),t.TgZ(9,"p"),t._uU(10),t.qZA()()()()),2&e&&(t.Q6J("ngClass",t.VKq(5,g,o.isActive)),t.xp6(3),t.s9C("src",o.photoUrl,t.LSH),t.xp6(3),t.hij(" ",o.fullName," "),t.xp6(2),t.hij(" ",o.job.name," "),t.xp6(2),t.hij(" ",o.address," "))},dependencies:[a.mk]}),s})();const f=["search"];function J(s,n){if(1&s){const e=t.EpF();t.TgZ(0,"div",16)(1,"app-job-card",17),t.NdJ("click",function(){const l=t.CHM(e).$implicit,Z=t.oxw(2);return t.KtG(Z.clickCard(l.id))}),t.qZA()()}if(2&s){const e=n.$implicit,o=t.oxw(2);t.xp6(1),t.Q6J("job",e)("isActive",o.isCurrent(e))}}function C(s,n){if(1&s){const e=t.EpF();t.TgZ(0,"div",18)(1,"app-pager",19),t.NdJ("pageChanged",function(i){t.CHM(e);const l=t.oxw(2);return t.KtG(l.onPageChanged(i))}),t.qZA()()}if(2&s){const e=t.oxw(2);t.xp6(1),t.Q6J("totalCount",e.totalCount)("pageSize",e.params.pageSize)("pageNumber",e.params.pageNumber)}}function j(s,n){if(1&s){const e=t.EpF();t.TgZ(0,"div",2)(1,"div",3)(2,"div",4)(3,"input",5,6),t.NdJ("keyup.enter",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onSearch())}),t.qZA(),t.TgZ(5,"button",7),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onSearch())}),t._UZ(6,"i",8),t.qZA(),t.TgZ(7,"button",9),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.onReset())}),t._UZ(8,"i",10),t.qZA()(),t.TgZ(9,"div",2)(10,"div",11)(11,"div",2),t.YNc(12,J,2,2,"div",12),t.qZA()(),t.TgZ(13,"div",13),t._UZ(14,"app-job-info",14),t.qZA()(),t.YNc(15,C,2,3,"div",15),t.qZA()()}if(2&s){const e=t.oxw();t.xp6(12),t.Q6J("ngForOf",e.jobs),t.xp6(2),t.Q6J("loggedIn",e.loggedIn)("job",e.selectedCard(e.jobs))("myJobs",e.myJobs),t.xp6(1),t.Q6J("ngIf",e.totalCount>0)}}const _=[{path:"",component:(()=>{class s{constructor(e,o,i){this.jobService=e,this.route=o,this.accountService=i,this.jobs=[],this.totalCount=0,this.cardIndex=1,this.loggedIn=!1,this.isIndexFollowed=!1,this.sortOptions=[{name:"Alfab\xe9ticamente",value:"name"},{name:"Precio: Mayor a menor",value:"priceAsc"},{name:"Precio: Menor a mayor",value:"priceDesc"}],this.jobService.resetParams(),this.params=e.getParams(),this.params.areaId=this.route.snapshot.queryParams.area||0,this.account=this.accountService.getAccount(),null===this.account&&(this.myJobs=[]),null!==this.account&&(this.loggedIn=!0)}ngOnInit(){this.loadJobs(),this.loadAreas(),null!==this.account&&this.loadMyInterests()}loadMyInterests(){this.jobService.getInterestedJobsList().subscribe({next:e=>{this.myJobs=e}})}loadJobs(){this.jobService.getAll().subscribe({next:e=>{this.jobs=e.data,this.totalCount=e.count,this.cardIndex=this.jobs[0].id}})}loadAreas(){this.jobService.getAreas().subscribe({next:e=>this.areas=e})}onPageChanged(e){const o=this.jobService.getParams();o.pageNumber!==e&&(o.pageNumber=e,this.jobService.setParams(o),this.params=o,this.loadJobs())}onSortSelected(e){const o=this.jobService.getParams();o.sort=e.target.value,this.jobService.setParams(o),this.params=o,this.loadJobs()}onCategorySelected(e){const o=this.jobService.getParams();o.areaId=e,o.pageNumber=1,this.jobService.setParams(o),this.params=o,this.loadJobs()}onSearch(){const e=this.jobService.getParams();e.search=this.searchTerm?.nativeElement.value,e.pageNumber=1,this.jobService.setParams(e),this.params=e,this.loadJobs()}onReset(){this.searchTerm&&(this.searchTerm.nativeElement.value=""),this.params=new p.R,this.jobService.setParams(this.params),this.loadJobs()}selectedCard(e){return this.myJobs?.forEach(o=>{o.jobId===this.cardIndex&&(this.isIndexFollowed=!0)}),e.filter(o=>o.id===this.cardIndex)[0]}isCurrent(e){return e.id===this.cardIndex}clickCard(e){this.cardIndex=e}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(m.e),t.Y36(c.gz),t.Y36(u.B))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-jobs"]],viewQuery:function(e,o){if(1&e&&t.Gf(f,5),2&e){let i;t.iGM(i=t.CRH())&&(o.searchTerm=i.first)}},decls:2,vars:1,consts:[[1,"container-fluid","container-xxl"],["class","row",4,"ngIf"],[1,"row"],[1,"col-12"],[1,"d-flex","mt-2","mb-3"],["area","text","placeholder","Encontrar",1,"form-control","me-2","bg-transparent",3,"keyup.enter"],["search",""],[1,"btn","btn-outline-info","mx-2",3,"click"],[1,"bi","bi-search"],[1,"btn","btn-outline-success",3,"click"],[1,"bi","bi-arrow-clockwise"],[1,"col-5","col-sm-6","col-lg-8"],["class","col-12 col-lg-6",4,"ngFor","ngForOf"],[1,"ps-0","ps-sm-1","col-7","col-sm-6","col-lg-4","position-sticky","info-static"],[3,"loggedIn","job","myJobs"],["class","d-flex justify-content-center",4,"ngIf"],[1,"col-12","col-lg-6"],[3,"job","isActive","click"],[1,"d-flex","justify-content-center"],[3,"totalCount","pageSize","pageNumber","pageChanged"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,j,16,5,"div",1),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",o.areas&&o.jobs&&o.myJobs))},dependencies:[a.sg,a.O5,b.P,h.t,v],styles:[".info-static[_ngcontent-%COMP%]{position:sticky;top:5rem;right:0;z-index:2;height:calc(100vh - 7rem);overflow-y:auto}"]}),s})()}];let x=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[c.Bz.forChild(_),c.Bz]}),s})();var y=r(4466);let A=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[a.ez,x,y.m]}),s})()}}]);