"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[734],{4734:(I,a,i)=>{i.r(a),i.d(a,{ServicesModule:()=>Z});var c=i(6895),l=i(2559),r=i(433),e=i(1571),u=i(8909),d=i(6325),v=i(5329),g=i(7185),f=i(4015);function p(o,s){if(1&o&&(e.TgZ(0,"option",17),e.ALo(1,"number"),e._uU(2),e.qZA()),2&o){const t=s.$implicit;e.s9C("value",e.lcZ(1,2,t.id)),e.xp6(2),e.hij(" ",t.name," ")}}function h(o,s){if(1&o&&(e.TgZ(0,"div",12)(1,"div",13)(2,"select",14),e.YNc(3,p,3,4,"option",15),e.qZA(),e.TgZ(4,"label",16),e._uU(5,"Service category"),e.qZA()()()),2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("formControl",t.serviceForm.controls.serviceCategory.get("categoryId")),e.xp6(1),e.Q6J("ngForOf",t.categories)}}function C(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"form",1),e.NdJ("ngSubmit",function(){e.CHM(t);const m=e.oxw();return e.KtG(m.onSubmit())}),e.TgZ(1,"div",2)(2,"div",3)(3,"div",4),e._UZ(4,"app-text-input",5),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4),e._UZ(7,"app-text-input",5),e.qZA()(),e.TgZ(8,"div",3)(9,"div",4),e._UZ(10,"app-text-input",6),e.qZA()(),e.TgZ(11,"div",7),e.YNc(12,h,6,2,"div",8),e.qZA(),e.TgZ(13,"div",3)(14,"div",9)(15,"button",10),e._uU(16,"Add service "),e._UZ(17,"i",11),e.qZA()()()()()}if(2&o){const t=e.oxw();e.Q6J("formGroup",t.serviceForm),e.xp6(4),e.Q6J("label","Name")("formControl",t.serviceForm.controls.name),e.xp6(3),e.Q6J("label","Description")("formControl",t.serviceForm.controls.description),e.xp6(3),e.Q6J("label","Price")("type","number")("formControl",t.serviceForm.controls.price),e.xp6(2),e.Q6J("ngIf",t.serviceForm.get("serviceCategory")),e.xp6(3),e.Q6J("disabled",t.serviceForm.invalid)}}const S=[{path:"new",component:(()=>{class o{constructor(t,n,m,F,y,J){this.bcService=t,this.serviceService=n,this.fb=m,this.accountService=F,this.router=y,this.toastr=J,this.serviceForm=new r.cw({}),this.categories=[],this.user={},this.bcService.set("@newServiceTitle","Create a new service")}ngOnInit(){this.loadCategories()}onSubmit(){this.serviceService.add(this.serviceForm.value).subscribe({next:()=>{this.toastr.success("Service added successfully"),this.router.navigateByUrl("/account/services/list")},error:()=>{}})}initForm(t,n){this.serviceForm=this.fb.group({name:["",[r.kI.required,r.kI.minLength(10),r.kI.maxLength(100)]],description:["",[r.kI.required,r.kI.minLength(10),r.kI.maxLength(100)]],price:["",[r.kI.required]],userService:this.fb.group({userId:[n,[r.kI.required]]}),serviceCategory:this.fb.group({categoryId:[t,[r.kI.required]]})})}loadCategories(){this.serviceService.getCategories().subscribe({next:t=>{this.categories=t},complete:()=>{this.loadUser()}})}loadUser(){this.accountService.getUser().subscribe({next:t=>{this.user=t},complete:()=>{this.initForm(this.categories[0].id,this.user.id)}})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.pm),e.Y36(d.r),e.Y36(r.qu),e.Y36(v.B),e.Y36(l.F0),e.Y36(g._W))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-new"]],decls:1,vars:1,consts:[[3,"formGroup","ngSubmit",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"container-fluid","container-md"],[1,"row"],[1,"col-12","col-sm-10","col-md-6","col-lg-4"],[3,"label","formControl"],[3,"label","type","formControl"],[1,"row","mb-3"],["class","col-12 col-sm col-md-6 col-lg-4",4,"ngIf"],[1,"col","d-flex"],["type","submit",1,"btn","btn-success",3,"disabled"],[1,"fa","fa-check","ms-2"],[1,"col-12","col-sm","col-md-6","col-lg-4"],["id","floatingSelect",1,"form-floating"],[1,"form-select",3,"formControl"],[3,"value",4,"ngFor","ngForOf"],["for","floatingSelect"],[3,"value"]],template:function(t,n){1&t&&e.YNc(0,C,18,10,"form",0),2&t&&e.Q6J("ngIf",n.categories&&n.serviceForm&&n.user)},dependencies:[c.sg,c.O5,f.t,r._Y,r.YN,r.Kr,r.EJ,r.JJ,r.JL,r.oH,r.sg,c.JJ]}),o})(),data:{breadcrumb:{alias:"newServiceTitle"}}},{path:"list",loadChildren:()=>Promise.all([i.e(592),i.e(196)]).then(i.bind(i,8196)).then(o=>o.ListModule)}];let b=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.Bz.forChild(S),l.Bz]}),o})();var x=i(4466);let Z=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.ez,b,x.m]}),o})()}}]);