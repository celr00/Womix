"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[642],{8642:(T,l,r)=>{r.r(l),r.d(l,{ListModule:()=>A});var c=r(6895),m=r(2559),h=r(6590),t=r(1571),u=r(7573),d=r(5329),b=r(8909),g=r(7696);const f=["search"];function v(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"div",13),t.NdJ("keyup.enter",function(){const n=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.visit(n.id))}),t.TgZ(1,"div")(2,"span",14),t._uU(3),t.qZA(),t.TgZ(4,"span",15),t._uU(5),t.qZA()(),t.TgZ(6,"div")(7,"span"),t._uU(8),t.qZA()(),t.TgZ(9,"div",16)(10,"div",17)(11,"span",18),t._uU(12),t.qZA()(),t.TgZ(13,"div",19)(14,"span",20),t._uU(15),t.ALo(16,"currency"),t.qZA()()()()}if(2&s){const e=o.$implicit;t.MGl("routerLink","/account/jobs/list/",e.id,""),t.xp6(3),t.hij(" ",e.id," "),t.xp6(2),t.hij(" ",e.name," "),t.xp6(3),t.hij(" ",e.description," "),t.xp6(4),t.hij(" ",e.jobArea.area.name," "),t.xp6(3),t.hij(" ",t.lcZ(16,6,e.salary)," ")}}function C(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"tr",21),t.NdJ("keyup.enter",function(){const n=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.visit(n.id))}),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.ALo(9,"currency"),t.qZA(),t.TgZ(10,"td"),t._uU(11),t.qZA()()}if(2&s){const e=o.$implicit;t.MGl("routerLink","/account/jobs/list/",e.id,""),t.xp6(2),t.hij(" ",e.id," "),t.xp6(2),t.hij(" ",e.name," "),t.xp6(2),t.hij(" ",e.description," "),t.xp6(2),t.hij(" ",t.lcZ(9,6,e.salary)," "),t.xp6(3),t.hij(" ",e.jobArea.area.name," ")}}function j(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"div",22)(1,"app-pager",23),t.NdJ("pageChanged",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.onPageChanged(a))}),t.qZA()()}if(2&s){const e=t.oxw();t.xp6(1),t.Q6J("totalCount",e.totalCount)("pageSize",e.params.pageSize)("pageNumber",e.params.pageNumber)}}const k=[{path:"",component:(()=>{class s{constructor(e,i,a,n){this.jobService=e,this.accountService=i,this.bcService=a,this.router=n,this.totalCount=0,this.jobService.resetParams(),this.params=this.jobService.getParams(),this.bcService.set("@jobsListComponentBreadcrumbTitle","My jobs"),this.accountId=this.accountService.getAccountId()}ngOnInit(){this.params.userId=this.accountId,this.params.pageSize=12,this.jobService.setParams(this.params),this.loadJobs()}loadJobs(){this.jobService.getAll().subscribe({next:e=>{this.jobs=e.data,this.totalCount=e.count}})}onPageChanged(e){const i=this.jobService.getParams();i.pageNumber!==e&&(i.pageNumber=e,this.jobService.setParams(i),this.params=i,this.loadJobs())}onIdClick(){switch(this.params.sort){case"idDesc":default:this.params.sort="idAsc",this.jobService.setParams(this.params);break;case"idAsc":this.params.sort="idDesc",this.jobService.setParams(this.params)}this.loadJobs()}onNameClick(){switch(this.params.sort){case"nameDesc":default:this.params.sort="nameAsc",this.jobService.setParams(this.params);break;case"nameAsc":this.params.sort="nameDesc",this.jobService.setParams(this.params)}this.loadJobs()}onDescriptionClick(){switch(this.params.sort){case"descriptionDesc":default:this.params.sort="descriptionAsc",this.jobService.setParams(this.params);break;case"descriptionAsc":this.params.sort="descriptionDesc",this.jobService.setParams(this.params)}this.loadJobs()}onAreaClick(){switch(this.params.sort){case"areaDesc":default:this.params.sort="areaAsc",this.jobService.setParams(this.params);break;case"areaAsc":this.params.sort="areaDesc",this.jobService.setParams(this.params)}this.loadJobs()}onSalaryClick(){switch(this.params.sort){case"salaryDesc":default:this.params.sort="salaryAsc",this.jobService.setParams(this.params);break;case"salaryAsc":this.params.sort="salaryDesc",this.jobService.setParams(this.params)}this.loadJobs()}onSearch(){const e=this.jobService.getParams();e.search=this.searchTerm?.nativeElement.value,e.pageNumber=1,this.jobService.setParams(e),this.params=e,this.loadJobs()}onReset(){this.searchTerm&&(this.searchTerm.nativeElement.value=""),this.params=new h.R,this.params.userId=this.accountId,this.params.pageSize=12,this.jobService.setParams(this.params),this.loadJobs()}visit(e){this.router.navigateByUrl(`/account/jobs/list/${e}`)}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(u.e),t.Y36(d.B),t.Y36(b.pm),t.Y36(m.F0))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-list"]],viewQuery:function(e,i){if(1&e&&t.Gf(f,5),2&e){let a;t.iGM(a=t.CRH())&&(i.searchTerm=a.first)}},inputs:{jobs:"jobs"},decls:25,vars:3,consts:[[1,"d-flex","mt-2","mb-3"],["type","text","placeholder","Encontrar",1,"form-control","me-2","bg-transparent",3,"keyup.enter"],["search",""],[1,"btn","btn-outline-info","mx-2",3,"click"],[1,"bi","bi-search"],[1,"btn","btn-outline-success","me-2",3,"click"],[1,"bi","bi-arrow-clockwise"],[1,"d-md-none"],["class","pointer mobile-row row p-3","tabindex","0",3,"routerLink","keyup.enter",4,"ngFor","ngForOf"],[1,"table","d-none","d-md-block"],["scope","col pointer",3,"click"],["class","pointer table-row","tabindex","0",3,"routerLink","keyup.enter",4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],["tabindex","0",1,"pointer","mobile-row","row","p-3",3,"routerLink","keyup.enter"],[1,"text-muted","fw-semibold","fst-italic","me-2"],[1,"fs-5","fw-light"],[1,"row"],[1,"col"],[1,"fw-light","fst-italic","text-info"],[1,"col","d-flex","justify-content-end"],[1,"text-success"],["tabindex","0",1,"pointer","table-row",3,"routerLink","keyup.enter"],[1,"d-flex","justify-content-center"],[3,"totalCount","pageSize","pageNumber","pageChanged"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"input",1,2),t.NdJ("keyup.enter",function(){return i.onSearch()}),t.qZA(),t.TgZ(3,"button",3),t.NdJ("click",function(){return i.onSearch()}),t._UZ(4,"i",4),t.qZA(),t.TgZ(5,"button",5),t.NdJ("click",function(){return i.onReset()}),t._UZ(6,"i",6),t.qZA()(),t.TgZ(7,"div",7),t.YNc(8,v,17,8,"div",8),t.qZA(),t.TgZ(9,"table",9)(10,"thead")(11,"tr")(12,"th",10),t.NdJ("click",function(){return i.onIdClick()}),t._uU(13,"#"),t.qZA(),t.TgZ(14,"th",10),t.NdJ("click",function(){return i.onNameClick()}),t._uU(15,"Name"),t.qZA(),t.TgZ(16,"th",10),t.NdJ("click",function(){return i.onDescriptionClick()}),t._uU(17,"Description"),t.qZA(),t.TgZ(18,"th",10),t.NdJ("click",function(){return i.onSalaryClick()}),t._uU(19,"Salary"),t.qZA(),t.TgZ(20,"th",10),t.NdJ("click",function(){return i.onAreaClick()}),t._uU(21,"Area"),t.qZA()()(),t.TgZ(22,"tbody"),t.YNc(23,C,12,8,"tr",11),t.qZA()(),t.YNc(24,j,2,3,"div",12)),2&e&&(t.xp6(8),t.Q6J("ngForOf",i.jobs),t.xp6(15),t.Q6J("ngForOf",i.jobs),t.xp6(1),t.Q6J("ngIf",i.totalCount>0))},dependencies:[c.sg,c.O5,m.rH,g.P,c.H9],styles:["th[_ngcontent-%COMP%]{cursor:pointer!important}.mobile-row[_ngcontent-%COMP%]:focus, .table-row[_ngcontent-%COMP%]:focus{background-color:#006a8c}.mobile-row[_ngcontent-%COMP%]:focus   *[_ngcontent-%COMP%], .table-row[_ngcontent-%COMP%]:focus   *[_ngcontent-%COMP%]{color:#fff!important}"]}),s})(),data:{breadcrumb:{alias:"jobsListComponentBreadcrumbTitle"}}},{path:":id",loadChildren:()=>Promise.all([r.e(592),r.e(427)]).then(r.bind(r,9427)).then(s=>s.ItemModule),data:{breadcrumb:{alias:"jobItemComponentBreadcrumbTitle"}}}];let _=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[m.Bz.forChild(k),m.Bz]}),s})();var Z=r(4466);let A=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[c.ez,_,Z.m]}),s})()}}]);