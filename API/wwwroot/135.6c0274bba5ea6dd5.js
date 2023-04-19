"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[135],{5135:(w,d,r)=>{r.r(d),r.d(d,{ServicesModule:()=>T});var c=r(6895),l=r(2559),i=r(433),e=r(1571),u=r(8909),v=r(6325),f=r(5329),g=r(7185),h=r(4015),p=r(4217);function C(o,n){if(1&o&&(e.TgZ(0,"option",17),e.ALo(1,"number"),e._uU(2),e.qZA()),2&o){const t=n.$implicit;e.s9C("value",e.lcZ(1,2,t.id)),e.xp6(2),e.hij(" ",t.name," ")}}function S(o,n){if(1&o&&(e.TgZ(0,"div",12)(1,"div",13)(2,"select",14),e.YNc(3,C,3,4,"option",15),e.qZA(),e.TgZ(4,"label",16),e._uU(5,"Service category"),e.qZA()()()),2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("formControl",t.serviceForm.controls.serviceCategory.get("categoryId")),e.xp6(1),e.Q6J("ngForOf",t.categories)}}function x(o,n){if(1&o){const t=e.EpF();e.TgZ(0,"form",1),e.NdJ("ngSubmit",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.onSubmit())}),e.TgZ(1,"div",2)(2,"div",3)(3,"div",4),e._UZ(4,"app-text-input",5),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4),e._UZ(7,"app-text-area",5),e.qZA()(),e.TgZ(8,"div",3)(9,"div",4),e._UZ(10,"app-text-input",6),e.qZA()(),e.TgZ(11,"div",7),e.YNc(12,S,6,2,"div",8),e.qZA(),e.TgZ(13,"div",3)(14,"div",9)(15,"button",10),e._uU(16,"Add service "),e._UZ(17,"i",11),e.qZA()()()()()}if(2&o){const t=e.oxw();e.Q6J("formGroup",t.serviceForm),e.xp6(4),e.Q6J("label","Name")("formControl",t.serviceForm.controls.name),e.xp6(3),e.Q6J("label","Description")("formControl",t.serviceForm.controls.description),e.xp6(3),e.Q6J("label","Price")("type","number")("formControl",t.serviceForm.controls.price),e.xp6(2),e.Q6J("ngIf",t.serviceForm.get("serviceCategory")),e.xp6(3),e.Q6J("disabled",t.serviceForm.invalid)}}let F=(()=>{class o{unloadNotification(t){this.serviceForm?.dirty&&(t.returnValue=!0)}constructor(t,s,a,m,U,A){this.bcService=t,this.serviceService=s,this.fb=a,this.accountService=m,this.router=U,this.toastr=A,this.serviceForm=new i.cw({}),this.categories=[],this.user={},this.bcService.set("@newServiceTitle","Create a new service")}ngOnInit(){this.loadCategories()}onSubmit(){const t=this.serviceForm.value;this.serviceService.add(t).subscribe({next:()=>{this.serviceForm.reset(t),this.toastr.success("Service added successfully"),this.router.navigateByUrl("/account/services/list")}})}initForm(t,s){this.serviceForm=this.fb.group({name:["",[i.kI.required,i.kI.minLength(10),i.kI.maxLength(100)]],description:["",[i.kI.required,i.kI.minLength(10),i.kI.maxLength(300)]],price:["",[i.kI.required]],userService:this.fb.group({userId:[s,[i.kI.required]]}),serviceCategory:this.fb.group({categoryId:[t,[i.kI.required]]})})}loadCategories(){this.serviceService.getCategories().subscribe({next:t=>{this.categories=t},complete:()=>{this.loadUser()}})}loadUser(){this.accountService.getUser().subscribe({next:t=>{this.user=t},complete:()=>{this.initForm(this.categories[0].id,this.user.id)}})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.pm),e.Y36(v.r),e.Y36(i.qu),e.Y36(f.B),e.Y36(l.F0),e.Y36(g._W))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-new"]],hostBindings:function(t,s){1&t&&e.NdJ("beforeunload",function(m){return s.unloadNotification(m)},!1,e.Jf7)},decls:1,vars:1,consts:[[3,"formGroup","ngSubmit",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"container-fluid","container-md"],[1,"row"],[1,"col-12","col-sm-10","col-md-6","col-lg-4"],[3,"label","formControl"],[3,"label","type","formControl"],[1,"row","mb-3"],["class","col-12 col-sm col-md-6 col-lg-4",4,"ngIf"],[1,"col","d-flex"],["type","submit",1,"btn","btn-success",3,"disabled"],[1,"fa","fa-check","ms-2"],[1,"col-12","col-sm","col-md-6","col-lg-4"],["id","floatingSelect",1,"form-floating"],[1,"form-select",3,"formControl"],[3,"value",4,"ngFor","ngForOf"],["for","floatingSelect"],[3,"value"]],template:function(t,s){1&t&&e.YNc(0,x,18,10,"form",0),2&t&&e.Q6J("ngIf",s.categories&&s.serviceForm&&s.user)},dependencies:[c.sg,c.O5,h.t,i._Y,i.YN,i.Kr,i.EJ,i.JJ,i.JL,i.oH,i.sg,p.U,c.JJ]}),o})();var b=r(9646),y=r(435),Z=r(2262);const J=[{path:"new",component:F,data:{breadcrumb:{alias:"newServiceTitle"}},canDeactivate:[(()=>{class o{constructor(t){this.confirmService=t,this.modal=new y.u,this.modal.title="New service",this.modal.message="Are you sure to lose unsaved changes for your new service?"}canDeactivate(t){return t.serviceForm?.touched?this.confirmService.confirm(this.modal):(0,b.of)(!0)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(Z.z))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()]},{path:"list",loadChildren:()=>Promise.all([r.e(592),r.e(196)]).then(r.bind(r,8196)).then(o=>o.ListModule)}];let N=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.Bz.forChild(J),l.Bz]}),o})();var I=r(4466);let T=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.ez,N,I.m]}),o})()}}]);